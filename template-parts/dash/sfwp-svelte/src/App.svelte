<script>
	import Subs from "./Subs.svelte";
	import SubsHeader from "./SubsHeader.svelte";
	import { subscribers } from './stores.js';

	let url;
	if (window.location.hostname === 'stingingfly.org') {
		url = "https://stingingfly.org/stripe/api";
	} else {
		url = "https://sfwp.test/stripe/api";
	};

	fetch(url, {cache: "no-cache"})
		.then(res => res.json())
		.then(data => subscribers.remote(data));
</script>

<style>
</style>

<SubsHeader number={$subscribers.length} />
<Subs subsData={$subscribers} />
