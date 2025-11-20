<!-- src/lib/EntryRow.svelte -->
<script lang="ts">
	import ytIcon from '$lib/assets/yt.svg?url';
	import twIcon from '$lib/assets/tw.svg?url';
	import type { Entry } from '$lib/leaderboard';

	export let entry: Entry;
	export let showAll: boolean;
	export let revealed: boolean;
	export let revealDelay = 0;
	export let onReveal: () => void;

	const ssbmCharIcons = import.meta.glob('$lib/assets/ssbm_icons/*.png', {
		eager: true,
		query: '?url',
		import: 'default'
	}) as Record<string, string>;

	function iconForChar(char: string): string | null {
		const lowerChar = char.toLowerCase();
		for (const [path, url] of Object.entries(ssbmCharIcons)) {
			const file = path.split('/').pop() ?? '';
			const base = file.slice(0, file.lastIndexOf('.'));
			if (base.toLowerCase() === lowerChar) {
				return url;
			}
		}
		return null;
	}
</script>

<div class="cell date" role="gridcell">{entry.date}</div>
<div class="cell name" role="gridcell">{entry.name}</div>
<div class="cell score" role="gridcell">
	<button
		type="button"
		class="score-wrapper"
		class:revealed={!showAll && revealed}
		class:all-visible={showAll}
		style={`--reveal-delay: ${revealDelay}ms`}
		on:click={onReveal}
		aria-pressed={revealed ? 'true' : 'false'}
	>
		<span class="score-mask">
			{#if iconForChar(entry.char)}
				<img src={iconForChar(entry.char)} alt={`${entry.char} icon`} class="char-icon" />
			{:else}
				{entry.char}
			{/if}
		</span>
		<span class="score-value">{entry.score}</span>
	</button>
</div>
<div class="cell vod" role="gridcell">
	{#if entry.youtubeVod || entry.twitchVod}
		<div class="vod-icons">
			{#if entry.youtubeVod}
				<a
					href={entry.youtubeVod}
					target="_blank"
					rel="noreferrer"
					class="vod-link"
					aria-label="YouTube VOD"
				>
					<img src={ytIcon} alt="Youtube vod" class="vod-icon" />
				</a>
			{/if}
			{#if entry.twitchVod}
				<a
					href={entry.twitchVod}
					target="_blank"
					rel="noreferrer"
					class="vod-link"
					aria-label="Twitch VOD"
				>
					<img src={twIcon} alt="Twitch vod" class="vod-icon" />
				</a>
			{/if}
		</div>
	{:else}
		<span class="muted">—</span>
	{/if}
</div>
