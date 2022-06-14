import * as React from "react"
import { act, render } from "@testing-library/react"

import { UseMatamaskAPI } from "../lib/shared"
import { useMetamask } from "../lib/index"

import { ACCOUNTS } from "../__utils__/constans"
import { exposeMetamask, waitForUseEffect } from "../__utils__"

function ExposeHook({
  onRender = (_: UseMatamaskAPI) => {},
  onMetamask = undefined,
}) {
  onRender(useMetamask(onMetamask))
  return null
}

describe("useMetamask", () => {
  let node
  afterEach(() => {
    if (node && node.unmount) {
      node.unmount()
    }
    jest.clearAllMocks()
  })

  it("should match empty state & no metamask", () => {
    const expectedState = {
      chainIdDecimal: 0,
      chainId: "0x0",
      metamask: {},
      error: null,
      formattedBalance: "0.00",
      balance: 0,
    }
    const onRender = jest.fn()
    node = render(<ExposeHook onRender={onRender} />)
    expect(node.container).toMatchSnapshot()
    expect(onRender).toBeCalledWith(expect.objectContaining(expectedState))
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
})
