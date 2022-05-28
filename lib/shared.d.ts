// * Atomic shared type definitions
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

interface SendMethodProps {
  gasPrice?: string
  gas?: string
  to: string
  from: string
  value: string
  data?: string
  chainId?: string
}

interface SendBasicProps {
  to: string
  value: string
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

interface AddEthereumChainParameter {
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

interface SwitchEthereumChainParameter {
  chainId: string
}

// * metamask.request() typing
// [type of request]: [on resolve return type]
interface RequestOnResolve {
  wallet_watchAsset: boolean
  wallet_switchEthereumChain: null
  wallet_addEthereumChain: null
  eth_requestAccounts: string[]
  eth_accounts: [string][]
  eth_sendTransaction: string[]
}
// [type of request]: [expected request params]
interface RequestParams {
  wallet_watchAsset: WatchAssetParams
  wallet_switchEthereumChain: SwitchEthereumChainParameter[]
  wallet_addEthereumChain: AddEthereumChainParameter[]
  eth_requestAccounts: never
  eth_accounts: never
  eth_sendTransaction: SendMethodProps[]
}
type RequestMethodsEnum = keyof RequestOnResolve
interface RequestProps<T> {
  method: T
  params?: RequestParamsType<T>
}
type RequestParamsType<T> = T extends RequestMethodsEnum
  ? RequestParams[T]
  : never
type ReqMethodsType<T> = T extends RequestMethodsEnum
  ? RequestOnResolve[T]
  : never

// * metamask.on() typing
// [event]: [callback prop type]
interface EventTypeProps {
  accountsChanged: string[]
  chainChanged: string
  disconnect: ProviderRpcError
  message: ProviderMessage
  connect: ConnectInfo
}
type EventTypePropsEnum = keyof EventTypeProps
type EventDataType<T> = T extends EventTypePropsEnum ? EventTypeProps[T] : never
type OnEventCallback<T> = (data: EventDataType<T>) => void

// * Exposed types
export interface WithErrorState {
  error?: ErrorState
}

export type RequestFn = <T extends RequestMethodsEnum>(
  prop: RequestProps<T>
) => Promise<ReqMethodsType<T>>

export interface Metamask {
  isConnected(): boolean
  request: RequestFn
  on<T extends EventTypePropsEnum>(type: T, cb: OnEventCallback<T>): void
  /**
   * alias to `ethereum._metamask.isUnlocked()`
   *
   * This method returns a Promise that resolves to a boolean indicating
   * if MetaMask is unlocked by the user.
   */
  isUserUnlocked(): Promise<boolean>
  chainId: string
  removeListener: (e: EventTypePropsEnum, f: any) => void
  selectedAddress: string | null
}

export interface UseMatamaskAPI {
  connect: () => void
  disconnect: (props?: { reload?: boolean = false }) => void
  send: (props: SendMethodProps) => Promise<string>
  account: string
  accounts: string[]
  chainId: string
  chainIdDecimal: number
  error?: ErrorState
  metamask: Metamask
  isConnected: boolean
}
