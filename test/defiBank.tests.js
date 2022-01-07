const { assert } = require('chai');

const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DefiBank = artifacts.require("DefiBank");

require('chai')
.use(require("chai-as-promised"))
.should()

contract ('DefiBank', ([owner, customer]) => {

        //owner, customer above forms an iteration for an array of account[0] and accounts[1] only accounts can be used, in which case we can call it at such explicitly
    let tether, rwd, defiBank 

    function convertToken(number){
        return web3.utils.toWei(number, 'ether');
    }

    before (async() => {
        tether = await Tether.new();
        rwd = await RWD.new();
        defiBank = await  DefiBank.new(rwd.address, tether.address);

        //Transfer all Reward Token to DefiBank Contract
        await rwd.transfer(defiBank.address, convertToken('1000000'));

        //Transfer fake Tether Token to an investor
        await tether.transfer(customer, convertToken('100'), {from: owner})
    })

    describe('Fake Tether Deployment', async () => {
        it('Matches name successfully', async () =>{
            const name = await tether.name();
            assert.equal(name, 'Fake Tether');
        })
    })

    describe('Reward Token Deployment', async () => {
        it('Matches name successfully', async () =>{
            const name = await rwd.name();
            assert.equal(name, 'Reward Token');
        })
    })

    describe('DefiBank Deployment', async () => {
        it('Matches name successfully', async () =>{
            const name = await defiBank.name();
            assert.equal(name, 'DeFi Bank');
        })

        it('Contract has some Tokens', async () =>{
            const balance = await rwd.balanceOf(defiBank.address);
            assert.equal(balance, convertToken('1000000'));
        })

        describe('Yield Farming', async () => {
            it('rewards token for staking', async () =>{
                let value;
    
                //Check invesstor balance
                value = await tether.balanceOf(customer);
                assert.equal(value.toString(), convertToken('100'), 'customers fake tether token before staking');


                //Check Customer Staking
                // await tether.approve(defiBank.address, convertToken('100'), {from : customer});
                // await defiBank.depositTokens(convertToken('100'), {from : customer});

                //Check Updated balance of the DeFi Bank
                value = await tether.balanceOf(defiBank.address);
                assert.equal(value.toString(), convertToken('0'), 'DeFi Bank Contract Balance');

                //check is staking balance
                value = await defiBank.isStaking(customer);
                assert.equal(value.toString(), 'false' , 'Staked');

                //Issue Tokens
                await defiBank.issueTokens({from : owner});

                //Ensure that only the owner can issue tokens
                await defiBank.issueTokens({from : customer}).should.be.rejected;

                //To check Unstake function
                value = await defiBank.unstakeTokens({from : customer});
                

            })


        })
        
    })

    
})