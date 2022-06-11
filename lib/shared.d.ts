// * Library shared type definitions
// REF: https://docs.metamask.io
interface ErrorState {
  message: string
  code: number
}

interface ProviderMessage {
  type: string
  data: unknown
}

interface ProviderRpcError {
  message: string
  code: number
  data?: unknown
}

interface ConnectInfo {
  chainId: string
}

interface SendBasicProps {
  /** Address to send */
  to: string
  /** Hex formated wei amount to send */
  value: string
}

interface SendMethodProps extends SendBasicProps {
  gasPrice?: string
  /** Optional. Metamask UI will be prompted */
  gas?: string
  from: string
  data?: string
  /** Optional. Metamask will replace it's value */
  chainId?: string
}

interface Asset {
  address: string
  symbol: string
  decimals: number
  image: string
}

interface WatchAssetParams {
  type: "ERC20"
  options: Asset
}

interface AddEthereumChain {
  chainId: string
  chainName: string
  nativeCurrency?: {
    name: string
    symbol: string
    decimals: 18
  }
  rpcUrls: string[]
  blockExplorerUrls?: string[]
}

interface SwitchEthereumChain {
  chainId: string
}

// * metamask.request() typing
interface RequestProps<T, D> {
  method: T
  params: D
}

type TransactionType = "latest" | "earliest" | "pending"
interface OnRequest {
  request(
    p: RequestProps<"wallet_watchAsset", WatchAssetParams>
  ): Promise<boolean>
  request(
    p: RequestProps<"wallet_switchEthereumChain", SwitchEthereumChain[]>
  ): Promise<null>
  request(
    p: RequestProps<"wallet_addEthereumChain", AddEthereumChain[]>
  ): Promise<null>
  request(p: { method: "eth_requestAccounts" }): Promise<string[]>
  request(p: { method: "eth_accounts" }): Promise<[string][]>
  request(
    p: RequestProps<"eth_sendTransaction", SendMethodProps[]>
  ): Promise<string[]>
  /** Get Address ETH balance in wei */
  request(
    p: RequestProps<"eth_getBalance", [string, TransactionType]>
  ): Promise<string>
}

// * metamask.on() typing
type EventCallback<T> = (data: T) => void
interface OnEvent {
  on(ev: "accountsChanged", cb: EventCallback<string[]>): void
  on(ev: "chainChanged", cb: EventCallback<string>): void
  on(ev: "disconnect", cb: EventCallback<ProviderRpcError>): void
  on(ev: "message", cb: EventCallback<ProviderMessage>): void
  on(ev: "connect", cb: EventCallback<ConnectInfo>): void
}

// * Exported types
export type FIATCurrencies = {
  usd: number
  jpy: number
  eur: number
}

export interface Metamask extends OnEvent, OnRequest {
  isConnected(): boolean
  /**
   * alias to `ethereum._metamask.isUnlocked()`
   *
   * This method returns a Promise that resolves to a boolean indicating
   * if MetaMask is unlocked by the user.
   */
  isUserUnlocked(): Promise<boolean>
  isMetaMask: boolean
  chainId: string
  removeListener: (e: string, f: any) => void
  selectedAddress: string | null
}

export interface UseMatamaskAPI {
  connect: () => void
  disconnect: (props?: { reload?: boolean }) => void
  send: (props: Omit<SendMethodProps, "from">) => Promise<string>
  resetError: () => void
  account: string
  accounts: string[]
  balance: number
  formattedBalance: string
  chainId: string
  chainIdDecimal: number
  error?: ErrorState
  metamask: Metamask
  isConnected: boolean
}
