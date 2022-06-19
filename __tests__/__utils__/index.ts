import { act, RenderResult } from "@testing-library/react"
import { Metamask } from "../../lib/shared"

export const waitForUseEffect = async (node: RenderResult) => {
  return act(async () => {
    await Promise.resolve(node)
  })
}

export function exposeMetamask(metamaskMock: {
  request?: Metamask["request"]
  on?: Metamask["on"]
  selectedAddress?: string
  isMetaMask?: boolean
}): Metamask {
  const metamask = {
    isConnected: false,
    selectedAddress: null,
    isMetaMask: true,
    isUserUnlocked: jest.fn(),
    removeListener: jest.fn(),
    request: jest.fn(),
    on: jest.fn(),
    ...metamaskMock,
  }
  window["ethereum"] = metamask
  return metamask as any
}

export function defineWindowReload() {
  const location: Location = window.location
  // @ts-ignore
  delete window.location
  window.location = {
    ...location,
    reload: jest.fn(),
  }
  return window.location.reload
}
