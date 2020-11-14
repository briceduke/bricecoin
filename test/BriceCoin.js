require("dotenv").config();

var BriceCoin = artifacts.require("./BriceCoin.sol");

const TOTAL = process.env.TOTAL;

contract("BriceCoin", function (accounts) {
  it("sets total supply on depl.", function () {
    return BriceCoin.deployed()
      .then(function (instance) {
        tokenInstance = instance;
        return tokenInstance.totalSupply();
      })
      .then(function (totalSupply) {
        assert.equal(totalSupply.toNumber(), TOTAL);
      });
  });
});
