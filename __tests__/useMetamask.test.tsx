import * as React from "react"
import { act, render, RenderResult } from "@testing-library/react"

import { ERRORS } from "../lib/utils/constants"
import { UseMatamaskAPI } from "../lib/shared"
import { useMetamask } from "../lib/index"

import { ACCOUNTS } from "./__utils__/constans"
import { exposeMetamask, waitForUseEffect } from "./__utils__"

function ExposeHook({
  onRender = (_: UseMatamaskAPI) => {},
  onMetamask = undefined as any,
}) {
  onRender(useMetamask(onMetamask))
  return null
}

describe("useMetamask", () => {
  let node: RenderResult
  afterEach(() => {
    if (node && node.unmount) {
      node.unmount()
    }
    jest.clearAllMocks()
  })

  it("should match empty state & no metamask installed", async () => {
    jest.useFakeTimers()
    const expectedState = {
      chainIdDecimal: 0,
      chainId: "0x0",
      metamask: {},
      formattedBalance: "0.00",
      balance: 0,
      error: ERRORS.METAMASK_NOT_INSTALLED,
    }
    const onRender = jest.fn()
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {})
    node = render(<ExposeHook onRender={onRender} />)
    expect(node.container).toMatchSnapshot()
    expect(consoleError).toHaveBeenCalled()
    act(() => {
      jest.runAllTimers()
    })
    expect(onRender).toBeCalledWith(expect.objectContaining(expectedState))
    consoleError.mockRestore()
  })

  it("should render account='0x111'", async () => {
    const expectedState = {
      account: ACCOUNTS[0],
      accounts: ACCOUNTS,
    }
    exposeMetamask({
      request: jest.fn().mockResolvedValue(ACCOUNTS),
    })
    const mockOnRender = jest.fn()
    node = render(<ExposeHook onRender={mockOnRender} />)
    await waitForUseEffect(node)
    expect(mockOnRender).toBeCalledWith(expect.objectContaining(expectedState))
  })

  it("should disconnect when connected", async () => {
    let api: UseMatamaskAPI = {} as any
    const expectedState = {
      isConnected: true,
    }
    exposeMetamask({
      request: jest.fn().mockResolvedValue(ACCOUNTS),
    })
    const mockOnRender = jest.fn((_api) => {
      api = _api
    })
    node = render(<ExposeHook onRender={mockOnRender} />)
    await waitForUseEffect(node)
    expect(mockOnRender).toBeCalledWith(expect.objectContaining(expectedState))
    expect(api.isConnected).toBeTruthy()
    act(() => {
      api.disconnect()
    })
    expect(api.isConnected).toBeFalsy()
  })

  it("should expose metamask at hook mount & execute cleanerFn", async () => {
    const exposedMetamask = exposeMetamask({
      request: jest.fn().mockResolvedValue(ACCOUNTS),
    })
    const mockOnRender = jest.fn()
    const mockCleanerFn = jest.fn()
    const mockOnMetamask = jest.fn(() => mockCleanerFn)
    node = render(
      <ExposeHook onRender={mockOnRender} onMetamask={mockOnMetamask} />
    )
    await waitForUseEffect(node)
    expect(mockOnMetamask).toBeCalledWith(exposedMetamask)
    node.unmount() // Remove component to trigger hookCleaner
    expect(mockCleanerFn).toHaveBeenCalledTimes(1)
  })
})
