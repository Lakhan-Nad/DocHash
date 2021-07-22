# DocHash

## Tech Stack Used

1. React for Frontend
2. Node.js for Backend
3. MongoDB Database
4. Solidity 
5. Web3.js
6. Truffle

## What does this project do?

This project is Blockchain and IPFS based solution for secure file sharing among peers. Allowing you to create files in also request to see other people files. 
The project allow users to request access for files and then these access request can be granted by owner.


## How this works and benefits

1. You upload the file in IPFS. The IPFS hash of file along with owner is saved in Blockchain. Some metadata is also saved in Mongo DB database.
2. Another user can request access to your files and you can grant access. But once access granted it can't be revoked.
3. Since file's IPFS Hash is saved in blockchain no one except the user can access it and since blockchain is immutable the proof of your ownership remains.
