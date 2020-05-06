<script>
	export let f_id, f_legend, inputs, comment = undefined;
	import FormInput from "./FormInput.svelte";
</script>

<fieldset id="{f_id}">
	<legend>{f_legend}</legend>
	<div class="fieldset-inputs">
		{#each inputs as input}
		<FormInput  {...input} />
		{/each}
	</div>

	{#if comment }
		<div class="fieldset-comment">
			<p>{comment}</p>
		</div>
	{/if}

</fieldset>