const BriceCoin = artifacts.require("./BriceCoin.sol");

module.exports = function (deployer) {
  deployer.deploy(BriceCoin);
};
