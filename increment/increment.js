var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	
	
var incrementContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"counter","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"increase","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"n","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
var myContract;

function connectToContract(){
	myContract =  incrementContract.at(document.getElementById("addr").value);
	document.getElementById("incButton").style.visibility = "visible";
	document.getElementById("refreshButton").style.visibility = "visible";
	document.getElementById("logButton").style.visibility = "visible";
	refresh();
}

function createContract(addr){
	var n = 0;
	myContract =  incrementContract.new(
		n,
	{
		from: web3.eth.accounts[0], 
		data: '0x6060604052341561000f57600080fd5b60405160208061015183398101604052808051906020019091905050806000806101000a81548160ff021916908360ff1602179055505060fd806100546000396000f3006060604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806361bc221a14604e578063e8927fbc14607a575b600080fd5b3415605857600080fd5b605e608c565b604051808260ff1660ff16815260200191505060405180910390f35b3415608457600080fd5b608a609e565b005b6000809054906101000a900460ff1681565b60008081819054906101000a900460ff168092919060010191906101000a81548160ff021916908360ff160217905550505600a165627a7a72305820953b9b8dea5585246fbbe908fad34d306c6ebf3ba6c2809746a7869da19c7d140029', 
		gas: '4700000'
	}, function (e, contract){
		console.log(e, contract);
		if (typeof contract.address !== 'undefined') {
			console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
			document.getElementById("incButton").style.visibility = "visible";
			document.getElementById("refreshButton").style.visibility = "visible";
			document.getElementById("logButton").style.visibility = "visible";
			document.getElementById("curValue").innerHTML = "Current value = ".concat(contract.counter().toString());
		}
	});
}

function increase(){
	myContract.increase({from: web3.eth.accounts[0], gas: 4700000});
	refresh();
}

function getCounter(){
	return myContract.counter();
}

function refresh(){
	document.getElementById("curValue").innerHTML = "Current value = ".concat(myContract.counter().toString());
}

/*var increment = incrementContract.at("0x164f2cc36e2431a9ec8e31db3c20a55092fb57d0"//);
var n = 0;
var increment = incrementContract.new(
n,
{
	from: web3.eth.accounts[0], 
	data: '0x6060604052341561000f57600080fd5b60405160208061015183398101604052808051906020019091905050806000806101000a81548160ff021916908360ff1602179055505060fd806100546000396000f3006060604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806361bc221a14604e578063e8927fbc14607a575b600080fd5b3415605857600080fd5b605e608c565b604051808260ff1660ff16815260200191505060405180910390f35b3415608457600080fd5b608a609e565b005b6000809054906101000a900460ff1681565b60008081819054906101000a900460ff168092919060010191906101000a81548160ff021916908360ff160217905550505600a165627a7a72305820953b9b8dea5585246fbbe908fad34d306c6ebf3ba6c2809746a7869da19c7d140029', 
	gas: '4700000'
}, function (e, contract){
	console.log(e, contract);
	if (typeof contract.address !== 'undefined') {
		console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
	}
});*/
//var result = increment.counter();
//console.log(result.toString());
//increment.increase({from: web3.eth.accounts[0], gas: 4700000});