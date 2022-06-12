import { addEtherToken } from "@forta/usemetamask"

import Button from "./Button"

const ZRX = {
  address: "0xe41d2489571d322189246dafa5ebde1f4699f498",
  symbol: "ZRX",
}

function AddZRXToken() {
  return <Button onClick={() => addEtherToken(ZRX)}>Add ZRX Token</Button>
}

export default AddZRXToken
