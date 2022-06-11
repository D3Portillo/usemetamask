/**
 * Library exported utilities
 */
import { Asset, SendBasicProps } from "../shared.d"
import internals from "./internals"
const { withError, runIfMetamask, switchNetwork } = internals

export { default as parse } from "./parse"

export const getMetamaskProvider = internals.getMetamaskProvider

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
        method: "wallet_watchAsset",
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

export const switchEtherNetwork = (chainId: string): Promise<null> => {
  return switchNetwork(chainId).catch(withError)
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
        method: "wallet_addEthereumChain",
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

export const switchOrAppendNetwork = ({
  chainId,
  chainName,
  rpcUrl,
  reloadOnSuccess,
  blockExplorerUrl,
  currencySymbol = "ETH",
}): Promise<null> => {
  return switchNetwork(chainId).catch((error) => {
    if (error.code === 4902) {
      return addEtherNetwork({
        chainName,
        chainId,
        rpcUrl,
        reloadOnSuccess,
        blockExplorerUrl,
        currencySymbol,
      })
        .then(() => switchNetwork(chainId))
        .catch(withError)
    }
    return withError(error)
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
        method: "eth_sendTransaction",
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

export const connectToMetamask = () => {
  return runIfMetamask((metamask) => {
    return metamask
      .request({ method: "eth_requestAccounts" })
      .then(([account]) => account)
  }, false)
}

export const formatEther = (balance: number) => {
  const result = balance < 0 ? balance.toPrecision(2) : balance.toFixed(3)
  return `${parseFloat(result)}`
}

export const getFIATBalance = (balance, price) => {
  return parseFloat((balance * price).toFixed(2))
}
