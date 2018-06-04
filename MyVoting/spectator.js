var Web3 = require('web3');
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}


var abi = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"eligible","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"computeTally","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"addressid","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totaleligible","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getVoter","outputs":[{"name":"_registeredkey","type":"uint256"},{"name":"_reconstructedkey","type":"uint256"},{"name":"_commitment","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"commitmentphase","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"question","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"params","type":"uint256[4]"},{"name":"y","type":"uint256"},{"name":"a1","type":"uint256"},{"name":"b1","type":"uint256"},{"name":"a2","type":"uint256"},{"name":"b2","type":"uint256"}],"name":"verify1outof2ZKP","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address[]"}],"name":"setEligible","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"h","type":"bytes32"}],"name":"submitCommitment","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"finishRegistrationPhase","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalcommitted","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"votecast","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalvoted","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_question","type":"string"},{"name":"enableCommitmentPhase","type":"bool"}],"name":"beginSignUp","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"params","type":"uint256[4]"},{"name":"y","type":"uint256"},{"name":"a1","type":"uint256"},{"name":"b1","type":"uint256"},{"name":"a2","type":"uint256"},{"name":"b2","type":"uint256"}],"name":"submitVote","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"commitment","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"registered","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"refunds","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"state","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"finaltally","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalregistered","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"voters","outputs":[{"name":"addr","type":"address"},{"name":"registeredkey","type":"uint256"},{"name":"reconstructedkey","type":"uint256"},{"name":"commitment","type":"bytes32"},{"name":"vote","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"addresses","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"xG","type":"uint256"},{"name":"vG","type":"uint256"},{"name":"r","type":"uint256"}],"name":"register","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"xG","type":"uint256"},{"name":"r","type":"uint256"},{"name":"vG","type":"uint256"}],"name":"verifyZKP","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ended","type":"string"},{"indexed":false,"name":"begun","type":"string"}],"name":"StageChangeEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"newEligible","type":"address"}],"name":"SetEligibleEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"publicKey","type":"uint256"}],"name":"RegisteredEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"commit","type":"bytes32"}],"name":"CommitedEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"vote","type":"uint256"}],"name":"VotedEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"yesVotes","type":"uint256"},{"indexed":false,"name":"totalVotes","type":"uint256"}],"name":"TallyEvent","type":"event"}];

var myvoting = web3.eth.contract(abi);
var myvotingAddr;
var stageChangeEvent;
var setEligibleEvent;
var registeredEvent;
var commitedEvent;
var votedEvent;
var tallyEvent;

function connectToContract(){
	document.getElementById("contract_address").innerHTML = document.getElementById("addr").value;
	myvotingAddr =  myvoting.at(document.getElementById("addr").value);
	document.getElementById('contract').setAttribute("hidden", true);
	document.getElementById('log').removeAttribute("hidden");
	stageChangeEvent = myvotingAddr.StageChangeEvent(function(error, result) {
    if (!error)
        console.log(result);
		document.getElementById('log').innerHTML = document.getElementById('log').innerHTML + '<p class="text-body"><b>Voting has progressed from </b><i>' + result.args.ended + '</i><b> stage to </b><i>' + result.args.begun + '</i><b> stage</b></p>';
	});
	setEligibleEvent = myvotingAddr.SetEligibleEvent(function(error, result) {
    if (!error)
        console.log(result);
		document.getElementById('log').innerHTML = document.getElementById('log').innerHTML + '<p class="text-body"><i>' + result.args.user + '</i><b> has set </b><i>' + result.args.newEligible + '</i><b> eligible for voting</b></p>';
	});
	registeredEvent = myvotingAddr.RegisteredEvent(function(error, result) {
    if (!error)
        console.log(result);
		document.getElementById('log').innerHTML = document.getElementById('log').innerHTML + '<p class="text-body"><i>' + result.args.user + '</i><b> has registered in voting with the following public key: </b><i>0x' + result.args.publicKey.toString(16) + '</i></p>';
	});
	commitedEvent = myvotingAddr.CommitedEvent(function(error, result) {
    if (!error)
        console.log(result);
		document.getElementById('log').innerHTML = document.getElementById('log').innerHTML + '<p class="text-body"><i>' + result.args.user + '</i><b> has pulished the following hash: </b><i>' + result.args.commit + '</i></p>';
	});
	votedEvent = myvotingAddr.VotedEvent(function(error, result) {
    if (!error)
        console.log(result);
		document.getElementById('log').innerHTML = document.getElementById('log').innerHTML + '<p class="text-body"><i>' + result.args.user + '</i><b> has pulished his vote: </b><i>0x' + result.args.vote.toString(16) + '</i></p>';
	});
	tallyEvent = myvotingAddr.TallyEvent(function(error, result) {
    if (!error)
        console.log(result);
		document.getElementById('log').innerHTML = document.getElementById('log').innerHTML + '<p class="text-body"><i>' + result.args.user + '</i><b> has initiated computing the tally. Results: yes = </b><i>' + result.args.yesVotes + ' </i><b> no = </b><i>' + result.args.totalVotes.minus(result.args.yesVotes) + '</i></p>';
	});
}