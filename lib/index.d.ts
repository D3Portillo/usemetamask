import {
  Metamask,
  OnRequest,
  SendMethodProps,
  UseMatamaskAPI,
} from "./shared.d"

interface AddEtherNetwork {
  chainName: string
  /** 0x prefixed Network id */
  chainId: string
  rpcUrl: string
  blockExplorerUrl?: string
  reloadOnSuccess?: boolean
  currencySymbol?: string
}

interface AddEtherToken {
  address: string
  symbol: string
  decimals?: number
  image?: string
}

interface Parse {
  toHex: (n: number) => string
  hexToInt: (s: string) => number
  toWei: (s: string) => number
  toTxWei: (n: number) => string
  weiToEth: (n: number) => number
  txWeiToEth: (s: string) => number
}

type CleanerFn = () => void

export function useMetamask(
  metamask?: (metamask: Metamask) => void | CleanerFn
): UseMatamaskAPI
export function addEtherNetwork(props: AddEtherNetwork): Promise<null>
export function addEtherToken(props: AddEtherToken): Promise<null>
export function getMetamaskProvider(): Metamask | null
export function switchEtherNetwork(chainId: string): Promise<null>
export function switchOrAppendNetwork(props: AddEtherNetwork): Promise<null>
/**
 * Send ether transaction
 * @returns Transaction hash string
 */
export function sendEther(props: SendMethodProps): Promise<string>
export function connectToMetamask(): Promise<string>
export const metamaskRequest: OnRequest["request"]
export const parse: Parse
