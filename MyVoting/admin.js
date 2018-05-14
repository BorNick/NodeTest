var Web3 = require('web3');

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

var connectedToContract = false;
var openedContractChoice = false;
var openedLogIn = false;
var signedIn = false;
var addressChosen = false;
var eligibleTextBoxCreated = false;
var finishedEligible = false;
var finishRegistrationCreated = false;
var commitCreate = false;
var voteCreate = false;
var tallyCreate = false;

// MyVoting Contract
var abi = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"eligible","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"computeTally","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"addressid","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totaleligible","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getVoter","outputs":[{"name":"_registeredkey","type":"uint256"},{"name":"_reconstructedkey","type":"uint256"},{"name":"_commitment","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"commitmentphase","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"question","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"params","type":"uint256[4]"},{"name":"y","type":"uint256"},{"name":"a1","type":"uint256"},{"name":"b1","type":"uint256"},{"name":"a2","type":"uint256"},{"name":"b2","type":"uint256"}],"name":"verify1outof2ZKP","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address[]"}],"name":"setEligible","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"h","type":"bytes32"}],"name":"submitCommitment","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"finishRegistrationPhase","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalcommitted","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"votecast","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalvoted","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_question","type":"string"},{"name":"enableCommitmentPhase","type":"bool"}],"name":"beginSignUp","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"params","type":"uint256[4]"},{"name":"y","type":"uint256"},{"name":"a1","type":"uint256"},{"name":"b1","type":"uint256"},{"name":"a2","type":"uint256"},{"name":"b2","type":"uint256"}],"name":"submitVote","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"commitment","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"registered","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"refunds","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"state","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"finaltally","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalregistered","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"voters","outputs":[{"name":"addr","type":"address"},{"name":"registeredkey","type":"uint256"},{"name":"reconstructedkey","type":"uint256"},{"name":"commitment","type":"bytes32"},{"name":"vote","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"addresses","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"xG","type":"uint256"},{"name":"vG","type":"uint256"},{"name":"r","type":"uint256"}],"name":"register","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"xG","type":"uint256"},{"name":"r","type":"uint256"},{"name":"vG","type":"uint256"}],"name":"verifyZKP","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
var myvoting = web3.eth.contract(abi);
var myvotingAddr;// = myvoting.at("0x4a44696abed2e2a0b8c9cd6379ca0a98271cc071");

var addr;
var accountindex;
var state = 0;

function openContractChoice() {
	
	if(!openedContractChoice){
		openedContractChoice = true;
		hideAll();
		document.getElementById('contract').removeAttribute("hidden");
	}
}

function connectToContract(){
	if(!connectedToContract) {
		connectedToContract = true;
		document.getElementById("contract_address").innerHTML = document.getElementById("addr").value;
		myvotingAddr =  myvoting.at(document.getElementById("addr").value);
		currentState();
	}
}

function createContract(){
	if(!connectedToContract) {
		myvotingAddr = myvoting.new(
		{
			from: addr, 
			data: '0x60806040523480156200001157600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000601060016101000a81548160ff021916908360048111156200007257fe5b02179055506040805190810160405280600f81526020017f4e6f207175657374696f6e207365740000000000000000000000000000000000815250600d9080519060200190620000c4929190620000cb565b506200017a565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200010e57805160ff19168380011785556200013f565b828001600101855582156200013f579182015b828111156200013e57825182559160200191906001019062000121565b5b5090506200014e919062000152565b5090565b6200017791905b808211156200017357600081600090555060010162000159565b5090565b90565b6121bb806200018a6000396000f30060806040526004361061015f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630713b139146101645780630997a83a146101bf57806314cf9c53146101d657806324b4bdfd1461022d5780632b37f53c14610258578063371f714a146102995780633fad9ae0146102c8578063411f837a1461035857806347723ef3146103f457806353f3eb8f1461045a5780636447d2081461048b5780636e1e65c2146104ba578063742d4d31146104e55780637b6b698c146105405780638da5cb5b1461056b578063a42dfdd4146105c2578063b146649e1461064f578063b18f0de2146106eb578063b2dd5c0714610746578063bc3da535146107a1578063c19d93fb146107f8578063c8f347c114610831578063d565663914610872578063da58c7d91461089d578063edf26d9b1461092e578063faa5c5641461099b578063fdc7ddf3146109f4575b600080fd5b34801561017057600080fd5b506101a5600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610a4d565b604051808215151515815260200191505060405180910390f35b3480156101cb57600080fd5b506101d4610a6d565b005b3480156101e257600080fd5b50610217600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610c65565b6040518082815260200191505060405180910390f35b34801561023957600080fd5b50610242610c7d565b6040518082815260200191505060405180910390f35b34801561026457600080fd5b5061026d610c83565b604051808481526020018381526020018260001916600019168152602001935050505060405180910390f35b3480156102a557600080fd5b506102ae610d1c565b604051808215151515815260200191505060405180910390f35b3480156102d457600080fd5b506102dd610d2f565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561031d578082015181840152602081019050610302565b50505050905090810190601f16801561034a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561036457600080fd5b506103da60048036038101908080608001906004806020026040519081016040528092919082600460200280828437820191505050505091929192908035906020019092919080359060200190929190803590602001909291908035906020019092919080359060200190929190505050610dcd565b604051808215151515815260200191505060405180910390f35b34801561040057600080fd5b50610458600480360381019080803590602001908201803590602001908080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505091929192905050506110fc565b005b34801561046657600080fd5b5061048960048036038101908080356000191690602001909291905050506112e0565b005b34801561049757600080fd5b506104a0611466565b604051808215151515815260200191505060405180910390f35b3480156104c657600080fd5b506104cf61166d565b6040518082815260200191505060405180910390f35b3480156104f157600080fd5b50610526600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611673565b604051808215151515815260200191505060405180910390f35b34801561054c57600080fd5b50610555611693565b6040518082815260200191505060405180910390f35b34801561057757600080fd5b50610580611699565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156105ce57600080fd5b50610635600480360381019080803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091929192908035151590602001909291905050506116be565b604051808215151515815260200191505060405180910390f35b34801561065b57600080fd5b506106d1600480360381019080806080019060048060200260405190810160405280929190826004602002808284378201915050505050919291929080359060200190929190803590602001909291908035906020019092919080359060200190929190803590602001909291905050506117c8565b604051808215151515815260200191505060405180910390f35b3480156106f757600080fd5b5061072c600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611acc565b604051808215151515815260200191505060405180910390f35b34801561075257600080fd5b50610787600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611aec565b604051808215151515815260200191505060405180910390f35b3480156107ad57600080fd5b506107e2600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611b0c565b6040518082815260200191505060405180910390f35b34801561080457600080fd5b5061080d611b24565b6040518082600481111561081d57fe5b60ff16815260200191505060405180910390f35b34801561083d57600080fd5b5061085c60048036038101908080359060200190929190505050611b37565b6040518082815260200191505060405180910390f35b34801561087e57600080fd5b50610887611b51565b6040518082815260200191505060405180910390f35b3480156108a957600080fd5b506108c860048036038101908080359060200190929190505050611b57565b604051808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200185815260200184815260200183600019166000191681526020018281526020019550505050505060405180910390f35b34801561093a57600080fd5b5061095960048036038101908080359060200190929190505050611bad565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156109a757600080fd5b506109da600480360381019080803590602001909291908035906020019092919080359060200190929190505050611beb565b604051808215151515815260200191505060405180910390f35b348015610a0057600080fd5b50610a33600480360381019080803590602001909291908035906020019092919080359060200190929190505050611e75565b604051808215151515815260200191505060405180910390f35b60046020528060005260406000206000915054906101000a900460ff1681565b6000806000806003806004811115610a8157fe5b601060019054906101000a900460ff166004811115610a9c57fe5b141515610aa857600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610b0357600080fd5b60019450600091505b600954821015610bda57600660006003600085815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161515610ba457600080fd5b60036000838152602001908152602001600020600401549350600b801515610bc857fe5b84860994508180600101925050610b0c565b600091505b60095482111515610c2257610bf7600683600b611f7f565b851415610c155781600e6000600281101515610c0f57fe5b01819055505b8180600101925050610bdf565b600954600e6001600281101515610c3557fe5b01819055506004601060016101000a81548160ff02191690836004811115610c5957fe5b02179055505050505050565b60026020528060005260406000206000915090505481565b600a5481565b600080600080600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905060036000828152602001908152602001600020600101549350600360008281526020019081526020016000206002015492506003600082815260200190815260200160002060030154915050909192565b601060009054906101000a900460ff1681565b600d8054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610dc55780601f10610d9a57610100808354040283529160200191610dc5565b820191906000526020600020905b815481529060010190602001808311610da857829003601f168201915b505050505081565b6000806000806000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054935060036000858152602001908152602001600020600201549250600360008581526020019081526020016000206001015491506001600b03801515610e5757fe5b8b6001600481101515610e6657fe5b60200201518c6000600481101515610e7a57fe5b602002015108600b600233858e8e8e8e8e604051808873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014018781526020018681526020018581526020018481526020018381526020018281526020019750505050505050506020604051808303816000865af1158015610f1c573d6000803e3d6000fd5b5050506040513d6020811015610f3157600080fd5b810190808051906020019092919050505060019004811515610f4f57fe5b06141515610f6057600094506110ee565b600b801515610f6b57fe5b610f8a838d6000600481101515610f7e57fe5b6020020151600b611f7f565b610faa60068e6002600481101515610f9e57fe5b6020020151600b611f7f565b0989141515610fbc57600094506110ee565b600b801515610fc757fe5b610fe68b8d6000600481101515610fda57fe5b6020020151600b611f7f565b611005858e6002600481101515610ff957fe5b6020020151600b611f7f565b098814151561101757600094506110ee565b600b80151561102257fe5b611041838d600160048110151561103557fe5b6020020151600b611f7f565b61106160068e600360048110151561105557fe5b6020020151600b611f7f565b098714151561107357600094506110ee565b61107f6006600b61203e565b9050600b80151561108c57fe5b6110b8600b80151561109a57fe5b838d098d60016004811015156110ac57fe5b6020020151600b611f7f565b6110d7858e60036004811015156110cb57fe5b6020020151600b611f7f565b09861415156110e957600094506110ee565b600194505b505050509695505050505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561115957600080fd5b600090505b81518110156112dc5760046000838381518110151561117957fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615156112cf5760016004600084848151811015156111e557fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506001828281518110151561125057fe5b9060200190602002015190806001815401808255809150509060018203906000526020600020016000909192909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506001600a600082825401925050819055505b808060010191505061115e565b5050565b600060028060048111156112f057fe5b601060019054906101000a900460ff16600481111561130b57fe5b14151561131757600080fd5b600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161515611461576001600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549150826003600084815260200190815260200160002060030181600019169055506001600b5401600b81905550600954600b541415611460576003601060016101000a81548160ff0219169083600481111561145a57fe5b02179055505b5b505050565b600080600080600080600180600481111561147d57fe5b601060019054906101000a900460ff16600481111561149857fe5b1415156114a457600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156114ff57600080fd5b6003600954101561150f57611664565b600092505b6009548310156116005760019450600091505b8282101561156257600b80151561153a57fe5b6003600084815260200190815260200160002060010154860994508180600101925050611527565b600193506001830191505b6009548210156115aa57600b80151561158257fe5b600360008481526020019081526020016000206001015485099350818060010192505061156d565b6001841415156115c6576115bf84600b61203e565b95506115cb565b600195505b600b8015156115d657fe5b86860960036000858152602001908152602001600020600201819055508280600101935050611514565b601060009054906101000a900460ff161561163e576002601060016101000a81548160ff0219169083600481111561163457fe5b0217905550611663565b6003601060016101000a81548160ff0219169083600481111561165d57fe5b02179055505b5b50505050505090565b600b5481565b60066020528060005260406000206000915054906101000a900460ff1681565b600c5481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000808060048111156116cd57fe5b601060019054906101000a900460ff1660048111156116e857fe5b1415156116f457600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561174f57600080fd5b60036001805490501015156117bc576001601060016101000a81548160ff0219169083600481111561177d57fe5b021790555083600d90805190602001906117989291906120ea565b5082601060006101000a81548160ff021916908315150217905550600191506117c1565b600091505b5092915050565b600080600060038060048111156117db57fe5b601060019054906101000a900460ff1660048111156117f657fe5b14151561180257600080fd5b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549250600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1680156118e75750600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16155b15611aba57601060009054906101000a900460ff1615611a1957338a600360008681526020019081526020016000206001015460036000878152602001908152602001600020600201548c8c8c8c8c604051808a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140189600460200280838360005b838110156119a2578082015181840152602081019050611987565b505050509050018881526020018781526020018681526020018581526020018481526020018381526020018281526020019950505050505050505050604051809103902091508160001916600360008581526020019081526020016000206003015460001916141515611a185760009350611abf565b5b611a278a8a8a8a8a8a610dcd565b15611ab9578860036000858152602001908152602001600020600401819055506001600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506001600c6000828254019250508190555060019350611abf565b5b600093505b5050509695505050505050565b60076020528060005260406000206000915054906101000a900460ff1681565b60056020528060005260406000206000915054906101000a900460ff1681565b60086020528060005260406000206000915090505481565b601060019054906101000a900460ff1681565b600e81600281101515611b4657fe5b016000915090505481565b60095481565b60036020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154908060030154908060040154905085565b600181815481101515611bbc57fe5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006001806004811115611bfb57fe5b601060019054906101000a900460ff166004811115611c1657fe5b141515611c2257600080fd5b600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615611e6857611c7f858486611e75565b8015611cd55750600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16155b15611e6757600954600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555060a0604051908101604052803373ffffffffffffffffffffffffffffffffffffffff168152602001868152602001600081526020016000600102600019168152602001600081525060036000600954815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101556040820151816002015560608201518160030190600019169055608082015181600401559050506001600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550600160096000828254019250508190555060019150611e6d565b5b600091505b509392505050565b60008060008060008060023360068b8a604051808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014018481526020018381526020018281526020019450505050506020604051808303816000865af1158015611f01573d6000803e3d6000fd5b5050506040513d6020811015611f1657600080fd5b8101908080519060200190929190505050945084600190049350611f3d600689600b611f7f565b9250611f4b8985600b611f7f565b9150600b801515611f5857fe5b828409905086811415611f6e5760019550611f73565b600095505b50505050509392505050565b6000806000851415611f945760009150612036565b6000841415611fa65760019150612036565b6000831415611fb457600080fd5b600191507f800000000000000000000000000000000000000000000000000000000000000090508090505b801561203557828185161515860a84848509099150826002820485161515860a84848509099150826004820485161515860a84848509099150826008820485161515860a84848509099150601081049050611fdf565b5b509392505050565b600080600080600080600088148061205557508688145b806120605750600087145b1561206a57600080fd5b8688111561208157868881151561207d57fe5b0697505b600193508692508791505b6000821415156120c55781838115156120a157fe5b0490508384820286038384840286038095508196508297508398505050505061208c565b60008512156120db5784600003870395506120df565b8495505b505050505092915050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061212b57805160ff1916838001178555612159565b82800160010185558215612159579182015b8281111561215857825182559160200191906001019061213d565b5b509050612166919061216a565b5090565b61218c91905b80821115612188576000816000905550600101612170565b5090565b905600a165627a7a723058205dcc599f886c1362b9ecd203fdbe4161a3e5a25b339466cfb7f0dd87d9d86bae0029', 
			gas: '4700000'
		}, function (e, contract){
			console.log(e, contract);
			document.getElementById("contract_address").innerHTML = "Waiting for Ethtereum";
			document.getElementById('contract').setAttribute("hidden", true);
			if (typeof contract.address !== 'undefined') {
				connectedToContract = true;
				console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
				document.getElementById("contract_address").innerHTML = contract.address;
				currentState();
			}
		})
	}
}

function openLogin() {

	if(!openedLogIn) {
		openedLogIn = true;
		document.getElementById('login').removeAttribute("hidden");
		var selectbox = "<p>Address: <select id='addrs'>";

		//var foundOwner = false;

		// Let user select one of their Ethereum addresses
		for(var i=0; i<web3.eth.accounts.length; i++) {

			//if(myvotingAddr.owner() == web3.eth.accounts[i]) {
				//foundOwner = true;
				selectbox = selectbox + '<option value="' + i + '">' + web3.eth.accounts[i] + '</option>';
			//}
		}

		selectbox = selectbox + "</select></p>";
		selectbox = selectbox + "<p>Password: <input type='password' id='passwordf' value='' name='fname'> <button onclick='unlock()' class='btn btn-primary'>Unlock</button> </p>";

		//if(foundOwner) {
			document.getElementById('dropdown').innerHTML = selectbox;
		//} else {
		//	document.getElementById('dropdown').innerHTML = "You do not have an Ethereum account that is the Election Authority for this vote";
		//}
	}
}

function unlock() {
	var _addr = $('#addrs').find(":selected").text();
	var _password = document.getElementById('passwordf').value;

	if(web3.personal.unlockAccount(_addr,_password)) {
		addressChosen = true;
		addr = _addr;
		password = _password;
		accountindex = $( "#addrs" ).val();
		signedIn = true;
		document.getElementById('login').setAttribute("hidden", true);
		currentState();
	}
}

// Check that the user is eligible to vote
function setEligible() {
  var tempaddr;

  if(addressChosen) {

    var lastchar = document.getElementById('addresses').value.trim().slice(-1);
    var toSplit;

    // Make sure the user has not ended the list with ','
    if(lastchar == ',') {
      var len = document.getElementById('addresses').value.length;
      toSplit = document.getElementById('addresses').value.substring(0,len-1);

    } else {
      toSplit = document.getElementById('addresses').value;
    }

    var split = toSplit.split(",");

    // TODO: Sanity check the list ... verify they are all valid Ethereum addresses
    var addresses = new Array();

    // TODO: Check with Ethereum how many addresses have ALREADY been accepted.
    // It will only hold UP to 40. No point sending 40 if Ethereum already has 25. (We should send 15 in that case).
    var uptolimit;

    if(split.length > 40) {
      if(!confirm("We can only use the first 40 addresses... Is this ok?")) {
        return;
      }
      uptolimit = 40;
    } else {
      uptolimit = split.length;
    }

    // No point re-submiting an address if it is already eligible
    for(var i=0; i<uptolimit; i++) {
      if(!myvotingAddr.eligible(split[i])) {
        addresses.push(split[i]);
      }
    }

    // Do we have any addresses that are not yet eligible?
    if(addresses.length > 0) {
      //web3.personal.unlockAccount(addr,password)
      var res = myvotingAddr.setEligible.sendTransaction(addresses, {from:web3.eth.accounts[accountindex], gas: 4200000})

      //txlist("Set Eligible: " + res);

      alert("Sent " + addresses.length + " addresses to Ethereum whitelist");
    } else {
      alert("All addresses are already eligible!");
    }

  } else {
    alert("You need to select the admin address first!");
  }
}

function finishEligible() {
  if(myvotingAddr.totaleligible() >= 3) {
	finishedEligible = true;
    //document.getElementById('title').innerHTML = "The Election Time Table";
    //document.getElementById('section_desc').innerHTML = "";
    document.getElementById('eligible').setAttribute("hidden", true);
    document.getElementById('registrationSetQuestion').removeAttribute("hidden");
  } else {
    alert("A minimum number of 3 eligible voters is required before continuing.");
  }
}

// Allow people to start submiting their voting key.
function beginRegistration() {

  if(!addressChosen) {
    alert("Please unlock your Ethereum address.");
    return;
  }

  if(state != 0) {
    alert("Please wait until SETUP Phase");
    return;
  }

  // Make sure the option is enabled (tick box is checked)
  var enableCommitment = $('#commitmenttick').is(":checked");
  var endcommitment_val = 0;

  var question = document.getElementById('questioninput').value;

  //web3.personal.unlockAccount(addr,password);

  if(myvotingAddr.beginSignUp.call(question, enableCommitment, {from:web3.eth.accounts[accountindex] })) {
     var res = myvotingAddr.beginSignUp.sendTransaction(question, enableCommitment, {from:web3.eth.accounts[accountindex], gas: 4200000});
     document.getElementById("beginRegistrationbutton").innerHTML  = "Waiting for Ethereum to confirm that Registration has started";
     //txlist("Begin Registration Phase: " + res);
  } else {
     // TODO: Better error message, and perhaps JS to enforce minimum gap etc.
     alert("Ethereum will not accept those dates and times.");
  }
}

// Tell Ethereum to compute Tally
function tally() {

	// Ethereum Account needs to be unlocked.
	if(!addressChosen) {
		alert("Please unlock your Ethereum address");
		return;
	}

	// Make sure we are in the correct phase.
	if(state != 3) {
		alert("Please wait until VOTE Phase");
		return;
	}
	var reg = myvotingAddr.totalregistered();
	var voted = myvotingAddr.totalvoted();

	// Make sure everyone has voted!
	if(!reg.equals(voted)) {
		alert("Please wait for everyone to vote");
		return;
	}

	//TODO: Check that all votes have been cast..
	// Can do this by checking the public 'votecast' mapping...
	//web3.personal.unlockAccount(web3.eth.accounts[accountindex],password);
	var res = myvotingAddr.computeTally.sendTransaction({from:web3.eth.accounts[accountindex], gas: 4200000});
	document.getElementById("tallybutton").innerHTML  = "Waiting for Ethereum to confirm tally";
	//txlist("Compute Tally: " + res);
}

function createEligibleTextBox() {
	
	if(!eligibleTextBoxCreated) {
		hideAll();
		if(finishedEligible){
			document.getElementById('registrationSetQuestion').removeAttribute("hidden");
		}else{
			document.getElementById('eligible').removeAttribute("hidden");
		}
	}
}

function createFinishRegistration() {

  if(!finishRegistrationCreated) {
     finishRegistrationCreated = true;
    //  document.getElementById('title').innerHTML = "Voter Registration";
     hideAll();
     document.getElementById('finishRegistration').removeAttribute("hidden");
     document.getElementById('question').removeAttribute("hidden");
  }

  // Make sure it exists... We might be in the 'Please wait on Ethereum' part.
  if(document.getElementById('totalregistered') != null) {
    document.getElementById('totalregistered').innerHTML = "" + myvotingAddr.totalregistered() + "/" + myvotingAddr.totaleligible() + " voters have registered their ballot.";

    // Statistics on number of registered voters, and when authority can transition to the next phase
  }
}

// Allow the Election Authority to finish the registration phase...
function finishRegistration() {
  if(!addressChosen) {
    alert("Please unlock your Ethereum address");
    return;
  }

  if(state != 1) {
    alert("Please wait until Registration Phase");
    return;
  }

  if(myvotingAddr.totalregistered() < 3) {
    alert("Election cannot begin until there is 3 or more registered voters");
    return;
  }


  //web3.personal.unlockAccount(addr,password);

  res = myvotingAddr.finishRegistrationPhase.sendTransaction({from:web3.eth.accounts[accountindex], gas: 4200000});
  document.getElementById("finishRegistration").innerHTML  = "Waiting for Ethereum to confirm that Registration has finished";

  //txlist("Finish Registration Phase: " + res);
}

function createCommit() {

  if(!commitCreate) {
    commitCreate = true;
	hideAll();
    document.getElementById('commit').removeAttribute("hidden");
    document.getElementById('section_desc').innerHTML = "Waiting for voters to submit a commitment, but not reveal their encrypted vote to Etheruem. ";
  }

  // Keep track of how many voters have been set as eligible.
  document.getElementById('totalcommit').innerHTML = myvotingAddr.totalcommitted() + "/" + myvotingAddr.totalregistered() + " voters have sealed their vote.";

}

function createVote() {

  if(!voteCreate) {
    voteCreate = true;
	hideAll();
    document.getElementById('votephase').removeAttribute("hidden");
    document.getElementById('section_desc').innerHTML = "";
    //controlTransition("#pb_cast");
  }

  document.getElementById('totalvoters').innerHTML = myvotingAddr.totalvoted() + "/" + myvotingAddr.totalregistered() + " voters have cast their vote.";
}

function createTally() {

	if(!tallyCreate) {
		tallyCreate = true;

		//document.getElementById('tally').removeAttribute("hidden");

		// var res1 = anonymousvotingAddr.totalregistered().eq(anonymousvotingAddr.totalvoted());
		// var res2 = !anonymousvotingAddr.totalregistered().eq(new BigNumber("0"));
		// alert(res1 + " " + res2);

		if((myvotingAddr.totalregistered().eq(myvotingAddr.totalvoted())) && !myvotingAddr.totalregistered().eq(0)) {
			var yes = myvotingAddr.finaltally(0);
			var total = myvotingAddr.finaltally(1);
			var no = total - yes;
			document.getElementById("section_desc").innerHTML = "Yes = " + yes + " and No = " + no;
		} else {
			document.getElementById("section_desc").innerHTML = "Voting has been cancelled.";
		}

		hideAll();

		//controlTransition("#pb_tally");
	}
}

function hideAll(){
	document.getElementById('contract').setAttribute("hidden", true);
	document.getElementById('login').setAttribute("hidden", true);
	document.getElementById('eligible').setAttribute("hidden", true);
	document.getElementById('registrationSetQuestion').setAttribute("hidden", true);
	document.getElementById('votephase').setAttribute("hidden",true);
	document.getElementById('finishRegistration').setAttribute("hidden", true);
	document.getElementById('commit').setAttribute("hidden", true);
}

// Responsible for updating the website's text depending on the election's current phase. (i.e. if we are in VOTE, no point enabling compute button).
function currentState() {
	
	if (!addressChosen) {
		openLogin();
		return;
	}
	
	if (!connectedToContract) {
		openContractChoice();
		return;
	}
	

  state = myvotingAddr.state();
  //whatIsQuestion();

  if(state == 0) { // SETUP

    createEligibleTextBox();
  } else if(state == 1) { // SIGNUP
    createFinishRegistration();

  } else if(state == 2) { // COMMITMENT
    createCommit();

  } else if(state == 3) { // VOTE
    createVote();

  } else if(state == 4) { // TALLY
    createTally();

  } else {
    document.getElementById('state').innerHTML = "Undocumented Phase...";
  }
}
setInterval("currentState()", 10000);
currentState();