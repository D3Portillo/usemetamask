import { useCallback, useEffect, useRef, useState } from "react"
import { FIATCurrencies } from "./shared.d"

const API_URL = "https://api.coingecko.com/api/v3/simple/price"
const INITIAL_STATE = { usd: 0, jpy: 0, eur: 0 }
const ONE_SEC_IN_MS = 1000
type CallBack = () => void

const useTokenPrice = (
  coinGeckoID: string,
  intervalInSecs: number = 60
): [FIATCurrencies, CallBack] => {
  const timer = useRef(null)
  const [price, setPrice] = useState(INITIAL_STATE)
  const [count, setCount] = useState(0)
  const triggerRefetch = useCallback(function memoizedRefetch() {
    setCount((n) => n + 1)
  }, [])
  useEffect(() => {
    clearTimeout(timer.current)
    let mounted = true
    fetch(`${API_URL}?ids=${coinGeckoID}&vs_currencies=usd,eur,jpy`)
      .then((r) => r.json())
      .then((json) => {
        if (coinGeckoID in json && mounted) {
          setPrice((state) => ({ ...state, ...json[coinGeckoID] }))
        }
      })
      .catch(console.error)
      .finally(() => {
        // Constrain interval not to be less than 10s
        const secs = intervalInSecs < 10 ? 10 : intervalInSecs
        timer.current = setTimeout(triggerRefetch, secs * ONE_SEC_IN_MS)
      })
    return () => {
      clearTimeout(timer.current)
      mounted = false
    }
  }, [count])

  return [price, triggerRefetch]
}

export default useTokenPrice
