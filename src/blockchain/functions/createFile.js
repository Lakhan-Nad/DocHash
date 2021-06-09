const FileContract = require("../fileContract");

module.exports = async (from, fileName, ipfsHash) => {
  FileContract.methods
    .addFile(fileName, ipfsHash)
    .send({
      from,
      gas: 6721975,
    })
    .then((reciept) => {
      const events = reciept.events;
      if (events["FileAdded"] !== undefined) {
        const result = events["FileAdded"].returnValues[0];
        if (result.user === from && fileName === result.fileName) {
          // successfully added
        }
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
};
