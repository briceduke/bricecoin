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

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;


    constructor(uint256 _initalSupply) public {
        // Allocate supply to admin account
        balanceOf[msg.sender] = _initalSupply;

        totalSupply = _initalSupply;

    }

    // Transfer Logic

    function transfer(address _to, uint256 _value) public returns (bool success) {
    // Validate
    require(balanceOf[msg.sender] >= _value);

    // Transfer
    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;

    // Event
    emit Transfer(msg.sender, _to, _value);

    // TODO: Return
    }
}