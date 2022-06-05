/// <reference types="vite/client" />
import * as PACK from "usemetamask"
import * as DEV from "../lib/index"
import * as DEFS from "../lib/index.d"

console.log({ MODE: import.meta.env.MODE })
/**
 * MODE==PACK
 * Basically it builds and npm links the package then
 * starts vite server to test the actual package bundle.
 */
const lib = (import.meta.env.MODE !== "PACK" ? DEV : PACK) as any as typeof DEFS
export const useMetamask = lib.useMetamask
export const addEtherNetwork = lib.addEtherNetwork
export const addEtherToken = lib.addEtherToken
export const getMetamaskProvider = lib.getMetamaskProvider
export const switchEtherNetwork = lib.switchEtherNetwork
export const switchOrAppendNetwork = lib.switchOrAppendNetwork
export const sendEther = lib.sendEther
export const metamaskRequest = lib.metamaskRequest
export const parse = lib.parse
