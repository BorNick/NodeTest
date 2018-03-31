var Web3 = require('web3');

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

// MyVoting Contract
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
var myvoting = web3.eth.contract(abi);
var myvotingAddr = myvoting.at("0x7134f440c4fb02e517caf2091e698d74be4db98e");

    var password = "";
    var accounts_index;
	var addressChosen = false;
	selectBox();


// Fetch all the Ethereum addresses...
    function selectBox() {

        // Only run if user has not yet chosen an Ethereum address.
        if (!addressChosen) {
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
                var selectbox = "<h2>Eligible Ethereum Accounts</h2><br><p>Address:</p><select id='addrs' class='action-list'>" + listEligible + "</select> <br><br><p>Password:</p> <input type='password' id='passwordf' value='ilikelittlepaddy' name='fname' class='action-text'><input type='button' class='action-button'  value = 'Login' onclick='unlock();'>";
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
        //} else {
          //alert("Password was not correct. Try again.");
        //}
        //currentState();
    }
	
	
	    // Vote submits their voting key.
    function register() {

        if (!uploaded) {
            alert("Please upload your voting codes");
            return;
        }

        if (!addressChosen) {
            alert("Please unlock your Ethereum address");
            return;
        }

        if (state != 1) {
            alert("You can only register during the SIGNUP Phase ");
            return;
        }

        if (!anonymousvotingAddr.eligible(addr)) {
            alert("Your Ethereum Account is not eligible for this vote");
            return;
        }

        // We prove knowledge of the voting key
        var single_zkp = cryptoAddr.createZKP.call(x, v, xG, {
            from: web3.eth.accounts[accounts_index]
        });
        var vG = [single_zkp[1], single_zkp[2], single_zkp[3]];

        web3.personal.unlockAccount(addr, password);

        // Lets make sure the ZKP is valid!
        var verifyres = cryptoAddr.verifyZKP.call(xG, single_zkp[0], vG, {
            from: web3.eth.accounts[accounts_index]
        });

        if (!verifyres) {
            alert("Problem with voting codes");
            return;
        }

        var res = anonymousvotingAddr.register.call(xG, vG, single_zkp[0], {
                from: web3.eth.accounts[accounts_index],
                value: anonymousvotingAddr.depositrequired()
            });

        // Submit voting key to the network
        if (res) {
            anonymousvotingAddr.register.sendTransaction(xG, vG, single_zkp[0], {
                from: web3.eth.accounts[accounts_index],
                gas: 4200000,
                value: anonymousvotingAddr.depositrequired()
            });

            //TODO: DUPLICATED CODE FROM CURRENTSTATE. Needs its own function.
            document.getElementById('registerbutton').setAttribute("hidden",true);
            document.getElementById("registrationprogress").removeAttribute("hidden");
            document.getElementById("submitvotingkey").removeAttribute("hidden");

        } else {
            alert("Registration failed... Problem could be your voting codes or that you have already registered");
        }
    }
	
	function createZKP(x, v, xG){
		var t = 
	}