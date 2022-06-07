# useMetamask 🦍

<p align="center">
  <img src="https://raw.githubusercontent.com/D3Portillo/usemetamask/master/assets/logo.png">
</p>

<p align="center">An utility <em>React</em> hook to handle Metamask's browser API</p>

## Install

```bash
npm i @forta/usemetamask
```

## Usage

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

[📒 READ THE DOCS](https://forta.vercel.app/usemetamask)
