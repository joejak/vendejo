import { writable } from "svelte/store";

let storedAddress;

/**
 * @type import("svelte/store").Writable<string | undefined>
 */
export const walletAddress = writable(storedAddress); 

/**
 * tx type definition
 * @typedef {Object} tx
 * @property {string} id
 * @property {string} uri
 * @property {string} fiatValue
 * @property {string} moneroValue
 * @property {string} description
 */
/**
 * @type import("svelte/store").Writable<tx[]>
 */
export const transactionStack = writable([]);