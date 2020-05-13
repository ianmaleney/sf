<script>
	export let f_id, f_legend, inputs = undefined, comment = undefined, gift = false;
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
			{#if f_id === 'sub_start'}
				{#if gift}
				<p>You can also choose a date on which your gift subscription will start. This is the day the recipient will be notified.</p>
				{/if}
			{/if}
		</div>
	{/if}

</fieldset>