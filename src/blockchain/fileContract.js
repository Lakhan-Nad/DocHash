const { Web3 } = require("./web3");
const FileContractJSON = require("../../build/contracts/FileContract.json");

const FileContract = new Web3.eth.Contract(
  FileContractJSON.abi,
  process.env.CONTRACT_ADDRESS
);

module.exports = FileContract;
