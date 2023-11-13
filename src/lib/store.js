import { writable } from "svelte/store";

let storedAddress;

/**
 * @type import("svelte/store").Writable<string | undefined>
 */
export const walletAddress = writable(storedAddress); 