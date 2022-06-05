export const METHODS = {
  WALLET_WATCH_ASSET: "wallet_watchAsset",
  WALLET_SWITCH_ETHER_CHAIN: "wallet_switchEthereumChain",
  WALLET_ADD_ETHER_CHAIN: "wallet_addEthereumChain",
  ETH_REQUEST_ACCOUNTS: "eth_requestAccounts",
  ETH_SEND_TRANSACTION: "eth_sendTransaction",
  ETH_ACCOUNTS: "eth_accounts",
} as const

export const ERRORS = {
  METAMASK_NOT_INSTALLED: {
    code: 333,
    message: "Metamask not installed",
  },
  USER_NOT_CONNECTED: {
    code: 0,
    message: "User not connected",
  },
} as const

export const EVENTS = {
  ON_METAMASK_ERROR: "ON_METAMASK_ERROR",
} as const

export const STR_TRUE = "true"
export const STR_FALSE = "false"
