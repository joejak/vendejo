<script>
	import { walletAddress } from "$lib/store";

    let value = $walletAddress; 

    const save = () => {
        walletAddress.set(value);
    }


</script>

<form method="post">
    <input type="text" name="walletAddress" bind:value on:input={save}>
    <button type="submit">Save</button>
</form>
