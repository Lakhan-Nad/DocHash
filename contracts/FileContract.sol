// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract FileContract {
    uint256 constant priceForAccess = 0.016 ether; // price for access

    struct File {
        string fileName;
        string ipfsHash;
        address owner;
    }

    mapping(string => File) files;
    mapping(string => address[]) requests;
    mapping(string => address[]) grants;

    function fileExists(string memory fileName) private view returns (bool) {
        if (files[fileName].owner == address(0)) {
            return (false);
        }
        return (true);
    }

    event RequestAccess(address user, string fileName);

    function requestAccess(string calldata fileName)
        external
        payable
        returns (bool)
    {
        require(fileExists(fileName), "No such file exists");
        require(
            msg.sender != files[fileName].owner,
            "Owner can't request his own file"
        );
        if (granted(fileName, msg.sender)) {
            emit AlreadyGranted(msg.sender, fileName);
            return (false);
        }
        uint256 i = 0;
        uint256 len = requests[fileName].length;
        for (; i != len; i++) {
            if (requests[fileName][i] == msg.sender) {
                emit AlreadyRequested(msg.sender, fileName);
                return (false);
            }
        }
        requests[fileName].push(msg.sender);
        emit RequestAccess(msg.sender, fileName);
        return (true);
    }

    event AccessGranted(address user, string fileName);

    function grantAccess(string calldata fileName, address payable user)
        external
        returns (bool)
    {
        require(fileExists(fileName), "No such file exists");
        require(
            files[fileName].owner == msg.sender,
            "Only owner can grant access"
        );
        require(user != msg.sender, "Owner can't request access");
        if (granted(fileName, user)) {
            emit AlreadyGranted(user, fileName);
            return (false);
        }
        uint256 i = 0;
        uint256 len = requests[fileName].length;
        for (; i != len; i++) {
            if (requests[fileName][i] == user) {
                requests[fileName][i] = requests[fileName][len - 1];
                requests[fileName].pop();
                grants[fileName].push(user);
                emit AccessGranted(user, fileName);
                return (true);
            }
        }
        emit NoSuchAccessRequest(user, fileName);
        return (false);
    }

    event AccessRejected(address user, string fileName);

    function rejectAccess(string calldata fileName, address payable user)
        external
        returns (bool)
    {
        require(fileExists(fileName), "No such file exists");
        require(
            files[fileName].owner == msg.sender,
            "Only owner can reject access"
        );
        require(user != msg.sender, "Owner can't reject their access");
        uint256 i = 0;
        uint256 len = requests[fileName].length;
        for (; i != len; i++) {
            if (requests[fileName][i] == user) {
                requests[fileName][i] = requests[fileName][len - 1];
                requests[fileName].pop();
                emit AccessRejected(user, fileName);
                return (true);
            }
        }
        emit NoSuchAccessRequest(user, fileName);
        return (false);
    }

    event AccessDeleted(address user, string fileName);

    function deleteAccess(string calldata fileName, address payable user)
        external
        returns (bool)
    {
        require(fileExists(fileName), "No such file exists");
        require(
            files[fileName].owner == msg.sender,
            "Only owner can delete access"
        );
        require(user != msg.sender, "Owner can't delete their access");
        uint256 i = 0;
        uint256 len = grants[fileName].length;
        for (; i != len; i++) {
            if (grants[fileName][i] == user) {
                grants[fileName][i] = grants[fileName][len - 1];
                grants[fileName].pop();
                emit AccessDeleted(user, fileName);
                return (true);
            }
        }
        emit NoSuchAccessGranted(user, fileName);
        return (false);
    }

    event OwnerChanged(address from, address to, string fileName);

    function changeOwner(address payable newUser, string calldata fileName)
        external
        returns (bool)
    {
        require(
            msg.sender == files[fileName].owner,
            "Only owner can change owner of file"
        );
        require(fileExists(fileName), "File doesn't exists");
        require(newUser != msg.sender, "Alreay owner");
        files[fileName].owner = newUser;
        emit OwnerChanged(msg.sender, newUser, fileName);
        return (true);
    }

    event FileUpdated(string fileName);

    function updateFile(string calldata fileName, string calldata ipfsHash)
        external
        returns (bool)
    {
        require(
            msg.sender == files[fileName].owner,
            "Only owner can change file"
        );
        require(fileExists(fileName), "File doesn't exists");
        files[fileName].ipfsHash = ipfsHash;
        emit FileUpdated(fileName);
        return (true);
    }

    event FileAdded(string fileName, address owner);

    function addFile(string calldata fileName, string calldata fileHash)
        external
        returns (bool)
    {
        require(fileExists(fileName) == false, "File already exists");
        files[fileName].owner = msg.sender;
        files[fileName].ipfsHash = fileHash;
        files[fileName].fileName = fileName;
        emit FileAdded(fileName, files[fileName].owner);
        return (true);
    }

    function granted(string memory fileName, address user)
        private
        view
        returns (bool)
    {
        if (!fileExists(fileName)) {
            return (false);
        }
        if (user == files[fileName].owner) {
            return (true);
        }
        uint256 len = grants[fileName].length;
        uint256 i = 0;
        for (; i != len; i++) {
            if (grants[fileName][i] == user) {
                return (true);
            }
        }
        return (false);
    }

    function getFileData(string calldata fileName)
        external
        view
        returns (string memory, string memory)
    {
        require(
            granted(fileName, msg.sender),
            "You don't have access to the data"
        );
        return (files[fileName].fileName, files[fileName].ipfsHash);
    }

    event AlreadyGranted(address user, string fileName);
    event AlreadyRejected(address user, string fileName);
    event AlreadyRequested(address user, string fileName);
    event NoSuchAccessRequest(address user, string fileName);
    event NoSuchAccessGranted(address user, string fileName);
}
