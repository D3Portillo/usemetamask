/**
 * @TODO
 * export function connectToMetamask(): Promise<string>
 * export function formatEther(balance: number): string
 * export function getMetamaskProvider(): Metamask | null
 * export function getFIATBalance(tokenBalance, tokenPrice): number
 * export const metamaskRequest: OnRequest["request"]
 */

import {
  addEtherNetwork,
  addEtherToken,
  sendEther,
  switchEtherNetwork,
  switchOrAppendNetwork,
} from "../lib"
import { ERRORS } from "../lib/utils/constants"
import { defineWindowReload, exposeMetamask } from "./__utils__"

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
     */
    const INPUT = {} as any
    const ERROR = ERRORS.METAMASK_NOT_INSTALLED

    await expect(addEtherNetwork(INPUT)).rejects.toEqual(ERROR)
    await expect(sendEther(INPUT)).rejects.toEqual(ERROR)
    await expect(addEtherToken(INPUT)).rejects.toEqual(ERROR)
    await expect(switchEtherNetwork(INPUT)).rejects.toEqual(ERROR)
    await expect(switchOrAppendNetwork(INPUT)).rejects.toEqual(ERROR)

    /**
     * In this context withInternalError means that window.ethereum exists
     * for the `useMetamask` to function but metamask.request fails
     */
    const INTERNAL_ERROR = {
      code: 0,
      message: "INTERNAL_ERROR",
    }
    exposeMetamask({
      request: jest.fn().mockRejectedValue(INTERNAL_ERROR),
    })
    await expect(addEtherNetwork(INPUT)).rejects.toEqual(INTERNAL_ERROR)
    await expect(sendEther(INPUT)).rejects.toEqual(INTERNAL_ERROR)
    await expect(addEtherToken(INPUT)).rejects.toEqual(INTERNAL_ERROR)
    await expect(switchEtherNetwork(INPUT)).rejects.toEqual(INTERNAL_ERROR)
    await expect(switchOrAppendNetwork(INPUT)).rejects.toEqual(INTERNAL_ERROR)
  })
  it("[Ether,Network,Token]:: resolves withState=SUCCESS", async () => {
    /**
     **Tests the following methods since they all proxy `metamask.request`
     * function addEtherNetwork(props: AddEtherNetwork): Promise<null>
     * function sendEther(props: SendMethodProps): Promise<string>
     * function addEtherToken(props: AddEtherToken): Promise<null>
     * function switchEtherNetwork(chainId: string): Promise<null>
     * function switchOrAppendNetwork(props: AddEtherNetwork): Promise<null>
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
})
