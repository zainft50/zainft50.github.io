# Leaderboard for Zain's first to 50 challenge!

i really need a job

---

By default, there's a spoiler over the score using the character icon. Hovering will temporarily reveal the score: you can click to keep it revealed.

All scores can be revealed at once with the "Show all scores" button at the top of the page. Note that it reverts the score display if you've manually clicked on it.

**The table is manually generated** so please be patient as it might take me time to update it (or I may not be available to update it immediately).

<details>
<summary> For devs </summary>

made with pnpm + svelte (and vite).

updating the table is done with the entry struct in [page.svelte](https://github.com/zainft50/zainft50.github.io/blob/main/leaderboard/src/routes/+page.svelte).

<details>
<summary> dev instructions </summary>

## Developing

First, install depenencies:

```sh
pnpm install
```

To start a development server:

```sh
pnpm run dev

# or start the server and open it in a new tab
pnpm run dev --open
```

## Building for prod

```sh
pnpm run build
```

You can preview the prod build via:

```sh
pnpm run preview
```

Uses the svelte static adapter. Also apparently github pages requires the `.nojekyll` file for branch based deployments.

</details>

</details>
