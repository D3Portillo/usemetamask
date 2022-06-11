import { switchEtherNetwork } from "@forta/usemetamask"

import Button from "./Button"

const RIKEBY_ID = "0x4"
function SwitchToRinkeby() {
  return (
    <Button onClick={() => switchEtherNetwork(RIKEBY_ID)}>
      Switch Network
    </Button>
  )
}

export default SwitchToRinkeby
