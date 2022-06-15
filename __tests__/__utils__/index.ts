import { act } from "@testing-library/react"
import { Metamask } from "../../lib/shared"

import { ACCOUNTS } from "./constans"

export const waitForUseEffect = async (node) => {
  return act(async () => {
    await new Promise((resolve) => resolve(node))
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
