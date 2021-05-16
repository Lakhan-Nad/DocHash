pragma solidity >=0.4.21 <0.7.0;

contract Ownable {
    address public owner;

    event OwnershipTransferred(address indexed from, address indexed to);

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(isOwner(), "Access Denied");
    }

    function transferOwnership(address memory to) public onlyOwner {
        require(to != address(0), "Invalid Owner address");
        emit OwnershipTransferred(owner, to);
        owner = to;
    }

    function isOwner() public view returns (bool) {
        return msg.sender == owner;
    }
}
