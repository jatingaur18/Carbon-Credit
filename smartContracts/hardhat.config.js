require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();  // Add this line to load .env variables
// require("@nomiclabs/hardhat-ethers"); 

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    sepolia: {
      url: process.env.TESTNET_URL || "http://127.0.0.1:8545",
      accounts: process.env.TESTNET_PRIVATE_KEY ? [process.env.TESTNET_PRIVATE_KEY] : [],
    },
  },
};
