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

  it("transfers token", function () {
    return MesaCoin.deployed()
      .then(function (instance) {
        tokenInstance = instance;
        return tokenInstance.transfer.call(accounts[1], 999999999999);
      })
      .then(assert.fail)
      .catch(function (error) {
        assert(
          error.message.indexOf("revert") >= 0,
          "error message must contain revert"
        );
        return tokenInstance.transfer(accounts[1], 15000, {
          from: accounts[0],
        });
      })
      .then(function (receipt) {
        assert.equal(receipt.logs.length, 1, "triggers one event");
        assert.equal(
          receipt.logs[0].event,
          "Transfer",
          'should be the "Transfer" event'
        );
        assert.equal(
          receipt.logs[0].args._from,
          accounts[0],
          "logs the account the tokens are transferred from"
        );
        assert.equal(
          receipt.logs[0].args._to,
          accounts[1],
          "logs the account the tokens are transferred to"
        );
        assert.equal(
          receipt.logs[0].args._value,
          15000,
          "logs the transfer amount"
        );
        return tokenInstance.balanceOf(accounts[1]);
      })
      .then(function (balance) {
        assert.equal(balance.toNumber(), 15000, "adds amt");
        return tokenInstance.balanceOf(accounts[0]);
      })
      .then(function (balance) {
        assert.equal(balance.toNumber(), 54420, "deducts amt");
      });
  });
});
