pragma solidity ^0.5.16;

contract MesaCoin {
    // Read total tokens
    uint256 public totalSupply;

    // Name
    string public name = 'MesaCoin';
    // Symbol
    string public symbol = 'MESA';

    // Standard
    string public standard = 'MESA Token v1.0';

    mapping(address => uint256) public balanceOf;


    constructor(uint256 _initalSupply) public {
        // Allocate supply to admin account
        balanceOf[msg.sender] = _initalSupply;

        totalSupply = _initalSupply;

    }
}