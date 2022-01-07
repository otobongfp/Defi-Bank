const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DefiBank = artifacts.require("DefiBank");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(Tether);
  const tether = await  Tether.deployed();

  await deployer.deploy(RWD);
  const rwd = await  RWD.deployed();

  await deployer.deploy(DefiBank, rwd.address, tether.address);
  const defiBank = await  DefiBank.deployed();

  //Tranfer our unique token to our DefiBank Smart Contract
  await rwd.transfer(defiBank.address, '1000000000000000000000000');

  //Tranfer a 100 Fake Tether Tokens to our investor
  await tether.transfer(accounts[1], '1000000000000000000');
};
