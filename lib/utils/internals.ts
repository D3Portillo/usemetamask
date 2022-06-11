import { ERRORS, EVENTS, STR_TRUE } from "./constants"
import { ErrorState, Metamask } from "../shared.d"

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

  getMetamaskProvider = () => {
    const metamask = this.getGlobalWindow()[ETHEREUM]
    if (metamask && metamask["isMetaMask"]) {
      metamask.isUserUnlocked = metamask["_metamask"].isUnlocked
      return metamask
    }
    return null
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
    const metamask = this.getMetamaskProvider()
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

export default new Internals()
