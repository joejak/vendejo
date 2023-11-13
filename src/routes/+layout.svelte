<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { walletAddress } from '$lib/store';
	import { onMount } from 'svelte';

	onMount(() => {
		if (browser) {
			const cookie = document.cookie;
			if (document.cookie) walletAddress.set(cookie.split('=')[1]);
		}

		if (!$walletAddress) {
			goto('configure');
		}
	});
</script>

<div class="main">
	<slot />
</div>
