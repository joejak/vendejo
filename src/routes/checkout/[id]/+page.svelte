<script>
	import { goto } from '$app/navigation';
	import Qr from '$lib/components/QR.svelte';
	import { transactionStack } from '$lib/store.js';
	import { onMount } from 'svelte';
	import spinner from '$lib/assets/spinner.gif';
	/** @type {import('./$types').PageData} */
	export let data;

	/**
	 * @type {import("$lib/store.js").tx | undefined}
	 */
	let tx;

	onMount(() => {
		console.log($transactionStack);
		tx = $transactionStack.find((tx) => {
			return tx.id === data.id;
		});
	});
</script>

<div class="frame">
	<div class="top-container">
		<h1>checkout</h1>
		<button
			on:click={() => {
				goto('/');
			}}>X</button
		>
	</div>
	<slot />

	<div style="display:flex; flex-direction:column; align-items:center">
		{#if tx}
			<Qr uri={tx?.uri} />
		{:else}
			<img src="{spinner}" alt="loading...">
		{/if}
		<caption>{tx?.uri ?? 'URI ERROR'}</caption>
		<h2>{tx?.moneroValue} XMR</h2>
		<h3>{tx?.fiatValue} USD</h3>
		<h4>{tx?.description}</h4>
	</div>
</div>

<style>
	.frame {
		height: 30vh;
		display: flex;
		flex-direction: column;
		margin-top: none;
		max-width: 800px;
		min-width: 280px;
	}

	.top-container {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		height: 46px;
	}

	.top-container,
	h1 {
		line-height: 1px;
	}

	button {
		border-radius: 16px;
		border-width: thin;
		padding: 6px;
		width: 30px;
		padding-bottom: 4px;
		padding-top: 4px;
		background-color: #ff1150;
		color: whitesmoke;
		margin: 0px;
	}
</style>
