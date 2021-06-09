const FileContract = require("../fileContract");

module.exports = async (from, fileName, ipfsHash) => {
  FileContract.methods
    .updateFile(fileName, fileHash)
    .send({
      from,
      gas: 6721975,
    })
    .then((reciept) => {
      const events = reciept.events;
      if (events["FileUpdated"] !== undefined) {
        const result = events["FileUpdated"].returnValues[0];
        if (fileName === result.fileName) {
          // successfully updated
        }
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
};
