<script>
	import { goto } from '$app/navigation';
	import { transactionStack, walletAddress } from '$lib/store';

	export let value /**@type {string}*/ = '';
	export let description /**@type {string}*/ = '';

	const clean = () => () => {
		value = value.replace(/[^\d.]/g, '');
		while (value.indexOf('.') != value.lastIndexOf('.')) {
			value = value.slice(0, value.indexOf('.', value.indexOf('.') + 1));
		}
	};

	const select = (/** @type {string} */ num) => () => {
		if (value.includes('.') && num == '.') {
			return;
		}
		value += num;
	};
	const clear = () => {
		value = '';
	};
	const submit = async () => {
		const id = Date.now().toString();
		const pricing = await (
			await fetch('https://min-api.cryptocompare.com/data/price?fsym=XMR&tsyms=USD')
		).json();
		const monval = Number.parseFloat(value) / Number.parseFloat(pricing.USD);
		description = description.trim().length < 1 ? 'no description' : description;
		$transactionStack.push({
			id: id,
			description: description,
			fiatValue: value,
			moneroValue: '' + monval,
			uri: encodeURI(
				'monero:' + $walletAddress + '?tx_amount=' + monval + '&tx_description=' + description + ''
			)
		});
		goto('checkout/' + id);
	};
</script>

<div class="main">
	<h1 class="even-spaced-text">Vendejo</h1>

	<div class="main-content">
		<div class="main-content-panel">
			<input
				class="even-spaced-text"
				style="font-size: xx-large; margin-bottom: 5px"
				type="text"
				bind:value
				on:input={clean()}
			/>
			<div class="keypad">
				<div class="keypad-row">
					<button on:click={select('1')}>1</button>
					<button on:click={select('2')}>2</button>
					<button on:click={select('3')}>3</button>
				</div>

				<div class="keypad-row">
					<button on:click={select('4')}>4</button>
					<button on:click={select('5')}>5</button>
					<button on:click={select('6')}>6</button>
				</div>

				<div class="keypad-row">
					<button on:click={select('7')}>7</button>
					<button on:click={select('8')}>8</button>
					<button on:click={select('9')}>9</button>
				</div>

				<div class="keypad-row">
					<button disabled={!value} on:click={clear}>C</button>
					<button on:click={select('0')}>0</button>
					<button style="font-size: xx-large;" on:click={select('.')}>.</button>
				</div>
			</div>
			<button style="width: 100%; height:3em; margin-top: .5em" disabled={!value} on:click={submit}
				>Checkout</button
			>
		</div>
		<div class="main-content-panel">
			<div style="display:flex">
				<div
					style="border-bottom: solid;
					border-width: 1px; 
					flex-grow: 1;"
				/>
				<div
					class="even-spaced-text"
					style="width: max-content;
						border: solid;
						border-width: 1px; 
						border-bottom: none;
						border-top-left-radius: 12px;
						border-top-right-radius: 12px;
						padding: 6px;
						margin-top: 0px;"
				>
					Description (optional)
				</div>
				<div
					style="border-bottom: solid;
					border-width: 1px; 
						flex-grow: 1;"
				/>
			</div>
			<textarea
				class="even-spaced-text"
				style="    font-size: large;
				border: none;
				border-right: solid;
				border-left: solid;
				border-width: 1px; 
				outline: transparent;
				resize: none;
				min-height: 80px;
				flex-grow: 1"
				bind:value={description}
			/>
			<div style="display:flex">
				<div
					style="border-top: solid;
					border-width: 1px; 
					flex-grow: 1;"
				/>
				<div
					class="even-spaced-text"
					style="width: max-content;
						border: solid;
						border-width: 1px; 
						border-top: none;
						border-bottom-left-radius: 12px;
						border-bottom-right-radius: 12px;
						padding: 6px;
						margin-top: 0px;"
				>
					*included on receipt
				</div>
				<div
					style="border-top: solid;
					border-width: 1px; 
						flex-grow: 1;"
				/>
			</div>
		</div>
	</div>
</div>

<style>
	@media (width < 768px) {
		.main-content {
			width: 90vw;
			display: flex;
			flex-direction: column;
			gap: 5px;
		}

		.main-content-panel {
			display: flex;
			flex-direction: column;
			height: 600px;
			margin-top: 0px;
			margin-bottom: 5px;
		}
	}

	@media only screen and (width >= 768px) {
		.main-content {
			width: 75vw;
			display: flex;
			flex-direction: row;
			column-gap: 5px;
		}

		.main-content-panel {
			display: flex;
			flex-direction: column;
			width: 50%;
			height: 600px;
			margin-top: 0px;
			margin-bottom: 5px;
		}
	}

	.keypad {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 4px;
		flex-grow: 2;
	}

	.keypad-row {
		display: flex;
		flex-direction: row;
		gap: 4px;
		flex-grow: 1;
		justify-content: space-around;
		min-height: 80px;
	}

	.keypad-row > button {
		width: 40px;
		font-size: xx-large;
		flex-grow: 1;
	}

	.keypad,
	button {
		margin: 0;
		padding: 0;
	}

	.even-spaced-text {
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
</style>
