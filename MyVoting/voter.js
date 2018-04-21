var Web3 = require('web3');

var v = 3;//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var x = 5;
var xG = 10;

var registrationCreated = false;
var commitCreated = false;
var voteCreated = false;
var tallyCreated = false;

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}


var abi = [
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
		"constant": false,
		"inputs": [],
		"name": "computeTally",
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
		"inputs": [
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
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
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
		"name": "getVoter",
		"outputs": [
			{
				"name": "_registeredkey",
				"type": "uint256"
			},
			{
				"name": "_reconstructedkey",
				"type": "uint256"
			},
			{
				"name": "_commitment",
				"type": "bytes32"
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
		"constant": true,
		"inputs": [
			{
				"name": "yG",
				"type": "uint256"
			},
			{
				"name": "x",
				"type": "uint256"
			},
			{
				"name": "v",
				"type": "uint256"
			}
		],
		"name": "createVote",
		"outputs": [
			{
				"name": "y",
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
var myvotingAddr = myvoting.at("0x72c1b2c41aef4a34b9a5e54befe660d0add598b3");

// Local Crypto Contract
var crypto_contract = web3.eth.contract(abi_crypto);
var cryptoAddr = crypto_contract.at("0x712a4a8c670670a47461293b3fbb0b68e210e7b2");

    var password = "";
    var accounts_index;
	var addressChosen = false;
	selectBox();


// Fetch all the Ethereum addresses...
function selectBox() {

    // Only run if user has not yet chosen an Ethereum address.
    if (!addressChosen) {
		hideAll();
		document.getElementById('dropdown').removeAttribute("hidden");
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
    var _addr = $('#addrs').find(":selected").text();
    var _password = document.getElementById('passwordf').value;
    document.getElementById('passwordf').value = "";

		
    //if (web3.personal.unlockAccount(_addr, _password)) {
        addressChosen = true;
        addr = _addr;
        password = _password;
        accounts_index = $("#addrs").val();
        //controlTransition("#unlockfs", null);
        //document.getElementById('generalStatus').innerHTML = "You have selected the address " + addr;
		currentState();
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

        document.getElementById("registration").innerHTML  = "Waiting for registration to end";
		createRegistration();

    } else {
        alert("Registration failed... Problem could be your voting codes or that you have already registered");
    }
}

function vote(choice) {

    if (!addressChosen) {
        alert("Please unlock your Ethereum address");
        return;
    }

    // Lets make sure they are registered too...
    if (!myvotingAddr.registered(addr)) {
        alert("You are not registered for this vote");
        return;
    }
    // SETUP, SIGNUP, TALLY
    if (state == 0 || state == 1 || state == 4 ) {
        alert("You can only vote during the COMMITMENT or VOTE phase");
        return;
    }

    var choice_text;

    // Get xG and yG (only way to get values from a Struct)
    var voter = myvotingAddr.getVoter.call({
        from: web3.eth.accounts[accounts_index]
    });

    var xG = voter[0];
    var yG = voter[1];
	
	var result;
	var y;//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    if (choice == 1) {
        choice_text = "YES";
        //result = cryptoAddr.create1outof2ZKPYesVote.call(xG, yG, w, r, d, x, {
        //    from: web3.eth.accounts[accounts_index]
        //});
		y = cryptoAddr.createVote.call(yG, x, 1, {
            from: web3.eth.accounts[accounts_index]
        });
    } else {
        choice_text = "NO";
        //result = cryptoAddr.create1outof2ZKPNoVote.call(xG, yG, w, r, d, x, {
        //    from: web3.eth.accounts[accounts_index]
        //});
		y = cryptoAddr.createVote.call(yG, x, 0, {
            from: web3.eth.accounts[accounts_index]
        });
    }



    //var y = [result[0][0], result[0][1]];
    //var a1 = [result[0][2], result[0][3]];
    //var b1 = [result[0][4], result[0][5]];
    //var a2 = [result[0][6], result[0][7]];
    //var b2 = [result[0][8], result[0][9]];

    //var params = [result[1][0], result[1][1], result[1][2], result[1][3]];
    //result = anonymousvotingAddr.verify1outof2ZKP.call(params, y, a1, b1, a2, b2, {
    //    from: web3.eth.accounts[accounts_index]
    //});

    // Let's make sure the zero knowledge proof checked out...
    if (true) {//result) {

        var castvote = false;

        // We either send a commitment to the vote, or the vote itself!
        if (state == 2) {

            if (!myvotingAddr.commitmentphase()) {
                castvote = true;
            } else if (confirm("You are voting " + choice_text + "... You will not be able to change your vote")) {
                castvote = true;
            }

            if (castvote) {
                //web3.personal.unlockAccount(addr, password);

                // Get us a hash commitment to the voter's zero knowledge proof
                var h = cryptoAddr.commitToVote.call(/*params, */xG, yG, y/*, a1, b1, a2, b2*/, {
                    from: web3.eth.accounts[accounts_index]
                });

                // Send commitment to Etherum!
                result = myvotingAddr.submitCommitment.sendTransaction(h, {
                    from: web3.eth.accounts[accounts_index],
                    gas: 4200000
                });
                document.getElementById('commit').innerHTML = 'You have sent (but not revealed) your vote... Waiting for Ethereum to confirm';
            }

        } else if (state == 3) {

            // No need to ask the user to confirm if they have already committed to it...
            if (myvotingAddr.commitmentphase()) {
                castvote = true;
            } else if (confirm("You are voting " + choice_text + ". You will not be able to change your vote.")) {
                 castvote = true;
            }

            // Should we broadcast the vote?
            if (castvote) {
                //web3.personal.unlockAccount(addr, password);
                result = myvotingAddr.submitVote.sendTransaction(/*params, */y/*, a1, b1, a2, b2*/, {
                    from: web3.eth.accounts[accounts_index],
                    gas: 4200000
                });
                document.getElementById('do_vote').innerHTML = 'Vote has been submitted... Waiting for confirmation';
            }
        }
    } else {
        alert("Vote was not computed successfully... Please check that you have uploaded the correct voting codes and unlocked the correct account");
    }
}
	
function whatIsQuestion() {
    document.getElementById('question').innerHTML = myvotingAddr.question();
	document.getElementById('question').removeAttribute("hidden");
}
	
function hideAll(){
	document.getElementById('dropdown').setAttribute("hidden", true);
	document.getElementById('registration').setAttribute("hidden", true);
	document.getElementById('question').setAttribute("hidden", true);
	//document.getElementById('totalregistered').setAttribute("hidden", true);
	document.getElementById('commit').setAttribute("hidden", true);
	document.getElementById('do_vote').setAttribute("hidden", true);
	document.getElementById('tally').setAttribute("hidden", true);
}

function createRegistration() {

	if(!registrationCreated) {
		hideAll();
		registrationCreated = true;
		//  document.getElementById('title').innerHTML = "Voter Registration";

		document.getElementById('registration').removeAttribute("hidden");
		document.getElementById('question').removeAttribute("hidden");
		//document.getElementById('totalregistered').removeAttribute("hidden");
	}

	// Make sure it exists... We might be in the 'Please wait on Ethereum' part.
	if(document.getElementById('totalregistered') != null) {
		document.getElementById('totalregistered').innerHTML = "" + myvotingAddr.totalregistered() + "/" + myvotingAddr.totaleligible() + " voters have registered their ballot.";
	}
}

function createCommit() {

	if(!commitCreated) {
		hideAll();
		commitCreated = true;
		//  document.getElementById('title').innerHTML = "Voter Commitment";

		document.getElementById('commit').removeAttribute("hidden");
		document.getElementById('question').removeAttribute("hidden");
	}

	// Make sure it exists... We might be in the 'Please wait on Ethereum' part.
	if(document.getElementById('commit') != null) {
		if(myvotingAddr.commitment(addr)){
			document.getElementById('commit').innerHTML = 'You have sent (but not revealed) your vote... Waiting for Ethereum to confirm';
		}
	}
}

function createVote() {

	if(!voteCreated) {
		hideAll();
		voteCreated = true;
		//  document.getElementById('title').innerHTML = "Voting";

		document.getElementById('do_vote').removeAttribute("hidden");
		document.getElementById('question').removeAttribute("hidden");
	}

	// Make sure it exists... We might be in the 'Please wait on Ethereum' part.
	if(document.getElementById('do_vote') != null) {
		if(myvotingAddr.votecast(addr)){
			document.getElementById('do_vote').innerHTML = 'Vote has been submitted... Waiting for confirmation';
		}
	}
}

function createTally() {

	if(!tallyCreated) {
		hideAll();
		tallyCreated = true;
		//  document.getElementById('title').innerHTML = "Voting";

		document.getElementById('tally').removeAttribute("hidden");
		document.getElementById('question').removeAttribute("hidden");
	}

	// Make sure it exists... We might be in the 'Please wait on Ethereum' part.
	if((myvotingAddr.totalregistered().eq(myvotingAddr.totalvoted())) && !myvotingAddr.totalregistered().eq(0)) {
		var yes = myvotingAddr.finaltally(0);
		var total = myvotingAddr.finaltally(1);
		var no = total - yes;
		document.getElementById("tally").innerHTML = "Yes = " + yes + " and No = " + no;
	} else {
		document.getElementById("tally").innerHTML = "Voting has been cancelled.";
	}
}
	
// Responsible for updating the website's text depending on the election's current phase. (i.e. if we are in VOTE, no point enabling compute button).
function currentState() {
	//hideAll();
	if (!addressChosen) {
		selectBox();
		return;
	}
	
	

	state = myvotingAddr.state();
	if(state > 1){
		whatIsQuestion();
	}

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