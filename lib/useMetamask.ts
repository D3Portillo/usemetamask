import { useEffect, useMemo, useRef, useState } from "react"
import { Metamask, SendBasicProps, UseMatamaskAPI } from "./shared.d"
import {
  getMetamaskProvider,
  connectToMetamask,
  sendEther,
  parse,
  formatEther,
} from "./utils"
import { STR_FALSE, STR_TRUE, EVENTS, ERRORS } from "./utils/constants"
import internals from "./utils/internals"

const { noOp, setStoreState, userIsForceDisconnected } = internals
const ACCOUNTS_CHANGED = "accountsChanged"
const ON_DISCONNECT = "disconnect"
const SELECTED_ADDRESS = "selectedAddress"
const ONE_MINUTE_IN_MS = 60000
const EMPTY_BALANCE = "0.00"
const isFunction = (f) => typeof f === "function"

function useMetamask(onMetamaskHook?): UseMatamaskAPI {
  const [error, setError] = useState(null)
  const [metamask, setMetamask] = useState<Metamask>({} as any)
  const [triggerRefetch, setTriggerRefetch] = useState(0)
  const [accounts, setAccounts] = useState([])
  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState({ raw: 0, formatted: EMPTY_BALANCE })
  const timer = useRef(null)

  const resetError = () => setError(null)
  const handleError = (err) => {
    console.error(`useMetamask::Error`, err)
    setTimeout(() => setError(err))
  }

  const disconnect = (__props) => {
    const props = __props || {}
    setStoreState(STR_TRUE)
    setAccounts([])
    props.reload && window.location.reload()
  }

  useEffect(() => {
    const metamask = getMetamaskProvider()
    let hookCleanerFn = noOp
    function handleEventError(e) {
      e.detail && handleError(e.detail)
    }
    function handleDisconnect() {
      disconnect({
        reload: true,
      })
    }
    if (metamask) {
      setMetamask(metamask)
      metamask.on(ACCOUNTS_CHANGED, setAccounts)
      metamask.on(ON_DISCONNECT, handleDisconnect)
      const etherAccounts = new Promise((resolve) => {
        const selectedAddr = metamask[SELECTED_ADDRESS]
        resolve(
          selectedAddr
            ? [selectedAddr]
            : metamask.request({ method: "eth_accounts" })
        )
      })
      etherAccounts.then(setAccounts)
      const hookCleaner = isFunction(onMetamaskHook) && onMetamaskHook(metamask)
      hookCleanerFn = isFunction(hookCleaner) ? hookCleaner : noOp
    } else {
      handleError(ERRORS.METAMASK_NOT_INSTALLED)
    }
    window.addEventListener(EVENTS.ON_METAMASK_ERROR, handleEventError)
    return () => {
      hookCleanerFn() // Execute onMetamaskHook cleaning fn
      if (metamask) {
        metamask.removeListener(ACCOUNTS_CHANGED, setAccounts)
        metamask.removeListener(ON_DISCONNECT, handleDisconnect)
      }
      window.removeEventListener(EVENTS.ON_METAMASK_ERROR, handleEventError)
    }
  }, [])

  useEffect(() => {
    const isForceDisconnected = userIsForceDisconnected()
    const userCanConnect = accounts.length && !isForceDisconnected
    setAccount(userCanConnect ? accounts[0] : null)
  }, [accounts])

  useEffect(() => {
    // Error clean up
    resetError()
  }, [accounts, account])

  useEffect(() => {
    clearTimeout(timer.current)
    if (metamask && account) {
      metamask
        .request({
          method: "eth_getBalance",
          params: [account, "latest"],
        })
        .then((value) => {
          const rawBalance = parse.txWeiToEth(value)
          setBalance({
            formatted: formatEther(rawBalance),
            raw: rawBalance,
          })
          timer.current = setTimeout(
            () => setTriggerRefetch((n) => n + 1),
            ONE_MINUTE_IN_MS * 3
          )
        })
        .catch(noOp)
    }
    return () => clearTimeout(timer.current)
  }, [accounts, account, error, triggerRefetch])

  const proxiedSend = ({ to, value, ...extra }: SendBasicProps) => {
    return sendEther({
      ...extra,
      from: account,
      to,
      value,
    })
  }

  const proxiedConnect = () => {
    connectToMetamask()
      .then((account) => {
        setStoreState(STR_FALSE)
        setAccounts([account])
      })
      .catch(handleError)
  }

  const memoizedState = useMemo(() => {
    const chainId = metamask.chainId ? metamask.chainId : "0x0"
    const isConnected = typeof account === "string"
    return {
      chainId,
      chainIdDecimal: parseInt(chainId, 16),
      isConnected,
      formattedBalance: isConnected ? balance.formatted : EMPTY_BALANCE,
      balance: isConnected ? balance.raw : 0,
    }
  }, [account, balance])

  return {
    send: proxiedSend,
    isConnected: memoizedState.isConnected,
    chainIdDecimal: memoizedState.chainIdDecimal,
    chainId: memoizedState.chainId,
    metamask,
    formattedBalance: memoizedState.formattedBalance,
    balance: balance.raw,
    connect: proxiedConnect,
    disconnect,
    account,
    resetError,
    error,
    accounts,
  }
}

export default useMetamask
