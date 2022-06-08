# useMetamask 🦍

<p align="center">
  <img src="https://raw.githubusercontent.com/D3Portillo/usemetamask/master/assets/logo.png">
</p>

<p align="center">An utility <em>React</em> hook to handle Metamask's browser API</p>

<p align="center">
  <a
    href="https://www.npmjs.com/package/@forta/usemetamask"
  >
    <img src="https://badgen.net/npm/v/@forta/usemetamask" />
  </a>
  <a
    href="https://bundlephobia.com/result?p=@forta/usemetamask"
  >
    <img src="https://badgen.net/bundlephobia/minzip/@forta/usemetamask" />
  </a>
  <a
    href="https://github.com/D3Portillo/usemetamask/blob/master/LICENSE"
  >
    <img src="https://badgen.net/npm/license/@forta/usemetamask" />
  </a>
</p>

## Install

```bash
npm i @forta/usemetamask
```

## Get Started

```js
import { useMetamask } from "@forta/usemetamask"

function App() {
  const { account, connect, balance } = useMetamask()
  return (
    <div>
      <p>Address: {account}</p>
      <p>BALANCE: {balance}ETH</p>
      <button onClick={connect}>CONNECT</button>
    </div>
  )
}
```

## Send Ether

```js
import { parse, useMetamask } from "@forta/usemetamask"
// ..

const { send } = useMetamask()
send({
  to: "0x3c0e20fCA6d2E084127D056377a5f35294503447",
  value: parse.toTxWei(0.5),
  /* 0.5 in ETH. Request expects wei in HEX value.
  .toTxWei parses a number to wei & then to HEX */
})
```

---

**[READ THE DOCS 🌟](https://forta.vercel.app/usemetamask)** | **[FOLLOW ME 🐦](https://twitter.com/d3portillo)**
