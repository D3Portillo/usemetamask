import {
  FIATCurrencies,
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
  toWei: (s: number | string) => string
  toTxWei: (n: number | string) => string
  weiToEth: (n: number | string) => number
  txWeiToEth: (s: string) => number
}

type VoidCallback = () => void

export function useMetamask(
  metamask?: (metamask: Metamask) => void | VoidCallback
): UseMatamaskAPI
/**
 * Fetch token price in USD,JPY & EUR from CoinGecko public api
 * @param coinGeckoID API ID, like "bitcoin"
 * @returns [{ usd, jpy, eur }, triggerReFetchFn]
 * @example
 * const [btcPrice, reFetchFn] = useTokenPrice("bitcoin")
 * console.log(btcPrice.usd) // Math.random() * 45_000
 */
export function useTokenPrice(
  coinGeckoID: string,
  refreshInternvalInSecs?: number
): [FIATCurrencies, VoidCallback]
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
export function formatEther(balance: number): string
/**
 * Returns a formatted string with a token FIAT value
 * @param tokenBalance The amount of tokens to calculate
 * @param tokenPrice The current token price per unit
 * @param currency The currency token price is matched to
 * @example
 * const amount = 12
 * const priceInUSD = 200
 * const formattedValue = getFIATValue(amount, priceInUSD) // "2,400"
 */
export function getFIATValue(
  tokenBalance: number | string,
  tokenPrice: number | string,
  /** Define a currency for `tokenPrice`. Defaults to "USD" */
  currency?: "USD" | "JPY" | "EUR"
): string
export const metamaskRequest: OnRequest["request"]
export const parse: Parse
