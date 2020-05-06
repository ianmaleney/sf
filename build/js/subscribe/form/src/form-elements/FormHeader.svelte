<script>
	import FormHeaderOption from './FormHeaderOption.svelte';
	import { createEventDispatcher } from 'svelte';
	let options = [
		{
			title: "Magazine Only",
			description: "Ireland + N. Ireland / Rest of the World",
			price: "€25 / €30",
			form: "magonly",
			selected: false
		},
		{
			title: "Books Only",
			description: "Ireland + N. Ireland / Rest of the World",
			price: "€30 / €35",
			form: "bookonly",
			selected: false
		},
		{
			title: "Magazine + Books",
			description: "Ireland + N. Ireland / Rest of the World",
			price: "€50 / €60",
			form: "magbook",
			selected: false
		},
		{
			title: "Patron",
			description: "Choose Your Own Price",
			price: "€100+",
			form: "patron",
			selected: false
		}
	];
	
	const dispatch = createEventDispatcher();
	const handleSelect = e => {
		dispatch('formSelect', e.detail);
		options.forEach(o => o.selected = false);
		let s = options.findIndex(i => i.form === e.detail);
		options[s].selected = true;
	}
</script>

<section class="formHeader">
	<h2 class="options-heading">Choose Your Subscription</h2>
	<div class="options-table">
		{#each options as option}
		<FormHeaderOption {...option} on:select={handleSelect}/>
		{/each}
	</div>
</section>

<style>
	section.formHeader {
		max-width: 1280px;
		margin: 0 auto;
		text-align: center;
	}
	.options-heading {
		font-size: 3.6rem;
		font-weight: 800;
		font-family: "IBM Plex Sans Condensed"
	}
	.options-table {
		display: flex;
		justify-content: center;
		border-top: 1px solid #E5E5E5;
		padding-top: 16px;
		max-width: 1280px;
		margin: 0 auto;
	}
</style>