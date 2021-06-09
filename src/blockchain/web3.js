require("dotenv").config();
const Web3 = require("web3");
const FileContractJSON = require("../../build/contracts/FileContract.json");

const web3 = new Web3("http://localhost:7545");
web3.eth.getAccounts().then((accounts) => {
  const FileContract = new web3.eth.Contract(
    FileContractJSON.abi,
    process.env.CONTRACT_ADDRESS
  );
  try {
    // FileContract.methods
    //   .addFile("a-file-5", "mkjkdsk")
    //   .send({
    //     from: accounts[0],
    //     gas: 6721975,
    //   })
    //   .then((reciept) => {
    //     console.log(reciept);
    //     consoleEvents(reciept);
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
    // FileContract.methods
    //   .requestAccess("a-file-haaadsh")
    //   .send({
    //     from: accounts[1],
    //     gas: 6721975,
    //   })
    //   .then((reciept) => {
    //     console.log(reciept);
    //     consoleEvents(reciept);
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
    // FileContract.methods
    //   .rejectAccess("a-file-haaadsh", accounts[1])
    //   .send({
    //     from: accounts[0],
    //     gas: 6721975,
    //   })
    //   .then((reciept) => {
    //     console.log(reciept);
    //     consoleEvents(reciept);
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
    // FileContract.methods
    //   .grantAccess("unique_file", "0x4670B98b97Ff4C1dc85b3CAdC2F63Ee1344Ed689")
    //   .send({
    //     from: "0xceD60800DE0d6A9a5E61C938AF679aDA96a9be98",
    //     gas: 6721975,
    //   })
    //   .then((reciept) => {
    //     console.log(reciept);
    //     consoleEvents(reciept);
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
    // FileContract.methods
    //   .deleteAccess("unique_file", "0x4670B98b97Ff4C1dc85b3CAdC2F63Ee1344Ed689")
    //   .send({
    //     from: "0xceD60800DE0d6A9a5E61C938AF679aDA96a9be98",
    //     gas: 6721975,
    //   })
    //   .then((reciept) => {
    //     console.log(reciept);
    //     consoleEvents(reciept);
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
    // FileContract.methods
    //   .updateFile("unique_file", "kdnkndkfmfamfmb")
    //   .send({
    //     from: "0xceD60800DE0d6A9a5E61C938AF679aDA96a9be98",
    //     gas: 6721975,
    //   })
    //   .then((reciept) => {
    //     console.log(reciept);
    //     consoleEvents(reciept);
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
    // FileContract.methods
    //   .getFileData("unique_file")
    //   .call({
    //     from: "0x4670B98b97Ff4C1dc85b3CAdC2F63Ee1344Ed689",
    //   })
    //   .then((reciept) => {
    //     console.log(reciept);
    //     consoleEvents(reciept);
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = {
  Web3: web3,
};

function consoleEvents(reciept) {
  Object.values(reciept.events).forEach((events) => {
    if (!events.length) {
      events = [events];
    }
    events.forEach((event) => {
      console.log("Name: ", event.event);
      console.log("Returns: ", event.returnValues);
    });
  });
}
