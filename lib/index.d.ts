import {
  Metamask,
  RequestFn,
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

export function useMetamask(): UseMatamaskAPI
export function addEtherNetwork(props: AddEtherNetwork): Promise<null>
export function addEtherToken(props: AddEtherToken): Promise<null>
export function getMetamaskProvider(): Metamask | null
export function switchEtherNetwork(chainId: string): Promise<null>
export function switchOrAppendNetwork(props: AddEtherNetwork): Promise<null>
/**
 * Send ether transaction
 * @returns Transaction hash string
 */
export function etherSend(props: SendMethodProps): Promise<string>
export const etherRequest: RequestFn
export const parse = {
  toHex: (n: number): string => null,
  toInt: (s: string): string => null,
}
