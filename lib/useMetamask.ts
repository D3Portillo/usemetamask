import { useEffect, useRef, useState } from "react"
import { Metamask, SendBasicProps, UseMatamaskAPI } from "./shared.d"
import { getMetamaskProvider, sendEther, parse } from "./utils"
import { STR_FALSE, STR_TRUE, EVENTS } from "./utils/constants"
import internals, { connectToMetamask } from "./utils/internals"

const { noOp, setStoreState, userIsForceDisconnected } = internals
const ACCOUNTS_CHANGED = "accountsChanged"
const ON_DISCONNECT = "disconnect"
const ONE_MINUTE_IN_MS = 60000
const EMPTY_BALANCE = "0.00"
function useMetamask(onMetamaskHook): UseMatamaskAPI {
  const [error, setError] = useState(null)
  const [metamask, setMetamask] = useState<Metamask>({} as any)
  const [triggerRefetch, setTriggerRefetch] = useState(0)
  const [accounts, setAccounts] = useState([])
  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState(EMPTY_BALANCE)
  const timer = useRef(null)

  const resetError = () => setError(null)
  const handleError = (err) => {
    console.error(`useMetamask::Error`, err)
    setError(err)
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
      metamask.request({ method: "eth_accounts" }).then(setAccounts)
      hookCleanerFn = onMetamaskHook ? onMetamaskHook(metamask) : noOp
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
    setError(null)
  }, [accounts, account])

  useEffect(() => {
    if (metamask && account) {
      clearTimeout(timer.current)
      metamask
        .request({
          method: "eth_getBalance",
          params: [account, "latest"],
        })
        .then((value) => {
          console.info("useMetamask::eth_getBalance#refetch")
          setBalance(parse.txWeiToEth(value).toFixed(2))
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

  const chainId = metamask.chainId ? metamask.chainId : "0x0"
  const isConnected = typeof account === "string"
  return {
    send: proxiedSend,
    isConnected,
    chainIdDecimal: parseInt(chainId),
    chainId,
    metamask,
    balance: isConnected ? balance : EMPTY_BALANCE,
    connect: proxiedConnect,
    disconnect,
    account,
    resetError,
    error,
    accounts,
  }
}

export default useMetamask
