/**
 * Library exported utilities
 */
import { METHODS } from "./constants"
import { Asset, RequestProps, SendBasicProps } from "../shared.d"
import { runIfMetamask, withError } from "./helpers"

export { getMetamaskProvider } from "./helpers"

export const addEtherToken = ({
  address,
  symbol,
  decimals = 18,
  image = "",
}: Omit<Asset, "decimals" | "image"> & {
  decimals?: number
  image?: string
}) => {
  return runIfMetamask((metamask) => {
    return metamask
      .request({
        method: METHODS.wallet_watchAsset,
        params: {
          type: "ERC20",
          options: {
            address,
            symbol,
            decimals,
            image,
          },
        },
      })
      .catch(withError)
  })
}

export const switchOrAppendNetwork = async ({
  chainId,
  chainName,
  rpcUrl,
  reloadOnSuccess,
  blockExplorerUrl,
  currencySymbol = "ETH",
}): Promise<null> => {
  return runIfMetamask(async (metamask) => {
    return metamask
      .request({
        method: METHODS.wallet_switchEthereumChain,
        params: [{ chainId }],
      })
      .catch((error) => {
        if (error.code === 4902) {
          return addEtherNetwork({
            chainName,
            chainId,
            rpcUrl,
            reloadOnSuccess,
            blockExplorerUrl,
            currencySymbol,
          })
        }
        return withError(error)
      })
  })
}

export const switchEtherNetwork = (chainId: string): Promise<null> => {
  return runIfMetamask((metamask) => {
    return metamask
      .request({
        method: METHODS.wallet_switchEthereumChain,
        params: [{ chainId }],
      })
      .catch(withError)
  })
}

export const addEtherNetwork = ({
  chainName,
  chainId,
  rpcUrl,
  reloadOnSuccess,
  blockExplorerUrl,
  currencySymbol = "ETH",
}): Promise<null> => {
  return runIfMetamask((metamask) => {
    metamask
      .request({
        method: METHODS.wallet_addEthereumChain,
        params: [
          {
            chainName,
            chainId,
            rpcUrls: [rpcUrl],
            blockExplorerUrls: [blockExplorerUrl],
            nativeCurrency: {
              name: currencySymbol,
              symbol: currencySymbol,
              decimals: 18,
            },
          },
        ],
      })
      .then(() => {
        reloadOnSuccess && window.location.reload()
      })
      .catch(withError)
  })
}

export const etherRequest = (props: RequestProps<any>) => {
  return runIfMetamask((metamask) => {
    return metamask.request(props).catch(withError)
  })
}

export const etherSend = ({
  from,
  to,
  value,
}: SendBasicProps & { from: string }): Promise<string> => {
  return runIfMetamask((metamask) => {
    return metamask
      .request({
        method: METHODS.eth_sendTransaction,
        params: [
          {
            from,
            to,
            value,
          },
        ],
      })
      .catch(withError)
  })
}

export const parse = {
  toHex: (n: number) => {
    if (n < 0) {
      // Handle negative overflow
      n = 0xffffffff + n + 1
    }
    return `0x${n.toString(16).toUpperCase()}`
  },
  toInt: (str: string) => parseInt(str, 16),
}
