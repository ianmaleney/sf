<script>
	import MagForm from "./MagForm.svelte";
	import BookForm from "./BookForm.svelte";
	import MBForm from "./MBForm.svelte";
	import PatronForm from "./PatronForm.svelte";
	export let form;
</script>

{#if form === 'magonly'}
	<MagForm />
{/if}

{#if form === 'bookonly'}
	<BookForm />
{/if}

{#if form === 'magbook'}
	<MBForm />
{/if}

{#if form === 'patron'}
	<PatronForm />
{/if}