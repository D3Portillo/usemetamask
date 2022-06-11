import { Fragment } from "react"
import { useTokenPrice } from "@forta/usemetamask"

import Button from "./Button"

function EtherPrice() {
  const [price, refetch] = useTokenPrice("shiba-inu")
  // https://www.coingecko.com/en/coins/shiba-inu
  return (
    <Fragment>
      <p>
        <table>
          <tbody>
            <tr>
              <td>
                <b>SHIB/USD</b> {price.usd}
              </td>
            </tr>
            <tr>
              <td>
                <b>SHIB/EUR</b> {price.eur}
              </td>
            </tr>
            <tr>
              <td>
                <b>SHIB/JPY</b> {price.jpy}
              </td>
            </tr>
          </tbody>
        </table>
      </p>
      <h3>Refetch function</h3>
      <p>
        When consuming the hook it resolves with an Array containing an Object
        for <code>usd,eur,jpy</code> prices for the Token. And a function at{" "}
        <code>index:1</code> you can invoke whenever you want to re-fetch the
        price.
      </p>
      <br />
      <Button onClick={refetch}>FETCH LATEST PRICE</Button>
    </Fragment>
  )
}

export default EtherPrice
