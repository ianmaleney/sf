<script>
	export let title, description, price, form, selected;
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	function handleClick(event) {
		dispatch('select', event.target.dataset.form);
	}
</script>

<div class="option">
	<h3 class="option__title">{title}</h3>
	<p class="option__description">{description}</p>
	<p class="option__price">{price}</p>
	<button class="option__button" class:selected data-form={form} on:click={handleClick}>{selected ? "Selected" : "Select"}</button>
</div>

<style>
	.option {
		padding: 0 40px;
		border-right: 1px solid #E5E5E5;
		flex: 1 0 25%;
		min-width: 280px;
	}
	.option:last-child {
		border-right: none;
	}
	.option > * {
		font-family: "IBM Plex Sans Condensed";
	}
	.option__title {
		font-size: 2.2rem;
		margin: 10px 0 0;
		text-decoration: underline;
	}
	.option__description {
		font-size: 1.2rem;
		color: #878787;
		line-height: 1;
    	margin: 8px 0 16px 0;
	}
	.option__price {
		font-size: 3.2rem;
		font-weight: 800;
		line-height: 1;
    	margin: 0;
	}
	.option__button {
		margin: 16px 0;
		border: 2px solid black;
		padding: 12px 36px;
		font-size: 1.6rem;
		border-radius: 4px;
		font-weight: 800;
	}
	.option__button:hover {
		background-color: black;
		color: white;
		cursor: pointer;
	}
	.selected {
		background-color: black;
		color: white;
	}

</style>