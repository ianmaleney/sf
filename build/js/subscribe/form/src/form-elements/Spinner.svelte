<script>
	import { fade } from 'svelte/transition';
	export let size = 200;
	export let speed = 750;
	export let color = 'rgba(0,0,0,0.4)';
	export let thickness = 2;
	export let gap = 40;
	export let radius = 10;
	let dash;
	$: dash = 2 * Math.PI * radius * (100 - gap) / 100
</script>

<svg height="{size}" width="{size}" style="--speed:{speed}ms" class="svelte-spinner" viewbox="0 0 32 32" transition:fade>
	<circle role="presentation" cx="16" cy="16" r="{radius}" stroke="{color}" fill="none" stroke-width="{thickness}"
	 stroke-dasharray="{dash},100" stroke-linecap="round" />
</svg>

<style>
	.svelte-spinner {
		transition-property: transform;
		animation-name: svelte-spinner_infinite-spin;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
		animation-duration: var(--speed);
		position: fixed;
		top: calc(50vh - 100px);
		left: calc(50vw - 100px);
		z-index: 991;
	}

	@keyframes svelte-spinner_infinite-spin {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}
</style>