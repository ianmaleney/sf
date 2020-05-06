<script>
	export let name, label, input_id = undefined, type, required = false, classes = undefined, checked = undefined, value = undefined, disabled = undefined;

	const dateMethods = () => {
		let d = new Date();
		let yy = `${d.getFullYear()}`;
		let mm = `${d.getMonth()}`;
		let dd = `${d.getDay()}`;
		let pad = s => s.padStart(2, '0');
		let date = `${pad(yy)}/${pad(mm)}/${dd}`;
		return date;
	}

</script>

{#if type === 'text'}
	<label for="{name}" class="{classes}">
		<span class="label-title">{label}</span>
		<input id="{name}" type="{type}" {required} {disabled} placeholder=" " pattern=".*\S.*">
		{#if required}
		<span class="validation">This field is required.</span>
		{/if}
	</label>
{/if}

{#if type === 'radio'}
	<input type="{type}" name="{name}" id="{input_id}" value="{value}" {disabled} {checked}>
	<label for="{input_id}">{label}</label>
{/if}

{#if type === 'date'}
	<label for="{input_id}">
	<span class="label-title">{label}</span>
	<input type="{type}" name="{name}" pattern="\d{4}-\d{2}-\d{2}" min="{dateMethods()}">
	</label>
{/if}

{#if type === 'heading'}
	<h3>{label}</h3>
{/if}



<style>
	h3 {
		width: 100%;
		margin: 1.5rem 0;
		font-size: 1.6rem;
	}
	.label-title {
		font-size: 1.3rem;
	}
</style>