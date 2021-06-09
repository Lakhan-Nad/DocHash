const FileContract = require("../fileContract");

module.exports = async (from, fileName, user) => {
  FileContract.methods
    .rejectAccess(fileName, user)
    .send({
      from,
      gas: 6721975,
    })
    .then((reciept) => {
      const events = reciept.events;
      if (events["AccessRejected"] !== undefined) {
        const result = events["AccessRejected"].returnValues[0];
        if (result.user === user && fileName === result.fileName) {
          // successfully access request rejected
        }
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
};
