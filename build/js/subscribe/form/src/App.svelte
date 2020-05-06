<script>
	import FormHeader from './form-elements/FormHeader.svelte';
	import SubForm from './forms/SubForm.svelte';

	let form = undefined;

</script>

<FormHeader on:formSelect="{e => form = e.detail}"/>
<div id="subs-page__form">
	<SubForm form={form} />
</div>

<style>
	#subs-page__form {
		margin-bottom: 40px;
	}
</style>