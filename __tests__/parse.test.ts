import { parse } from "../lib/index"

describe("parse", () => {
  it("toHex:: returns string for 42->0x2A", () => {
    expect(parse.toHex(42)).toEqual("0x2A")
  })
  it("toHex:: parses positive int numbers", () => {
    expect(parse.toHex(0)).toEqual("0x0")
    expect(parse.toHex(2)).toEqual("0x2")
    expect(parse.toHex(99999)).toEqual("0x1869F")
  })
  it("toHex:: parses positive decimal numbers", () => {
    expect(parse.toHex(0.0)).toEqual("0x0")
    expect(parse.toHex(0.5)).toEqual("0x0.8")
    expect(parse.toHex(2.999)).toEqual("0x2.FFBE76C8B4396")
    expect(parse.toHex(0.0002)).toEqual("0x0.000D1B71758E21968")
  })

  it("hexToInt:: parses positive int numbers", () => {
    expect(parse.hexToInt("0x0")).toEqual(0)
    expect(parse.hexToInt("0x2")).toEqual(2)
    expect(parse.hexToInt("0x1869F")).toEqual(99999)
  })
  it("hexToInt:: parses positive decimal numbers", () => {
    expect(parse.hexToInt("0x0.8")).toEqual(0)
    expect(parse.hexToInt("0x0.000D1B71758E21968")).toEqual(0)
  })

  it("toWei:: parses positive int numbers", () => {
    expect(parse.toWei("0")).toEqual("0")
    expect(parse.toWei(0)).toEqual("0")
    expect(parse.toWei(1)).toEqual("1000000000000000000")
    expect(parse.toWei("2")).toEqual("2000000000000000000")
    expect(parse.toWei("42")).toEqual("42000000000000000000")
    expect(parse.toWei(333)).toEqual("333000000000000000000")
    expect(parse.toWei("99999")).toEqual("99999000000000000000000")
    expect(parse.toWei("70828383")).toEqual("70828383000000000000000000")
  })
  it("toWei:: parses positive decimal numbers", () => {
    expect(parse.toWei(0.0)).toEqual("0")
    expect(parse.toWei("0.0")).toEqual("0")
    expect(parse.toWei("0.1")).toEqual("100000000000000000")
    expect(parse.toWei("0.5")).toEqual("500000000000000000")
    expect(parse.toWei(0.99)).toEqual("990000000000000000")
    expect(parse.toWei(0.0000993)).toEqual("99300000000000")
    expect(parse.toWei(0.00000000336)).toEqual("3360000000")
    expect(parse.toWei(0.0000000000042)).toEqual("4200000")
    expect(parse.toWei(0.00000000000000039)).toEqual("390")
    expect(parse.toWei("0.0000042")).toEqual("4200000000000")
  })

  it("toTxWei:: parses positive int numbers", () => {
    expect(parse.toTxWei("0")).toEqual("0x0")
    expect(parse.toTxWei("1")).toEqual("0xDE0B6B3A7640000")
    expect(parse.toTxWei(1)).toEqual("0xDE0B6B3A7640000")
    expect(parse.toTxWei(999)).toEqual("0x3627E8F712373C0000")
    expect(parse.toTxWei(7963)).toEqual("0x1AFACD30637C3900000")
  })
  it("toTxWei:: parses positive decimal numbers", () => {
    expect(parse.toTxWei("0.0")).toEqual("0x0")
    expect(parse.toTxWei(0.0)).toEqual("0x0")
    expect(parse.toTxWei("0.0000042")).toEqual("0x3D1E3821000")
    expect(parse.toTxWei(0.0000000000042)).toEqual("0x401640")
    expect(parse.toTxWei("2.2")).toEqual("0x1E87F85809DC0000")
  })

  it("weiToEth:: parses positive int numbers", () => {
    expect(parse.weiToEth("0")).toEqual(0)
    expect(parse.weiToEth(0)).toEqual(0)
    expect(parse.weiToEth(1000000000000000000)).toEqual(1)
    expect(parse.weiToEth("333000000000000000000")).toEqual(333)
    expect(parse.weiToEth("70828383000000000000000000")).toEqual(70828383)
  })
  it("weiToEth:: returns positive decimal numbers", () => {
    expect(parse.weiToEth("000000000000000001")).toEqual(1e-18)
    expect(parse.weiToEth("000000000000012345")).toEqual(1.2345e-14)
    expect(parse.weiToEth("1")).toEqual(1e-18)
    expect(parse.weiToEth(1)).toEqual(1e-18)
    expect(parse.weiToEth("123")).toEqual(123e-18)
    expect(parse.weiToEth("9".repeat(18))).toEqual(0.999999999999999999)
    expect(parse.weiToEth("1".repeat(18))).toEqual(0.1111111111111111)
  })

  it("txWeiToEth:: parses positive int numbers", () => {
    expect(parse.txWeiToEth("0x0")).toEqual(0)
    expect(parse.txWeiToEth("0xDE0B6B3A7640000")).toEqual(1)
    expect(parse.txWeiToEth("0x3627E8F712373C0000")).toEqual(999)
    expect(parse.txWeiToEth("0x1AFACD30637C3900000")).toEqual(7963)
  })
  it("txWeiToEth:: returns positive decimal numbers", () => {
    expect(parse.txWeiToEth("0x3D1E3821000")).toEqual(0.0000042)
    expect(parse.txWeiToEth("0x401640")).toEqual(0.0000000000042)
    expect(parse.txWeiToEth("0x1E87F85809DC0000")).toEqual(2.2)
  })
})
