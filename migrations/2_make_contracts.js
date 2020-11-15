const MesaCoin = artifacts.require("./MesaCoin.sol");

module.exports = function (deployer) {
  deployer.deploy(MesaCoin);
};
