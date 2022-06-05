import { ERRORS, EVENTS, METHODS, STR_TRUE } from "./constants"
import { ErrorState, Metamask, WithErrorState } from "../shared.d"

const ETHEREUM = "ethereum"
const STORE_KEY = "USEMETAMASK_USERDATA"

export const getStoreState = () => localStorage.getItem(STORE_KEY)

export const setStoreState = (v: string) => localStorage.setItem(STORE_KEY, v)

export const userIsForceDisconnected = () => getStoreState() == STR_TRUE

export const withError = ({
  code,
  message,
}: ErrorState): Promise<WithErrorState> => {
  const error = {
    message,
    code,
  }
  dispatchEvent(
    new CustomEvent(EVENTS.ON_METAMASK_ERROR, {
      detail: error,
    })
  )
  return Promise.reject({
    error,
  })
}

export const getGlobalWindow = (): { ethereum: Metamask } =>
  typeof window !== "undefined" ? (window as any) : {}

export const runIfMetamask = (
  cb: (metamask: Metamask) => any,
  validateUserConnect = true
) => {
  const metamask = getMetamaskProvider()
  if (!metamask) return withError(ERRORS.METAMASK_NOT_INSTALLED)
  if (validateUserConnect && userIsForceDisconnected()) {
    return withError(ERRORS.USER_NOT_CONNECTED)
  }
  return cb(metamask)
}

export const connectToMetamask = (): Promise<string> => {
  return runIfMetamask((metamask) => {
    return metamask
      .request({ method: METHODS.ETH_REQUEST_ACCOUNTS })
      .then(([account]) => account)
  }, false)
}

export const getMetamaskProvider = () => {
  const metamask = getGlobalWindow()[ETHEREUM]
  if (metamask && metamask["isMetaMask"]) {
    metamask.isUserUnlocked = metamask["_metamask"].isUnlocked
    return metamask
  }
  return null
}

export const noOp = () => null
