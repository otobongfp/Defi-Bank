// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import './RWD.sol';
import './Tether.sol';

contract DefiBank {
  string public name = "DeFi Bank";
  address public owner = msg.sender;
  RWD public rwd;
  Tether public tether;

  address[] public stakers;

  mapping(address => uint) public stakingBalance;
  mapping(address => bool) public hasStaked;
  mapping(address => bool) public isStaking;

  constructor(RWD _rwd, Tether _tether) public {
    rwd = _rwd;
    tether = _tether;
    owner = msg.sender;
  }

  function depositTokens(uint _amount) public {

    require(_amount > 0, 'amount cannot be Zero');

    tether.transferFrom(msg.sender, address(this), _amount);

    stakingBalance[msg.sender] += _amount;

    if(!hasStaked[msg.sender]){
      stakers.push(msg.sender);
    }

    isStaking[msg.sender] = true;
    hasStaked[msg.sender] = true;
  }

    //used to issue our reward tokens
    function issueTokens() public{
      //only owner can issue tokens
      require(msg.sender == owner);
      for(uint i=0; i<stakers.length; i++){
        address recipient = stakers[i];
        uint balance = stakingBalance[recipient] / 9;
        rwd.transfer(recipient, balance);
      }
    }

    function unstakeTokens() public {
      uint balance = stakingBalance[msg.sender];
      require(balance > 0, 'Will only unstake for balances greater than Zero');

      tether.transfer(msg.sender, balance);

      //Reset balance of the staker
      stakingBalance[msg.sender] = 0;

      //Reset bool of isStaking
      isStaking[msg.sender] = false;

    }
  
}
