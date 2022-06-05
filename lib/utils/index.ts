/**
 * Library exported utilities
 */
import { METHODS } from "./constants"
import { Asset, SendBasicProps } from "../shared.d"
import { withError, runIfMetamask, getMetamaskProvider } from "./helpers"

export { getMetamaskProvider }

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
        method: METHODS.WALLET_WATCH_ASSET,
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

export const switchOrAppendNetwork = ({
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
        method: METHODS.WALLET_SWITCH_ETHER_CHAIN,
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
        method: METHODS.WALLET_SWITCH_ETHER_CHAIN,
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
        method: METHODS.WALLET_ADD_ETHER_CHAIN,
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

export const metamaskRequest = (props) => {
  return runIfMetamask((metamask) => {
    return metamask.request(props).catch(withError)
  })
}

export const sendEther = ({
  from,
  to,
  value,
}: SendBasicProps & { from: string }): Promise<string> => {
  return runIfMetamask((metamask) => {
    return metamask
      .request({
        method: METHODS.ETH_SEND_TRANSACTION,
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
  hexToInt: (str: string) => parseInt(str, 16),
  toWei: (n: number) => n * 10 ** 18,
  toTxWei: (n: number) => parse.toHex(parse.toWei(n)),
  weiToEth: (n: number) => n * 10 ** -18,
  txWeiToEth: (s: string) => parse.weiToEth(parse.hexToInt(s)),
}
