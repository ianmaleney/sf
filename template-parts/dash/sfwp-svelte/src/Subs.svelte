<script>
	import SingleSub from "./SingleSub.svelte";
	export let subsData;
</script>

<style>
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
	}
</style>

<ul>
	{#each subsData as sub}
		<SingleSub {...sub} />
	{/each}
</ul>