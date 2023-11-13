<script>
	// @ts-ignore
	import { toCanvas } from 'qrcode';
	import { onMount } from 'svelte';
	/**
	 * @type HTMLDivElement
	 */
	let container;
	/**
	 * @type HTMLCanvasElement
	 */
	let canvas;

	onMount(() => {
		toCanvas(canvas, 'www.google.com', { errorCorrectionLevel: 'H' }, function (/** @type {any} */ err) {
			if (err) throw err;
		});
	});
</script>


	<div bind:this={container}>
		<canvas bind:this={canvas} />
	</div>

