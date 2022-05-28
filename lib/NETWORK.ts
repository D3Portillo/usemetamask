const Mainnet = {
  chainId: "0x1",
  chainName: "Ethereum Main Network (Mainnet)",
  rpcUrl: "https://mainnet.infura.io/v3/",
  blockExplorerUrl: "https://etherscan.io",
}

const Rinkeby = {
  chainId: "0x4",
  chainName: "Rinkeby Test Network",
  rpcUrl: "https://rinkeby.infura.io/v3/",
  blockExplorerUrl: "https://rinkeby.etherscan.io",
}

const Goerli = {
  chainId: "0x5",
  chainName: "Goerli Test Network",
  rpcUrl: "https://goerli.infura.io/v3/",
  blockExplorerUrl: "https://goerli.etherscan.io",
}

const Kovan = {
  chainId: "0x2a",
  chainName: "Kovan Test Network",
  rpcUrl: "https://kovan.infura.io/v3/",
  blockExplorerUrl: "https://kovan.etherscan.io",
}

const Ropsten = {
  chainId: "0x3",
  chainName: "Ropsten Test Network",
  rpcUrl: "https://ropsten.infura.io/v3/",
  blockExplorerUrl: "https://ropsten.etherscan.io",
}

const Matic = {
  chainId: "0x89",
  chainName: "Matic Mainnet",
  rpcUrl: "https://rpc-mainnet.maticvigil.com",
  blockExplorerUrl: "https://explorer.matic.network",
  symbol: "MATIC",
}

export default {
  Ropsten,
  Mainnet,
  Rinkeby,
  Goerli,
  Kovan,
  Matic,
}
