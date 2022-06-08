import { ERRORS, EVENTS, STR_TRUE } from "./constants"
import { ErrorState, Metamask } from "../shared"

const ETHEREUM = "ethereum"
const STORE_KEY = "USEMETAMASK_USERDATA"

class Internals {
  noOp = () => {}
  getStoreState = (): string => {
    return localStorage.getItem(STORE_KEY)
  }
  setStoreState = (value: string) => {
    localStorage.setItem(STORE_KEY, value)
  }
  userIsForceDisconnected = (): boolean => {
    return this.getStoreState() == STR_TRUE
  }
  getGlobalWindow = (): { ethereum: Metamask } => {
    return typeof window !== "undefined" ? (window as any) : {}
  }
  withError = ({ code, message }: ErrorState): Promise<never> => {
    const error = {
      message,
      code,
    }
    dispatchEvent(
      new CustomEvent(EVENTS.ON_METAMASK_ERROR, {
        detail: error,
      })
    )
    return Promise.reject(error)
  }
  runIfMetamask = (
    cb: (metamask: Metamask) => any,
    validateUserConnect?: boolean
  ): Promise<null> => {
    const metamask = getMetamaskProvider()
    if (!metamask) return this.withError(ERRORS.METAMASK_NOT_INSTALLED)
    if (validateUserConnect && this.userIsForceDisconnected()) {
      return this.withError(ERRORS.USER_NOT_CONNECTED)
    }
    return cb(metamask)
  }
  switchNetwork = (chainId: string): Promise<null> => {
    return this.runIfMetamask((metamask) => {
      return metamask.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      })
    })
  }
}

const internals = new Internals()

export const connectToMetamask = (): Promise<string> => {
  return internals.runIfMetamask((metamask) => {
    return metamask
      .request({ method: "eth_requestAccounts" })
      .then(([account]) => account)
  }, false)
}

export const getMetamaskProvider = () => {
  const metamask = internals.getGlobalWindow()[ETHEREUM]
  if (metamask && metamask["isMetaMask"]) {
    metamask.isUserUnlocked = metamask["_metamask"].isUnlocked
    return metamask
  }
  return null
}

export default internals
