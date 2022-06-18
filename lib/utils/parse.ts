/** expands to `000000000000000000` */
const ZERO_GAP = "0".repeat(18) as any

const toHex = (n: number) => `0x${n.toString(16).toUpperCase()}`

const hexToInt = (str: string) => parseInt(str, 16)

const toWei = (n: number | string) => {
  // Avoid returning ZERO_GAP for n==0
  if (n == 0) return "0"
  const [intPart = 0, decPart] = `${n}`.split(".")
  // Be optimistic that input is an int
  let fillGap = ZERO_GAP
  if (decPart) {
    // If decimal part exists we get it's [decPart]x10^-18 value
    fillGap = Math.round((`0.${decPart}` as any) * 1e18)
  }
  // If `intPart == 0` we just return decimal part value
  return `${intPart == 0 ? "" : intPart}${fillGap}`
}

const toTxWei = (n: number | string) => toHex(parseInt(toWei(n)))

const weiToEth = (n: string | number) => (n as any) / 1e18

const txWeiToEth = (s: string) => weiToEth(hexToInt(s))

export default {
  toHex,
  hexToInt,
  toWei,
  toTxWei,
  weiToEth,
  txWeiToEth,
}
