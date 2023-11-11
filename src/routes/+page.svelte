<script>
	import { createEventDispatcher } from 'svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	/**@type {Dialog}*/
	let dialog;
	export let value /**@type {string}*/ = '';

	const clean = () => () => {
		value = value.replace(/[^\d.]/g, '');
		while (value.indexOf('.') != value.lastIndexOf('.')) {
			value = value.slice(0, value.indexOf('.', value.indexOf('.') + 1));
		}
	};

	const dispatch = createEventDispatcher();

	const select = (/** @type {string} */ num) => () => {
		if (value.includes('.') && num == '.') {
			return;
		}
		value += num;
		dispatch('pin', num);
	};
	const clear = () => {
		value = '';
		dispatch('clear', value);
	};
	const submit = () => {
		dialog.showModal();
		dispatch('submit');
	};
</script>

<div class="main">
	<h1>Welcome to Vendejo</h1>

	<div style="width: 13em">
		<input
			class="even-spaced-text"
			style="width: 96%;  font-size: xx-large; margin-bottom: .5em"
			type="text"
			bind:value
			on:input={clean()}
		/>
		<div class="keypad">
			<button on:click={select('1')}>1</button>
			<button on:click={select('2')}>2</button>
			<button on:click={select('3')}>3</button>
			<button on:click={select('4')}>4</button>
			<button on:click={select('5')}>5</button>
			<button on:click={select('6')}>6</button>
			<button on:click={select('7')}>7</button>
			<button on:click={select('8')}>8</button>
			<button on:click={select('9')}>9</button>

			<button disabled={!value} on:click={clear}>clear</button>
			<button on:click={select('0')}>0</button>
			<button style="font-size: xx-large;" on:click={select('.')}>.</button>
		</div>
		<button style="width: 100%; height:3em; margin-top: .5em" disabled={!value} on:click={submit}
			>submit</button
		>
	</div>
</div>

<Dialog bind:dialog on:close={() => console.log('closed')}>
	This is amazingly simple! (press esc to close)
</Dialog>

<style>
	.main {
		width: 97vw;
        height:97vh;
		display: flex;
        flex-direction: column;
		align-items: center;
		justify-items: center;
	}
	.keypad {
		display: grid;
		grid-template-columns: repeat(3, 4em);
		grid-template-rows: repeat(4, 3em);
		grid-gap: 0.5em;
	}

	.keypad,
	button {
		margin: 0;
	}

	.even-spaced-text {
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
</style>
