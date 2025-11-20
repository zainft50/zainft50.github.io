<script lang="ts">
	import favicon from '$lib/assets/favicon.jpg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/jpg" href={favicon} sizes="32x32" />
</svelte:head>

{@render children()}
