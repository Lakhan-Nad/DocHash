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
    FileContract.methods
      .addFile("a-file-2", "dsfggrhth")
      .send({
        from: "0x32053360df697F9006D91B75B5E64B47fEDaf9F1",
        gas: 6721975,
      })
      .then((reciept) => {
        console.log(reciept);
        consoleEvents(reciept);
      })
      .catch((error) => {
        console.log(error.message);
      });
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
    //   .grantAccess("a-file-haaadsh", accounts[1])
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
    //   .deleteAccess("a-file-haaadsh", accounts[1])
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
    //   .updateFile("a-file-haaadsh", "nfjsnfjs jbjab")
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
    //   .getFileData("a-file-haaadsh")
    //   .call({
    //     from: accounts[0],
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
