require("dotenv").config();

var MesaCoin = artifacts.require("./MesaCoin.sol");

const TOTAL = process.env.TOTAL;

contract("MesaCoin", function (accounts) {
  it("sets total supply on depl.", function () {
    return MesaCoin.deployed()
      .then(function (instance) {
        tokenInstance = instance;
        return tokenInstance.totalSupply();
      })
      .then(function (totalSupply) {
        assert.equal(totalSupply.toNumber(), TOTAL);
      });
  });
});
