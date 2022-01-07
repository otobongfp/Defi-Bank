//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract RWD{
    string public name = 'Reward Token';
    string public symbol = 'RWD';
    uint256 public totalSupply = 1000000000000000000000000;//1 Million Tokens
    uint8 public decimals = 18;

    event Transfer(address indexed _from, address indexed _to, uint amount);
    event Approval(address indexed _owner, address indexed _spender, uint amount);

    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;

    constructor() public{
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint amount) public returns(bool success){
        require(balanceOf[msg.sender] >= amount);

        balanceOf[msg.sender] -= amount;
        balanceOf[_to] += amount;
        emit Transfer( msg.sender, _to, amount);
        return true;
    }

    function approve(address _spender, uint amount) public returns(bool success){
        allowance[msg.sender][_spender] = amount;
        emit Approval(msg.sender, _spender, amount);
        return true;
    }

    function transferFrom(address _from, address _to, uint amount) public returns(bool success) {
        require(balanceOf[_from] >= amount );
        require(allowance[_from][msg.sender] >= amount);
        balanceOf[_from] -= amount;
        allowance[msg.sender][_from] -= amount;
        balanceOf[_to] += amount;

        emit Transfer(_from, _to, amount);
        return true;
    }

}
