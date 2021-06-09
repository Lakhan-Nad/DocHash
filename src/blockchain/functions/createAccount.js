const { Web3 } = require("../web3");

module.exports = async () => {
  const data = await Web3.eth.accounts.create();
  return data;
};
