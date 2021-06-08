var Migrations = artifacts.require("./Migrations.sol");
var FileContract = artifacts.require("./FileContract.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(FileContract);
};
