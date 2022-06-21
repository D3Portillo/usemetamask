import {
  addEtherNetwork,
  addEtherToken,
  sendEther,
  switchEtherNetwork,
  switchOrAppendNetwork,
  connectToMetamask,
  metamaskRequest,
  getMetamaskProvider,
  getFIATValue,
  formatEther,
} from "../lib"
import { ERRORS } from "../lib/utils/constants"

import { defineWindowReload, exposeMetamask } from "./__utils__"
import { ACCOUNTS } from "./__utils__/constans"

const INTERNAL_ERROR = {
  code: 0,
  message: "INTERNAL_ERROR",
}

describe("utils", () => {
  beforeEach(() => {
    exposeMetamask({
      isMetaMask: false,
    })
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it("[Ether,Network,Token]:: rejects withError=METAMASK_NOT_INSTALLED", async () => {
    /**
     **Tests the following methods since they all proxy `metamask.request`
     * function addEtherNetwork(props: AddEtherNetwork): Promise<null>
     * function sendEther(props: SendMethodProps): Promise<string>
     * function addEtherToken(props: AddEtherToken): Promise<null>
     * function switchEtherNetwork(chainId: string): Promise<null>
     * function switchOrAppendNetwork(props: AddEtherNetwork): Promise<null>
     * function metamaskRequest({ method, params }): any
     */
    const INPUT = {} as any
    const ERROR = ERRORS.METAMASK_NOT_INSTALLED

    await expect(addEtherNetwork(INPUT)).rejects.toEqual(ERROR)
    await expect(sendEther(INPUT)).rejects.toEqual(ERROR)
    await expect(addEtherToken(INPUT)).rejects.toEqual(ERROR)
    await expect(switchEtherNetwork(INPUT)).rejects.toEqual(ERROR)
    await expect(switchOrAppendNetwork(INPUT)).rejects.toEqual(ERROR)
    await expect(metamaskRequest(INPUT)).rejects.toEqual(ERROR)

    /**
     * In this context withInternalError means that window.ethereum exists
     * for the `useMetamask` to function but metamask.request fails
     */
    exposeMetamask({
      request: jest.fn().mockRejectedValue(INTERNAL_ERROR),
    })
    await expect(addEtherNetwork(INPUT)).rejects.toEqual(INTERNAL_ERROR)
    await expect(sendEther(INPUT)).rejects.toEqual(INTERNAL_ERROR)
    await expect(addEtherToken(INPUT)).rejects.toEqual(INTERNAL_ERROR)
    await expect(switchEtherNetwork(INPUT)).rejects.toEqual(INTERNAL_ERROR)
    await expect(switchOrAppendNetwork(INPUT)).rejects.toEqual(INTERNAL_ERROR)
    await expect(metamaskRequest(INPUT)).rejects.toEqual(INTERNAL_ERROR)
  })
  it("[Ether,Network,Token]:: resolves withState=SUCCESS", async () => {
    /**
     **Tests the following methods since they all proxy `metamask.request`
     * function addEtherNetwork(props: AddEtherNetwork): Promise<null>
     * function sendEther(props: SendMethodProps): Promise<string>
     * function addEtherToken(props: AddEtherToken): Promise<null>
     * function switchEtherNetwork(chainId: string): Promise<null>
     * function switchOrAppendNetwork(props: AddEtherNetwork): Promise<null>
     * function metamaskRequest({ method, params }): any
     */
    const SUCCESS = "SUCCESS"
    const INPUT = {} as any
    exposeMetamask({
      request: jest.fn().mockResolvedValue(SUCCESS),
    })

    await expect(addEtherNetwork(INPUT)).resolves.toEqual(SUCCESS)
    await expect(sendEther(INPUT)).resolves.toEqual(SUCCESS)
    await expect(addEtherToken(INPUT)).resolves.toEqual(SUCCESS)
    await expect(switchEtherNetwork(INPUT)).resolves.toEqual(SUCCESS)
    await expect(switchOrAppendNetwork(INPUT)).resolves.toEqual(SUCCESS)
    await expect(metamaskRequest(INPUT)).resolves.toEqual(SUCCESS)
  })

  it("addEtherNetwork:: reloadOnSuccess=true", async () => {
    const expectedState = "SUCCESS"
    const mockReload = defineWindowReload()
    exposeMetamask({
      request: jest.fn().mockResolvedValue(expectedState),
    })
    await expect(
      addEtherNetwork({ reloadOnSuccess: true } as any)
    ).resolves.toEqual(expectedState)
    expect(mockReload).toHaveBeenCalled()
  })

  it("connectToMetamask:: FAILULRE", async () => {
    // Fail when window.ethereum=undefined
    await expect(connectToMetamask()).rejects.toEqual(
      ERRORS.METAMASK_NOT_INSTALLED
    )

    // Fail for metamak.request
    exposeMetamask({
      request: jest.fn().mockRejectedValue(INTERNAL_ERROR),
    })
    await expect(connectToMetamask()).rejects.toEqual(INTERNAL_ERROR)
  })
  it("connectToMetamask:: resolves with `connectedAccount`", async () => {
    const connectedAccount = ACCOUNTS[0]
    exposeMetamask({
      request: jest.fn().mockResolvedValue(ACCOUNTS),
    })
    await expect(connectToMetamask()).resolves.toEqual(connectedAccount)
  })

  it("getMetamaskProvider:: `isUserUnlocked`, provider=null, isMetaMask=false", () => {
    expect(getMetamaskProvider()).toBe(null)

    // set isMetaMask=true but not define `_metamask`
    exposeMetamask()
    let provider = getMetamaskProvider()!
    expect(provider["_metamask"]).toBeUndefined()
    expect(jest.isMockFunction(provider.isUserUnlocked)).toBeFalsy()

    // Inject a mock Fn to _metamask.isUnlocked - validate it's the one served
    exposeMetamask({
      _metamask: {
        /** ethereum._metamask.isUnlocked */
        isUnlocked: jest.fn(),
      },
    })
    provider = getMetamaskProvider()!
    expect(provider["_metamask"]).toBeDefined()
    expect(jest.isMockFunction(provider.isUserUnlocked)).toBeTruthy()
  })

  it("getFIATValue:: console.error - defaultFormatter", () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {})
    expect(getFIATValue(1, 1, "NONE")).toEqual("1")
    expect(consoleError).toHaveBeenCalledWith(expect.stringMatching("Error"))
    consoleError.mockRestore()
  })
  it("getFIATValue:: currency=USD", () => {
    expect(getFIATValue(1, 0)).toEqual("0")
    expect(getFIATValue(1, "0")).toEqual("0")
    expect(getFIATValue(1, 1)).toEqual("1")
    expect(getFIATValue(999, ".05")).toEqual("49.95")
    expect(getFIATValue("70000", 30_000)).toEqual("2,100,000,000")
    expect(getFIATValue("77", "33")).toEqual("2,541")
  })
  it("getFIATValue:: currency=JPY", () => {
    // Number with significant decimal value
    const signiDecs = 123456.789
    const getValue = (a, b) => getFIATValue(a, b, "JPY")

    expect(getValue(signiDecs, 0)).toEqual("0")
    expect(getValue(1, "0")).toEqual("0")
    expect(getValue(1, signiDecs)).toEqual("123,456.789")
    expect(getValue(signiDecs, ".05")).toEqual("6,172.839")
    expect(getValue(signiDecs, 30_000)).toEqual("3,703,703,670")
    expect(getFIATValue(999, ".05")).toEqual("49.95")
  })
  it("getFIATValue:: currency=EUR", () => {
    // Number with significant decimal value
    const signiDecs = 123456.789
    const getValue = (a, b) => getFIATValue(a, b, "EUR")

    expect(getValue(signiDecs, 0)).toEqual("0")
    expect(getValue(1, signiDecs)).toEqual("123,456.789")
    expect(getValue(signiDecs, 30_000)).toEqual("3,703,703,670")
    expect(getFIATValue(999, ".05")).toEqual("49.95")
  })

  it("formatEther:: formats positive numbers", () => {
    // Evaluate contrain to 1e-4 as min value
    expect(formatEther(1e-5)).toBe("0.0001")
    expect(formatEther(0)).toBe("0")
    expect(formatEther(1.2)).toBe("1.2")
    expect(formatEther(33)).toBe("33")
    expect(formatEther(89232.42000000231)).toBe("89232.42")
    expect(formatEther(89232.00000042)).toBe("89232")
    expect(formatEther(89232.00429)).toBe("89232.0043")
    expect(formatEther(89232.00424)).toBe("89232.0042")
  })
})
