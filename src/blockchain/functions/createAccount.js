const { Web3 } = require("../web3");

module.exports = async () => {
  const accounts = 9;
  const data = await Web3.eth.getAccounts();
  return data[Math.floor(Math.random() * 9) + 1];
};
