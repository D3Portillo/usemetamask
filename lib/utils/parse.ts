const toHex = (n: number) => {
  if (n < 0) {
    // Handle negative overflow
    n = 0xffffffff + n + 1
  }
  return `0x${n.toString(16).toUpperCase()}`
}

const hexToInt = (str: string) => parseInt(str, 16)

const toWei = (n: number) => n * 10 ** 18

const toTxWei = (n: number) => toHex(toWei(n))

const weiToEth = (n: number) => n * 10 ** -18

const txWeiToEth = (s: string) => weiToEth(hexToInt(s))

export default {
  toHex,
  hexToInt,
  toWei,
  toTxWei,
  weiToEth,
  txWeiToEth,
}
