import { act, RenderResult } from "@testing-library/react"
import { Metamask } from "../../lib/shared"

export const waitForUseEffect = async (node: RenderResult) => {
  return act(async () => {
    await Promise.resolve(node)
  })
}

export function exposeMetamask(metamaskEth: {
  request?: Metamask["request"]
  on?: Metamask["on"]
  selectedAddress?: string
  isMetaMask?: boolean
}) {
  const metamask = {
    selectedAddress: null,
    isMetaMask: true,
    removeListener: jest.fn(),
    on: jest.fn(),
    ...metamaskEth,
  }
  window["ethereum"] = metamask
  return metamask
}
