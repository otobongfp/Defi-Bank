const DefiBank = artifacts.require('DefiBank');

module.exports = async function issueRewards(callback){
    let defiBank = await DefiBank.deployed();
    await defiBank.issueTokens();
    console.log('Tokens have been issue successfully');
    callback();
}