// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract FileContract {

    uint256 constant priceForAccess = 0.016 ether; // price for access
    enum FileType {Public, Private, Shared}

    struct File {
        string fileName;
        string ipfsHash;
        address payable owner;
        FileType fileType;
    }

    mapping(string => File) files;
    mapping(string => address[]) requests;
    mapping(string => address[]) grants;

    function fileExists(string memory fileName) private view returns(bool){
        if(files[fileName].owner == address(0)){
            return(false);
        }
        return(true);
    }

    function requestAccess(string calldata fileName, address payable user) external payable returns (bool) {
        require(user != msg.sender, "Owner can't request access");
        require(fileExists(fileName), "No such file exists");
        if(files[fileName].fileType == FileType.Private) {
            return (false);
        }
        if (files[fileName].fileType == FileType.Public) {
            return(true);
        }
        requests[fileName].push(user);
        uint i = 0;
        uint len = requests[fileName].length;
        for (; i != len - 1; i++) {
            if (requests[fileName][i] == user) {
                requests[fileName].pop();
                return(false);
            }
        }
        address(files[fileName].owner).transfer(priceForAccess);
        return(true);
    }

    function grantAccess(string calldata fileName, address payable user) external payable returns (bool) {
        require(fileExists(fileName), "No such file exists");
        require(user != msg.sender, "Owner can't request access");
        require(files[fileName].owner == msg.sender, "Only owner can grant access");
        uint len = requests[fileName].length;
        uint i = 0;
        for (; i != len; i++) {
            if (requests[fileName][i] == user) {
                requests[fileName][i] = requests[fileName][len - 1];
                requests[fileName].pop();
                return(true);
            }
        }
        return(false);
    }

    function changeOwner(address payable newUser, string calldata fileName) external payable{
        require(newUser != msg.sender, "Can't make yourself as a user");
        require(msg.sender == files[fileName].owner, "Only owner can change owner of file");
        files[fileName].owner = newUser;
    }

    function addFile(string calldata fileHash, string calldata fileName, FileType fileType) external returns (string memory){
        require(fileExists(fileName) == false, "File already exists");
        files[fileName].owner = msg.sender;
        files[fileName].ipfsHash = fileHash;
        files[fileName].fileName = fileName;
        files[fileName].fileType = fileType;
        return (fileName);
    }
}

