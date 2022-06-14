import * as React from "react"
import { render } from "@testing-library/react"

import { useMetamask } from "../lib/index"

function ExposeHook({ onRender = (_) => {}, onMetamask = undefined }) {
  const result = useMetamask(onMetamask)
  onRender(result)
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
    const state = {
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
    expect(onRender).toBeCalledWith(expect.objectContaining(state))
  })
})
