const FileContract = require("../fileContract");

module.exports = async (from, fileName) => {
  FileContract.methods
    .requestAccess(fileName)
    .send({
      from,
      gas: 6721975,
    })
    .then((reciept) => {
      const events = reciept.events;
      if (events["RequestAccess"] !== undefined) {
        const result = events["RequestAccess"].returnValues[0];
        if (result.user === from && fileName === result.fileName) {
          // successfully access request added
        }
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
};
