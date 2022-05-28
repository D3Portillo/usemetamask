import { useEffect, useState } from "react"
import { Metamask, SendBasicProps, UseMatamaskAPI } from "./shared.d"
import { getMetamaskProvider, etherSend } from "./utils"
import {
  setStoreState,
  userIsForceDisconnected,
  connectToMetamask,
} from "./utils/helpers"
import { STR_FALSE, STR_TRUE, EVENTS } from "./utils/constants"

const ACCOUNTS_CHANGED = "accountsChanged"
export function useMetamask(): UseMatamaskAPI {
  const [error, setError] = useState(null)
  const [metamask, setMetamask] = useState<Metamask>({} as any)
  const [accounts, setAccounts] = useState([])
  const [account, setAccount] = useState(null)

  const handleError = (err) => {
    console.error(`useMetamask::Error`, err)
    setError(err)
  }

  useEffect(() => {
    const metamask = getMetamaskProvider()
    function handleEventError(e) {
      e.detail && handleError(e.detail)
    }
    if (metamask) {
      setMetamask(metamask)
      metamask.on(ACCOUNTS_CHANGED, setAccounts)
      metamask.request({ method: "eth_accounts" }).then(setAccounts)
    }
    window.addEventListener(EVENTS.ON_METAMASK_ERROR, handleEventError)
    return () => {
      metamask && metamask.removeListener(ACCOUNTS_CHANGED, setAccounts)
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

  const proxiedSend = ({ to, value }: SendBasicProps) => {
    return etherSend({
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

  const disconnect = (__props) => {
    const props = __props || {}
    setStoreState(STR_TRUE)
    setAccounts([])
    props.reload && window.location.reload()
  }

  const chainId = metamask.chainId ? metamask.chainId : "0x0"
  return {
    send: proxiedSend,
    isConnected: typeof account === "string",
    chainIdDecimal: parseInt(chainId),
    chainId,
    metamask,
    connect: proxiedConnect,
    disconnect,
    account,
    error,
    accounts,
  }
}

export default useMetamask
