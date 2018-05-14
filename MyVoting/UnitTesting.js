var Web3 = require('web3');

if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
} else {
	// set the provider you want from Web3.providers
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
var accounts_index = 0;
//unlock account used for testing
web3.personal.unlockAccount(web3.eth.accounts[accounts_index], "");

//connect to the smart contract
var abi_crypto = [{"constant":false,"inputs":[{"name":"xG","type":"uint256"},{"name":"yG","type":"uint256"},{"name":"w","type":"uint256"},{"name":"r1","type":"uint256"},{"name":"d1","type":"uint256"},{"name":"x","type":"uint256"}],"name":"create1outof2ZKPYesVote","outputs":[{"name":"res","type":"uint256[5]"},{"name":"res2","type":"uint256[4]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"},{"name":"m","type":"uint256"}],"name":"submod","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"yG","type":"uint256"},{"name":"x","type":"uint256"},{"name":"v","type":"uint256"}],"name":"createVote","outputs":[{"name":"y","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"x","type":"uint256"},{"name":"v","type":"uint256"}],"name":"createZKP","outputs":[{"name":"res","type":"uint256[2]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"params","type":"uint256[4]"},{"name":"xG","type":"uint256"},{"name":"yG","type":"uint256"},{"name":"y","type":"uint256"},{"name":"a1","type":"uint256"},{"name":"b1","type":"uint256"},{"name":"a2","type":"uint256"},{"name":"b2","type":"uint256"}],"name":"verify1outof2ZKP","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"xG","type":"uint256"},{"name":"yG","type":"uint256"},{"name":"y","type":"uint256"}],"name":"commitToVote","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"xG","type":"uint256"},{"name":"yG","type":"uint256"},{"name":"w","type":"uint256"},{"name":"r2","type":"uint256"},{"name":"d2","type":"uint256"},{"name":"x","type":"uint256"}],"name":"create1outof2ZKPNoVote","outputs":[{"name":"res","type":"uint256[5]"},{"name":"res2","type":"uint256[4]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"xG","type":"uint256"},{"name":"r","type":"uint256"},{"name":"vG","type":"uint256"}],"name":"verifyZKP","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"x1","type":"uint256"},{"indexed":false,"name":"x2","type":"uint256"}],"name":"Debug","type":"event"}];
var crypto_contract = web3.eth.contract(abi_crypto);
var cryptoAddr = crypto_contract.at("0xf42b8390bc7bd501b959e68384c739df6a53b6f7");

