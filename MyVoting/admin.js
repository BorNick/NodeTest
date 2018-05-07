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
var abi = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"eligible","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"computeTally","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"addressid","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totaleligible","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"y","type":"uint256"}],"name":"submitVote","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getVoter","outputs":[{"name":"_registeredkey","type":"uint256"},{"name":"_reconstructedkey","type":"uint256"},{"name":"_commitment","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"commitmentphase","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"question","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address[]"}],"name":"setEligible","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"h","type":"bytes32"}],"name":"submitCommitment","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"finishRegistrationPhase","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalcommitted","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"votecast","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalvoted","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_question","type":"string"},{"name":"enableCommitmentPhase","type":"bool"}],"name":"beginSignUp","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"commitment","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"registered","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"refunds","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"state","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"finaltally","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalregistered","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"voters","outputs":[{"name":"addr","type":"address"},{"name":"registeredkey","type":"uint256"},{"name":"reconstructedkey","type":"uint256"},{"name":"commitment","type":"bytes32"},{"name":"vote","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"addresses","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"xG","type":"uint256"},{"name":"vG","type":"uint256"},{"name":"r","type":"uint256"}],"name":"register","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"xG","type":"uint256"},{"name":"r","type":"uint256"},{"name":"vG","type":"uint256"}],"name":"verifyZKP","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
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
			data: '0x60806040523480156200001157600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000601060016101000a81548160ff021916908360048111156200007257fe5b02179055506040805190810160405280600f81526020017f4e6f207175657374696f6e207365740000000000000000000000000000000000815250600d9080519060200190620000c4929190620000cb565b506200017a565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200010e57805160ff19168380011785556200013f565b828001600101855582156200013f579182015b828111156200013e57825182559160200191906001019062000121565b5b5090506200014e919062000152565b5090565b6200017791905b808211156200017357600081600090555060010162000159565b5090565b90565b611d2d806200018a6000396000f300608060405260043610610154576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630713b139146101595780630997a83a146101b457806314cf9c53146101cb57806324b4bdfd146102225780632844328f1461024d5780632b37f53c14610292578063371f714a146102d35780633fad9ae01461030257806347723ef31461039257806353f3eb8f146103f85780636447d208146104295780636e1e65c214610458578063742d4d31146104835780637b6b698c146104de5780638da5cb5b14610509578063a42dfdd414610560578063b18f0de2146105ed578063b2dd5c0714610648578063bc3da535146106a3578063c19d93fb146106fa578063c8f347c114610733578063d565663914610774578063da58c7d91461079f578063edf26d9b14610830578063faa5c5641461089d578063fdc7ddf3146108f6575b600080fd5b34801561016557600080fd5b5061019a600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061094f565b604051808215151515815260200191505060405180910390f35b3480156101c057600080fd5b506101c961096f565b005b3480156101d757600080fd5b5061020c600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610b67565b6040518082815260200191505060405180910390f35b34801561022e57600080fd5b50610237610b7f565b6040518082815260200191505060405180910390f35b34801561025957600080fd5b5061027860048036038101908080359060200190929190505050610b85565b604051808215151515815260200191505060405180910390f35b34801561029e57600080fd5b506102a7610e28565b604051808481526020018381526020018260001916600019168152602001935050505060405180910390f35b3480156102df57600080fd5b506102e8610ec1565b604051808215151515815260200191505060405180910390f35b34801561030e57600080fd5b50610317610ed4565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561035757808201518184015260208101905061033c565b50505050905090810190601f1680156103845780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561039e57600080fd5b506103f660048036038101908080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284378201915050505050509192919290505050610f72565b005b34801561040457600080fd5b506104276004803603810190808035600019169060200190929190505050611156565b005b34801561043557600080fd5b5061043e6112dc565b604051808215151515815260200191505060405180910390f35b34801561046457600080fd5b5061046d6114e3565b6040518082815260200191505060405180910390f35b34801561048f57600080fd5b506104c4600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506114e9565b604051808215151515815260200191505060405180910390f35b3480156104ea57600080fd5b506104f3611509565b6040518082815260200191505060405180910390f35b34801561051557600080fd5b5061051e61150f565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561056c57600080fd5b506105d3600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803515159060200190929190505050611534565b604051808215151515815260200191505060405180910390f35b3480156105f957600080fd5b5061062e600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061163e565b604051808215151515815260200191505060405180910390f35b34801561065457600080fd5b50610689600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061165e565b604051808215151515815260200191505060405180910390f35b3480156106af57600080fd5b506106e4600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061167e565b6040518082815260200191505060405180910390f35b34801561070657600080fd5b5061070f611696565b6040518082600481111561071f57fe5b60ff16815260200191505060405180910390f35b34801561073f57600080fd5b5061075e600480360381019080803590602001909291905050506116a9565b6040518082815260200191505060405180910390f35b34801561078057600080fd5b506107896116c3565b6040518082815260200191505060405180910390f35b3480156107ab57600080fd5b506107ca600480360381019080803590602001909291905050506116c9565b604051808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200185815260200184815260200183600019166000191681526020018281526020019550505050505060405180910390f35b34801561083c57600080fd5b5061085b6004803603810190808035906020019092919050505061171f565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156108a957600080fd5b506108dc60048036038101908080359060200190929190803590602001909291908035906020019092919050505061175d565b604051808215151515815260200191505060405180910390f35b34801561090257600080fd5b506109356004803603810190808035906020019092919080359060200190929190803590602001909291905050506119e7565b604051808215151515815260200191505060405180910390f35b60046020528060005260406000206000915054906101000a900460ff1681565b600080600080600380600481111561098357fe5b601060019054906101000a900460ff16600481111561099e57fe5b1415156109aa57600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610a0557600080fd5b60019450600091505b600954821015610adc57600660006003600085815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161515610aa657600080fd5b60036000838152602001908152602001600020600401549350600b801515610aca57fe5b84860994508180600101925050610a0e565b600091505b60095482111515610b2457610af9600683600b611af1565b851415610b175781600e6000600281101515610b1157fe5b01819055505b8180600101925050610ae1565b600954600e6001600281101515610b3757fe5b01819055506004601060016101000a81548160ff02191690836004811115610b5b57fe5b02179055505050505050565b60026020528060005260406000206000915090505481565b600a5481565b60008060006003806004811115610b9857fe5b601060019054906101000a900460ff166004811115610bb357fe5b141515610bbf57600080fd5b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549250600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff168015610ca45750600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16155b15610e1b57601060009054906101000a900460ff1615610d8657336003600085815260200190815260200160002060010154600360008681526020019081526020016000206002015487604051808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c01000000000000000000000000028152601401848152602001838152602001828152602001945050505050604051809103902091508160001916600360008581526020019081526020016000206003015460001916141515610d855760009350610e20565b5b600115610e1a578460036000858152602001908152602001600020600401819055506001600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506001600c6000828254019250508190555060019350610e20565b5b600093505b505050919050565b600080600080600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905060036000828152602001908152602001600020600101549350600360008281526020019081526020016000206002015492506003600082815260200190815260200160002060030154915050909192565b601060009054906101000a900460ff1681565b600d8054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610f6a5780601f10610f3f57610100808354040283529160200191610f6a565b820191906000526020600020905b815481529060010190602001808311610f4d57829003601f168201915b505050505081565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610fcf57600080fd5b600090505b815181101561115257600460008383815181101515610fef57fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16151561114557600160046000848481518110151561105b57fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550600182828151811015156110c657fe5b9060200190602002015190806001815401808255809150509060018203906000526020600020016000909192909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506001600a600082825401925050819055505b8080600101915050610fd4565b5050565b6000600280600481111561116657fe5b601060019054906101000a900460ff16600481111561118157fe5b14151561118d57600080fd5b600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615156112d7576001600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549150826003600084815260200190815260200160002060030181600019169055506001600b5401600b81905550600954600b5414156112d6576003601060016101000a81548160ff021916908360048111156112d057fe5b02179055505b5b505050565b60008060008060008060018060048111156112f357fe5b601060019054906101000a900460ff16600481111561130e57fe5b14151561131a57600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561137557600080fd5b60036009541015611385576114da565b600092505b6009548310156114765760019450600091505b828210156113d857600b8015156113b057fe5b600360008481526020019081526020016000206001015486099450818060010192505061139d565b600193506001830191505b60095482101561142057600b8015156113f857fe5b60036000848152602001908152602001600020600101548509935081806001019250506113e3565b60018414151561143c5761143584600b611bb0565b9550611441565b600195505b600b80151561144c57fe5b8686096003600085815260200190815260200160002060020181905550828060010193505061138a565b601060009054906101000a900460ff16156114b4576002601060016101000a81548160ff021916908360048111156114aa57fe5b02179055506114d9565b6003601060016101000a81548160ff021916908360048111156114d357fe5b02179055505b5b50505050505090565b600b5481565b60066020528060005260406000206000915054906101000a900460ff1681565b600c5481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008080600481111561154357fe5b601060019054906101000a900460ff16600481111561155e57fe5b14151561156a57600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156115c557600080fd5b6003600180549050101515611632576001601060016101000a81548160ff021916908360048111156115f357fe5b021790555083600d908051906020019061160e929190611c5c565b5082601060006101000a81548160ff02191690831515021790555060019150611637565b600091505b5092915050565b60076020528060005260406000206000915054906101000a900460ff1681565b60056020528060005260406000206000915054906101000a900460ff1681565b60086020528060005260406000206000915090505481565b601060019054906101000a900460ff1681565b600e816002811015156116b857fe5b016000915090505481565b60095481565b60036020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154908060030154908060040154905085565b60018181548110151561172e57fe5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600180600481111561176d57fe5b601060019054906101000a900460ff16600481111561178857fe5b14151561179457600080fd5b600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16156119da576117f18584866119e7565b80156118475750600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16155b156119d957600954600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555060a0604051908101604052803373ffffffffffffffffffffffffffffffffffffffff168152602001868152602001600081526020016000600102600019168152602001600081525060036000600954815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101556040820151816002015560608201518160030190600019169055608082015181600401559050506001600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506001600960008282540192505081905550600191506119df565b5b600091505b509392505050565b60008060008060008060023360068b8a604051808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014018481526020018381526020018281526020019450505050506020604051808303816000865af1158015611a73573d6000803e3d6000fd5b5050506040513d6020811015611a8857600080fd5b8101908080519060200190929190505050945084600190049350611aaf600689600b611af1565b9250611abd8985600b611af1565b9150600b801515611aca57fe5b828409905086811415611ae05760019550611ae5565b600095505b50505050509392505050565b6000806000851415611b065760009150611ba8565b6000841415611b185760019150611ba8565b6000831415611b2657600080fd5b600191507f800000000000000000000000000000000000000000000000000000000000000090508090505b8015611ba757828185161515860a84848509099150826002820485161515860a84848509099150826004820485161515860a84848509099150826008820485161515860a84848509099150601081049050611b51565b5b509392505050565b6000806000806000806000881480611bc757508688145b80611bd25750600087145b15611bdc57600080fd5b86881115611bf3578688811515611bef57fe5b0697505b600193508692508791505b600082141515611c37578183811515611c1357fe5b04905083848202860383848402860380955081965082975083985050505050611bfe565b6000851215611c4d578460000387039550611c51565b8495505b505050505092915050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10611c9d57805160ff1916838001178555611ccb565b82800160010185558215611ccb579182015b82811115611cca578251825591602001919060010190611caf565b5b509050611cd89190611cdc565b5090565b611cfe91905b80821115611cfa576000816000905550600101611ce2565b5090565b905600a165627a7a72305820ef4cd65538e54ad96d21b67194986223e2731ed36aeb281c9be92dca718b0fa70029', 
			gas: '4700000'
		}, function (e, contract){
			console.log(e, contract);
			document.getElementById("contract_address").innerHTML = "Waiting for Ethtereum";
			document.getElementById('contract').setAttribute("hidden", true);
			console.log(1);
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