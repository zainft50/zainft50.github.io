<script lang="ts">
	// icons
	import ytIcon from '$lib/assets/yt.svg?url';
	import twIcon from '$lib/assets/tw.svg?url';
	import ghIcon from '$lib/assets/gh.svg?url';

	// leaderboard rows
	import EntryRow from '$lib/EntryRow.svelte';
	// leaderboard entries
	import { entries, keyFor, type Entry } from '$lib/leaderboard';

	// sort animation
	import { flip } from 'svelte/animate';

	// only date/name/score should be sortable
	type SortColumn = 'date' | 'name' | 'score';
	type SortDirection = 'asc' | 'desc';

	// by default sort desc on date col
	let sortColumn: SortColumn = 'date';
	let sortDirection: SortDirection = 'desc';

	let revealedScores: Record<string, boolean> = {};
	let showAll = false;

	// row reveal delay
	const rowDelayMap: Record<string, number> = {};
	entries.forEach((entry, index) => {
		rowDelayMap[keyFor(entry)] = index * 80; // ms
	});

	function rowDelay(entry: Entry): number {
		return rowDelayMap[keyFor(entry)] ?? 0;
	}

	// import fun pics
	const bgModules = import.meta.glob('$lib/assets/fun/*.{png,avif}', {
		eager: true,
		query: '?url',
		import: 'default'
	}) as Record<string, string>;

	const bgImages = Object.values(bgModules);
	let leaderboardBgStyle = '';

	function applyRandomBg() {
		if (!bgImages.length) return;
		leaderboardBgStyle = bgImages[Math.floor(Math.random() * bgImages.length)];
	}

	// returns the the first number in the "x-y" pattern.
	// ex: x-y returns x.
	// this is used for sorting.
	function playerScore(score: string): number {
		const [rawFirst] = score.split('-');
		const first = Number(rawFirst?.trim());
		if (!Number.isFinite(first)) return 0;
		return first;
	}

	// sets sort vars (col + direction)
	function sortBy(column: SortColumn) {
		if (sortColumn === column) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortColumn = column;
			sortDirection = column === 'name' ? 'asc' : 'desc';
		}

		applyRandomBg();
	}

	function ariaSort(column: SortColumn): 'none' | 'ascending' | 'descending' {
		if (sortColumn !== column) return 'none';
		return sortDirection === 'asc' ? 'ascending' : 'descending';
	}

	// defines sorting behavior
	$: sortedEntries = [...entries].sort((a, b) => {
		let valA: string | number;
		let valB: string | number;

		switch (sortColumn) {
			case 'date':
				valA = a.date;
				valB = b.date;
				break;
			case 'name':
				valA = a.name.toLowerCase();
				valB = b.name.toLowerCase();
				break;
			case 'score':
				valA = playerScore(a.score);
				valB = playerScore(b.score);
				break;
		}

		if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
		if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
		return 0;
	});

	let hiddenRevealOrder: Record<string, number> = {};

	// when showAll or revealedScores/sortedEntries change, recompute stagger order
	$: {
		const map: Record<string, number> = {};

		if (showAll) {
			let idx = 0;
			for (const entry of sortedEntries) {
				const k = keyFor(entry);

				// only assign an order to rows that are still hidden
				if (!revealedScores[k]) {
					map[k] = idx++;
				}
			}
		}

		hiddenRevealOrder = map;
	}

	function revealScore(entry: Entry) {
		const k = keyFor(entry);
		if (revealedScores[k]) return;
		revealedScores = { ...revealedScores, [k]: true };
	}

	function toggleShowAll() {
		if (showAll) {
			showAll = false;
			revealedScores = {};
		} else {
			showAll = true;
		}
	}

	$: toggleAllLabel = showAll ? 'Hide all scores' : 'Show all scores';
</script>

<main class="page">
	<div class="title">
		<h1>Zain's First To 50 Leaderboard</h1>

		<div class="stream-links">
			<a href="https://www.youtube.com/@Zainssbm" target="_blank" rel="noreferrer">
				<img src={ytIcon} alt="Zain's Youtube" class="stream-icons" />
			</a>
			<a href="https://www.twitch.tv/zainnaghmi" target="_blank" rel="noreferrer">
				<img src={twIcon} alt="Zain's twitch" class="stream-icons" />
			</a>
		</div>
	</div>

	<div class="reveal-spoiler">
		<button
			type="button"
			class="toggle-all"
			on:click={toggleShowAll}
			aria-pressed={showAll ? 'true' : 'false'}
		>
			{toggleAllLabel}
		</button>
	</div>

	<div class="leaderboard" role="grid" aria-label="Score leaderboard">
		<img class="fun" src={leaderboardBgStyle} alt=":)" />
		<div class="header-row" role="row">
			<button
				type="button"
				class="header-cell sortable date"
				role="columnheader"
				aria-sort={ariaSort('date')}
				on:click={() => sortBy('date')}
			>
				Date
			</button>
			<button
				type="button"
				class="header-cell sortable name"
				role="columnheader"
				aria-sort={ariaSort('name')}
				on:click={() => sortBy('name')}
			>
				Name
			</button>
			<button
				type="button"
				class="header-cell sortable score"
				role="columnheader"
				aria-sort={ariaSort('score')}
				on:click={() => sortBy('score')}
			>
				Score
			</button>
			<div class="header-cell vod" role="columnheader">VODs</div>
		</div>

		<div class="leaderboard-body">
			{#each sortedEntries as entry, i (keyFor(entry))}
				<div
					class="body-row"
					role="row"
					style={`--row-delay: ${rowDelay(entry)}ms`}
					animate:flip={{ duration: 200 }}
				>
					<EntryRow
						{entry}
						revealDelay={hiddenRevealOrder[keyFor(entry)] !== undefined
							? hiddenRevealOrder[keyFor(entry)] * 150
							: 0}
						{showAll}
						revealed={!!revealedScores[keyFor(entry)]}
						onReveal={() => revealScore(entry)}
					/>
				</div>
			{/each}
		</div>
	</div>

	<div class="github-footer">
		<a href="https://github.com/zainft50/zainft50.github.io" target="_blank" rel="noreferrer">
			<img src={ghIcon} alt="GitHub" class="github-icon" />
		</a>
	</div>
</main>

<style>
	:global(body) {
		margin: 0;
		background: radial-gradient(circle at top, #111827 0%, #020617 45%, #020617 100%);
		color: #e5e7eb;
		color-scheme: dark;
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			sans-serif;
	}

	.page {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.stream-icons {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		width: 36px;
		height: 36px;
		filter: drop-shadow(0 0 6px rgba(0, 0, 0, 0.7));
	}

	.title {
		max-width: 800px;
		margin: 3rem auto 1rem;
		text-align: center;
		color: #f9fafb;
	}

	.title h1 {
		margin: 0 0 0.4rem;
		font-size: 3rem;
		letter-spacing: 0.03em;
	}

	.stream-links {
		margin-top: 0.35rem;
		display: inline-flex;
		gap: 1rem;
		align-items: center;
		justify-content: center;
	}

	.reveal-spoiler {
		max-width: 800px;
		margin: 0 auto 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		text-align: center;
		color: #e5e7eb;
	}

	.toggle-all {
		padding: 0.5rem 1.2rem;
		border-radius: 999px;
		border: 1px solid #4b5563;
		background: radial-gradient(circle at top left, #1f2937, #111827);
		color: #f9fafb;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		box-shadow:
			0 1px 2px rgba(0, 0, 0, 0.45),
			0 0 0 1px rgba(15, 23, 42, 0.7);
		transition:
			background-color 0.15s ease,
			box-shadow 0.15s ease,
			transform 0.1s ease,
			border-color 0.15s ease;
	}

	.toggle-all:hover {
		background: radial-gradient(circle at top left, #374151, #111827);
		border-color: #9ca3af;
		box-shadow:
			0 3px 10px rgba(0, 0, 0, 0.7),
			0 0 0 1px rgba(148, 163, 184, 0.7);
		transform: translateY(-1px);
	}

	.toggle-all:active {
		transform: translateY(0);
		box-shadow:
			0 1px 4px rgba(0, 0, 0, 0.8),
			0 0 0 1px rgba(148, 163, 184, 0.7);
	}

	.leaderboard {
		width: 100%;
		max-width: 800px;
		margin: 0 auto 1.5rem;
		border: 1px solid #1f2937;
		border-radius: 10px;
		overflow: hidden;
		background: transparent;
		position: relative;
		font-size: 1.2rem;
		box-shadow:
			0 14px 32px rgba(0, 0, 0, 0.85),
			0 0 0 1px rgba(15, 23, 42, 0.8);
	}

	.leaderboard::before {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: -1;
	}

	.fun {
		position: absolute;
		z-index: -1;
		opacity: 0.1;
		width: 800px;
		filter: none !important;
	}

	.header-row,
	.body-row {
		display: grid;
		grid-template-columns: 60px minmax(0, 1fr) 1fr 60px;
		column-gap: 1.5rem;
		align-items: center;
		padding: 0.5rem 2rem;
	}

	.header-row {
		background: linear-gradient(to right, #111827, #020617);
		color: #e5e7eb;
		border-bottom: 1px solid #1f2937;
		font-weight: 600;
		font-size: 1.1rem;
	}

	@keyframes row-fade-in {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.body-row {
		opacity: 0;
		animation: row-fade-in 0.28s ease-out both;
		animation-delay: var(--row-delay, 0ms);
	}

	.leaderboard-body .body-row {
		border-top: 1px solid #111827;
	}

	/* zebra striping for dark mode */
	.leaderboard-body .body-row:nth-child(odd) {
		background: #020617;
	}

	.leaderboard-body .body-row:nth-child(even) {
		background: #0b1120;
	}

	/* header cells (local to this component) */
	.header-cell {
		min-width: 0;
		color: #e5e7eb;
	}

	.header-cell.date {
		font-variant-numeric: tabular-nums;
		justify-self: center;
		text-align: center;
	}

	.header-cell.name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.header-cell.score,
	.header-cell.vod {
		font-variant-numeric: tabular-nums;
		justify-self: center;
		text-align: center;
	}

	/* row cells (global so they affect EntryRow.svelte) */
	:global(.cell) {
		min-width: 0;
		color: #e5e7eb;
	}

	:global(.cell.date) {
		font-variant-numeric: tabular-nums;
		justify-self: center;
		text-align: center;
	}

	:global(.cell.name) {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	:global(.cell.score),
	:global(.cell.vod) {
		font-variant-numeric: tabular-nums;
		justify-self: center;
		text-align: center;
	}

	/* header buttons */
	.sortable {
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		font: inherit;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		color: inherit;
	}

	.sortable:hover {
		text-decoration: underline;
		text-underline-offset: 0.15em;
	}

	:global(a) {
		text-decoration: none;
		font-weight: 500;
		color: #f97316;
	}

	:global(a:hover) {
		text-decoration: underline;
		text-underline-offset: 0.15em;
	}

	/* VOD icons / muted text (used in EntryRow) */
	:global(.muted) {
		color: #9ca3af;
		font-size: 0.8rem;
	}

	:global(.vod-icons) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
	}

	:global(.vod-link) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	:global(.vod-icon) {
		width: 24px;
		height: 24px;
		display: block;
		filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.8));
	}

	/* score spoiler button for EntryRow */
	:global(.score-wrapper) {
		position: relative;
		display: inline-grid; /* overlap the two spans */
		place-items: center; /* center both horizontally & vertically */
		cursor: pointer;
		font-variant-numeric: tabular-nums;
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		font: inherit;
		color: #e5e7eb;
	}

	:global(.score-mask),
	:global(.score-value) {
		grid-area: 1 / 1 / 2 / 2; /* same cell -> overlap */
		transition: opacity 0.5s ease-in-out;
	}

	:global(.score-wrapper.all-visible .score-mask),
	:global(.score-wrapper.all-visible .score-value) {
		transition-delay: var(--reveal-delay, 0ms);
	}

	/* default: show icon, hide score */
	:global(.score-mask) {
		opacity: 1;
	}

	:global(.score-value) {
		opacity: 0;
	}

	/* character icon */
	:global(.char-icon) {
		width: 32px;
		height: 32px;
		object-fit: contain;
		display: block;
		pointer-events: none; /* don't interfere with button click */
		filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.9));
	}

	/* show score on hover (when not globally showing all) */
	:global(.score-wrapper:hover .score-mask) {
		opacity: 0;
	}

	:global(.score-wrapper:hover .score-value) {
		opacity: 1;
	}

	/* after click: score is always visible, but only when showAll is false */
	:global(.score-wrapper.revealed .score-mask) {
		opacity: 0;
	}

	:global(.score-wrapper.revealed .score-value) {
		opacity: 1;
	}

	/* global "show all" state: overrides everything */
	:global(.score-wrapper.all-visible .score-mask) {
		opacity: 0;
	}

	:global(.score-wrapper.all-visible .score-value) {
		opacity: 1;
	}

	.github-footer {
		margin-top: 1rem;
		margin-bottom: 1rem;
		display: flex;
		justify-content: center;
	}

	.github-icon {
		width: 50px;
		height: 50px;
		display: block;
		filter: drop-shadow(0 0 6px rgba(0, 0, 0, 0.7));
	}
</style>
