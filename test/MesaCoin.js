require("dotenv").config();

var MesaCoin = artifacts.require("./MesaCoin.sol");

const TOTAL = process.env.TOTAL;

contract("MesaCoin", function (accounts) {
  let tokenInstance;

  it("init with values", function () {
    return MesaCoin.deployed()
      .then(function (instance) {
        tokenInstance = instance;
        return tokenInstance.name();
      })
      .then(function (name) {
        assert.equal(name, "MesaCoin", "correct name");
        return tokenInstance.symbol();
      })
      .then(function (symbol) {
        assert.equal(symbol, "MESA", "correct symbol");
        return tokenInstance.standard();
      })
      .then(function (standard) {
        assert.equal(standard, "MESA Token v1.0", "correct standard");
      });
  });

  it("sets total supply on depl.", function () {
    return MesaCoin.deployed()
      .then(function (instance) {
        tokenInstance = instance;
        return tokenInstance.totalSupply();
      })
      .then(function (totalSupply) {
        assert.equal(totalSupply.toNumber(), TOTAL);
        return tokenInstance.balanceOf(accounts[0]);
      })
      .then(function (adminBal) {
        assert.equal(adminBal.toNumber(), TOTAL);
      });
  });
});
