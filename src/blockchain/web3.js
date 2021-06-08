require("dotenv").config();
const Web3 = require("web3");
const FileContractJSON = require("../build/contracts/FileContract.json");
const Tx = require("ethereumjs-tx");

const web3 = new Web3("http://localhost:8545");
web3.eth.getAccounts().then((accounts) => {
  //   console.log(accounts);
  //   web3.eth.defaultAccount = accounts[0];
  const FileContract = new web3.eth.Contract(
    FileContractJSON.abi,
    process.env.CONTRACT_ADDRESS
  );
  FileContract.methods.addFile("somefilename", "a-file-hash", 2).send({
    from: accounts[0],
    gas: 6721975,
  });
});

module.exports = {
  Web3: web3,
};
