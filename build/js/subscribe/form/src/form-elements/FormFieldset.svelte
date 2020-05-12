<script>
	export let f_id, f_legend, inputs = undefined, comment = undefined;
	import FormInput from "./FormInput.svelte";
</script>

<fieldset id="{f_id}">
	<legend>{f_legend}</legend>
	<div class="fieldset-inputs">
		<slot>
			{#each inputs as input}
				<FormInput {...input} />
			{/each}
		</slot>
	</div>

	{#if comment }
		<div class="fieldset-comment">
			<p>{comment}</p>
		</div>
	{/if}

</fieldset>