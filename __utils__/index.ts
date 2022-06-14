import { act } from "@testing-library/react"
import { Metamask } from "../lib/shared"

export const waitForUseEffect = async (node) => {
  return act(async () => {
    await new Promise((resolve) => resolve(node))
  })
}

export function exposeMetamask(metamaskEth: {
  request?: Metamask["request"]
  on?: Metamask["on"]
}) {
  window["ethereum"] = {
    selectedAddress: "ADDRESS",
    isMetaMask: true,
    removeListener: jest.fn(),
    on: jest.fn(),
    ...metamaskEth,
  }
}
