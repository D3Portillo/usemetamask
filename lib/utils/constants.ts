export const METHODS = {
  wallet_watchAsset: "wallet_watchAsset",
  wallet_switchEthereumChain: "wallet_switchEthereumChain",
  wallet_addEthereumChain: "wallet_addEthereumChain",
  eth_requestAccounts: "eth_requestAccounts",
  eth_sendTransaction: "eth_sendTransaction",
  eth_accounts: "eth_accounts",
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
