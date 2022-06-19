import * as React from "react"
import { act, render, RenderResult } from "@testing-library/react"

import { FIATCurrencies } from "../lib/shared"
import { useTokenPrice } from "../lib/index"

import { waitForUseEffect } from "./__utils__"

function ExposeHook({ onRender = (_: [FIATCurrencies, any]) => {} }) {
  onRender(useTokenPrice("bitcoin"))
  return null
}

jest.useFakeTimers()
const INIT_STATE = {
  jpy: 0,
  usd: 0,
  eur: 0,
}
describe("useTokenPrice", () => {
  let node: RenderResult
  afterEach(() => {
    if (node && node.unmount) {
      node.unmount()
    }
    jest.clearAllMocks()
  })

  it("should return empty all ZERO state", async () => {
    const onRender = jest.fn()
    window.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({}),
    })
    node = render(<ExposeHook onRender={onRender} />)
    expect(onRender).toBeCalledWith(expect.objectContaining([INIT_STATE]))
  })

  it("should re-fetch once after 1min & on reFetchFn call", async () => {
    let mockRefetchData = jest.fn()
    const onRender = jest.fn(([_, fn]) => {
      mockRefetchData = fn
    })
    const ON_FN_CALL_STATE = {
      ...INIT_STATE,
      usd: 33,
      jpy: 33,
    }
    const NEW_STATE = {
      ...INIT_STATE,
      usd: 42,
    }
    window.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        json: () => ({}),
      })
      .mockResolvedValueOnce({
        json: () => ({
          bitcoin: NEW_STATE,
        }),
      })
      .mockResolvedValue({
        json: () => ({
          bitcoin: ON_FN_CALL_STATE,
        }),
      })
    node = render(<ExposeHook onRender={onRender} />)
    expect(onRender).toBeCalledWith(expect.objectContaining([INIT_STATE]))
    jest.advanceTimersByTime(1000 * 30) // 30secs
    await waitForUseEffect(node)
    expect(onRender).toBeCalledWith(expect.objectContaining([INIT_STATE]))
    act(() => {
      jest.advanceTimersByTime(1000 * 61) // 61secs
    })
    await waitForUseEffect(node)
    expect(onRender).toBeCalledWith(expect.objectContaining([NEW_STATE]))
    act(() => {
      mockRefetchData()
    })
    await waitForUseEffect(node)
    expect(onRender).toBeCalledWith(expect.objectContaining([ON_FN_CALL_STATE]))
  })

  it("shouldn't update state on re-fetch for unmount", async () => {
    const onRender = jest.fn()
    const NEW_STATE = {
      ...INIT_STATE,
      usd: 42,
    }
    window.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        json: () => ({}),
      })
      .mockResolvedValue({
        json: () => ({
          bitcoin: NEW_STATE,
        }),
      })
    node = render(<ExposeHook onRender={onRender} />)
    jest.advanceTimersByTime(1000 * 30)
    await waitForUseEffect(node)
    node.unmount()
    act(() => {
      jest.advanceTimersByTime(1000 * 61)
    })
    expect(onRender).toBeCalledTimes(1)
    expect(onRender).toBeCalledWith(expect.objectContaining([INIT_STATE]))
  })
})
