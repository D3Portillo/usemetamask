import { useMetamask } from "@forta/usemetamask"

import Button from "./Button"
import DataCard from "./DataCard"

function Connect() {
  const { account, connect, balance, error } = useMetamask()
  return (
    <DataCard>
      <code>Address: {account || "null"}</code>
      <code>Balance: {balance} ETH</code>
      <code>Error: {error ? error.message : "null"}</code>
      <Button onClick={connect}>CONNECT</Button>
    </DataCard>
  )
}

export default Connect
