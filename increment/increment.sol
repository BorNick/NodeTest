pragma solidity ^0.4.0;
contract Increment {

    uint8 public counter;

    function Increment(uint8 n) public {
        counter = n;
    }

    function increase() public {
        counter++;
    }
}