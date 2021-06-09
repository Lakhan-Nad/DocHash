const FileContract = require("../fileContract");

module.exports = async (from, fileName, user) => {
  return FileContract.methods
    .deleteAccess(fileName, user)
    .send({
      from,
      gas: 6721975,
    })
    .then((reciept) => {
      const events = reciept.events;
      if (events["AccessDeleted"] !== undefined) {
        const result = events["AccessDeleted"].returnValues[0];
        if (result.user === user && fileName === result.fileName) {
          return true;
        }
      }
    })
    .catch((error) => {
      console.log(error.message);
      return false;
    });
};
