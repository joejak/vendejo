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
    /**
     * @type string
     */
    export let uri; 

	onMount(() => {
		toCanvas(canvas, uri, { errorCorrectionLevel: 'H' }, function (/** @type {any} */ err) {
			if (err) throw err;
		});
	});
</script>


	<div bind:this={container}>
		<canvas bind:this={canvas} />
	</div>

