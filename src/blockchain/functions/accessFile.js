const FileContract = require("../fileContract");

module.exports = async (from, fileName) => {
 return FileContract.methods
    .getFileData(fileName)
    .call({
      from,
    })
    .then((data) => {
      if (data["0"] === fileName) {
        // success
        console.log(data);
        return data;
      }
    })
    .catch((error) => {
      console.log(error.message);
      return false;
    });
};
