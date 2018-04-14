var Web3 = require('web3');

var v = 3;//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var x = 5;
var xG = 10;

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}


var abi = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "eligible",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "computeTally",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "addressid",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totaleligible",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "commitmentphase",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "question",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "addr",
				"type": "address[]"
			}
		],
		"name": "setEligible",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "h",
				"type": "bytes32"
			}
		],
		"name": "submitCommitment",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "finishRegistrationPhase",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalcommitted",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "params",
				"type": "uint256[4]"
			},
			{
				"name": "y",
				"type": "uint256"
			}
		],
		"name": "submitVote",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "votecast",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalvoted",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_question",
				"type": "string"
			},
			{
				"name": "enableCommitmentPhase",
				"type": "bool"
			}
		],
		"name": "beginSignUp",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "commitment",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "registered",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "refunds",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "state",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "finaltally",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalregistered",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "voters",
		"outputs": [
			{
				"name": "addr",
				"type": "address"
			},
			{
				"name": "registeredkey",
				"type": "uint256"
			},
			{
				"name": "reconstructedkey",
				"type": "uint256"
			},
			{
				"name": "commitment",
				"type": "bytes32"
			},
			{
				"name": "vote",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "addresses",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "xG",
				"type": "uint256"
			},
			{
				"name": "vG",
				"type": "uint256"
			},
			{
				"name": "r",
				"type": "uint256"
			}
		],
		"name": "register",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "xG",
				"type": "uint256"
			},
			{
				"name": "r",
				"type": "uint256"
			},
			{
				"name": "vG",
				"type": "uint256"
			}
		],
		"name": "verifyZKP",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];
var abi_crypto = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "a",
				"type": "uint256"
			},
			{
				"name": "b",
				"type": "uint256"
			},
			{
				"name": "m",
				"type": "uint256"
			}
		],
		"name": "submod",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "x",
				"type": "uint256"
			},
			{
				"name": "v",
				"type": "uint256"
			}
		],
		"name": "createZKP",
		"outputs": [
			{
				"name": "res",
				"type": "uint256[2]"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "xG",
				"type": "uint256"
			},
			{
				"name": "yG",
				"type": "uint256"
			},
			{
				"name": "y",
				"type": "uint256"
			}
		],
		"name": "commitToVote",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "xG",
				"type": "uint256"
			},
			{
				"name": "r",
				"type": "uint256"
			},
			{
				"name": "vG",
				"type": "uint256"
			}
		],
		"name": "verifyZKP",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "x1",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "x2",
				"type": "uint256"
			}
		],
		"name": "Debug",
		"type": "event"
	}
];

// MyVoting Contract
var myvoting = web3.eth.contract(abi);
var myvotingAddr = myvoting.at("0xd275c35aef497a223e7723254f028ff6acf33779");

// Local Crypto Contract
var crypto_contract = web3.eth.contract(abi_crypto);
var cryptoAddr = crypto_contract.at("0xde7a3591aa307df93573524c7f0a3b88eb545363");

    var password = "";
    var accounts_index;
	var addressChosen = false;
	selectBox();


// Fetch all the Ethereum addresses...
function selectBox() {

    // Only run if user has not yet chosen an Ethereum address.
    if (!addressChosen) {
		document.getElementById('registerbutton').setAttribute("hidden", true);
		document.getElementById('totalregistered').setAttribute("hidden", true);
        var listEligible = "";
        var foundEligible = false;
        // Let user select one of their Ethereum addresses
        for (var i = 0; i < web3.eth.accounts.length; i++) {
            var tempaddr = web3.eth.accounts[i];
            if (myvotingAddr.eligible(tempaddr)) {
                foundEligible = true;
                listEligible = listEligible + '<option value="' + i + '">' + tempaddr + '</option>';
            }
        }

        // Only create a drop-down box if we have found an address that is eligible to vote!
        if (foundEligible) {
            var selectbox = "<h2>Eligible Ethereum Accounts</h2><br><p>Address:</p><select id='addrs' class='action-list'>" + listEligible + "</select> <br><br><p>Password:</p> <input type='password' id='passwordf' value='password' name='fname' class='action-text'><input type='button' class='action-button'  value = 'Login' onclick='unlock();'>";
            document.getElementById('dropdown').innerHTML = selectbox;
        }


    }
}
	
function unlock() {
	console.log("entered unlock");
    var _addr = $('#addrs').find(":selected").text();
    var _password = document.getElementById('passwordf').value;
    document.getElementById('passwordf').value = "";

		
    //if (web3.personal.unlockAccount(_addr, _password)) {
        addressChosen = true;
        addr = _addr;
        password = _password;
        accounts_index = $("#addrs").val();
		console.log(accounts_index);
        //controlTransition("#unlockfs", null);
        //document.getElementById('generalStatus').innerHTML = "You have selected the address " + addr;
    //} else {
      //alert("Password was not correct. Try again.");
    //}
    //currentState();
}
	
	
// Vote submits their voting key.
function register() {

    //if (!uploaded) {
        //alert("Please upload your voting codes");
        //return;
    //}

    if (!addressChosen) {
        alert("Please unlock your Ethereum address");
        return;
    }

    if (state != 1) {
        alert("You can only register during the SIGNUP Phase ");
        return;
    }

    if (!myvotingAddr.eligible(addr)) {
        alert("Your Ethereum Account is not eligible for this vote");
        return;
    }

	
    // We prove knowledge of the voting key
    var single_zkp = cryptoAddr.createZKP.call(x, v, {
        from: web3.eth.accounts[accounts_index]
    });

    //web3.personal.unlockAccount(addr, password);

    // Lets make sure the ZKP is valid!
    var verifyres = cryptoAddr.verifyZKP.call(xG, single_zkp[0], single_zkp[1], {
        from: web3.eth.accounts[accounts_index]
    });

    if (!verifyres) {
        alert("Problem with voting codes");
        return;
    }

    var res = myvotingAddr.register.call(xG, single_zkp[1], single_zkp[0], {
            from: web3.eth.accounts[accounts_index],
			gas: 4200000
        });

    // Submit voting key to the network
    if (res) {
        myvotingAddr.register.sendTransaction(xG, single_zkp[1], single_zkp[0], {
            from: web3.eth.accounts[accounts_index],
            gas: 4200000
        });

        document.getElementById("registerbutton").innerHTML  = "Waiting for registration to end";

    } else {
        alert("Registration failed... Problem could be your voting codes or that you have already registered");
    }
}
	
var registrationCreated = false;
function createRegistration() {

	if(!registrationCreated) {
		registrationCreated = true;
		//  document.getElementById('title').innerHTML = "Voter Registration";

		document.getElementById('registerbutton').removeAttribute("hidden");
		document.getElementById('question').removeAttribute("hidden");
		document.getElementById('totalregistered').removeAttribute("hidden");
	}

	// Make sure it exists... We might be in the 'Please wait on Ethereum' part.
	if(document.getElementById('totalregistered') != null) {
		document.getElementById('totalregistered').innerHTML = "" + myvotingAddr.totalregistered() + "/" + myvotingAddr.totaleligible() + " voters have registered their ballot.";

		// Statistics on number of registered voters, and when authority can transition to the next phase
	}
}
	
// Responsible for updating the website's text depending on the election's current phase. (i.e. if we are in VOTE, no point enabling compute button).
function currentState() {
	if (!addressChosen) {
		selectBox();
		return;
	}
	
	document.getElementById('dropdown').setAttribute("hidden", true);

	state = myvotingAddr.state();
	//whatIsQuestion();

	if(state == 0) { // SETUP

	//createEligibleTextBox();
	} else if(state == 1) { // SIGNUP
		createRegistration();

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