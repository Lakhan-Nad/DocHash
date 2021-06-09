const ipfsAPI = require("ipfs-api");

const ipfs = ipfsAPI("ipfs.infura.io", 5001, {
  protocol: "https",
});

module.exports.IPFS = ipfs;
module.exports.getIpfsURL = (fileHash) => `https://ipfs.io/ipfs/${fileHash}`;
