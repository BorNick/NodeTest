pragma solidity ^0.4.21;

/**
 * @title ECCMath
 *
 * Functions for working with integers, curve-points, etc.
 *
 * @author Andreas Olofsson (androlo1980@gmail.com)
 */
library ECCMath {
    /// @dev Modular inverse of a (mod p) using euclid.
    /// "a" and "p" must be co-prime.
    /// @param a The number.
    /// @param p The mmodulus.
    /// @return x such that ax = 1 (mod p)
    function invmod(uint a, uint p) internal constant returns (uint) {
        if (a == 0 || a == p || p == 0)
            throw;
        if (a > p)
            a = a % p;
        int t1;
        int t2 = 1;
        uint r1 = p;
        uint r2 = a;
        uint q;
        while (r2 != 0) {
            q = r1 / r2;
            (t1, t2, r1, r2) = (t2, t1 - int(q) * t2, r2, r1 - q * r2);
        }
        if (t1 < 0)
            return (p - uint(-t1));
        return uint(t1);
    }

    /// @dev Modular exponentiation, b^e % m
    /// Basically the same as can be found here:
    /// https://github.com/ethereum/serpent/blob/develop/examples/ecc/modexp.se
    /// @param b The base.
    /// @param e The exponent.
    /// @param m The modulus.
    /// @return x such that x = b**e (mod m)
    function expmod(uint b, uint e, uint m) internal constant returns (uint r) {
        if (b == 0)
            return 0;
        if (e == 0)
            return 1;
        if (m == 0)
            throw;
        r = 1;
        uint bit = 2 ** 255;
        bit = bit;
        assembly {
            loop:
                jumpi(end, iszero(bit))
                r := mulmod(mulmod(r, r, m), exp(b, iszero(iszero(and(e, bit)))), m)
                r := mulmod(mulmod(r, r, m), exp(b, iszero(iszero(and(e, div(bit, 2))))), m)
                r := mulmod(mulmod(r, r, m), exp(b, iszero(iszero(and(e, div(bit, 4))))), m)
                r := mulmod(mulmod(r, r, m), exp(b, iszero(iszero(and(e, div(bit, 8))))), m)
                bit := div(bit, 16)
                jump(loop)
            end:
        }
    }
    
    /// @dev Converts a point (Px, Py, Pz) expressed in Jacobian coordinates to (Px", Py", 1).
    /// Mutates P.
    /// @param P The point.
    /// @param zInv The modular inverse of "Pz".
    /// @param z2Inv The square of zInv
    /// @param prime The prime modulus.
    /// @return (Px", Py", 1)
    function toZ1(uint[3] memory P, uint zInv, uint z2Inv, uint prime) internal constant {
        P[0] = mulmod(P[0], z2Inv, prime);
        P[1] = mulmod(P[1], mulmod(zInv, z2Inv, prime), prime);
        P[2] = 1;
    }

    /// @dev See _toZ1(uint[3], uint, uint).
    /// Warning: Computes a modular inverse.
    /// @param PJ The point.
    /// @param prime The prime modulus.
    /// @return (Px", Py", 1)
    function toZ1(uint[3] PJ, uint prime) internal constant {
        uint zInv = invmod(PJ[2], prime);
        uint zInv2 = mulmod(zInv, zInv, prime);
        PJ[0] = mulmod(PJ[0], zInv2, prime);
        PJ[1] = mulmod(PJ[1], mulmod(zInv, zInv2, prime), prime);
        PJ[2] = 1;
    }

}

contract owned {
    function owned() public { owner = msg.sender; }
    address public owner;

    // This contract only defines a modifier but does not use
    // it: it will be used in derived contracts.
    // The function body is inserted where the special symbol
    // `_;` in the definition of a modifier appears.
    // This means that if the owner calls this function, the
    // function is executed and otherwise, an exception is
    // thrown.
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
}

contract MyVoting is owned {
    
    
    event StageChangeEvent(
        string ended,
        string begun
        );
    event SetEligibleEvent(
        address user,
        address newEligible
        );
    event RegisteredEvent(
        address user,
        uint publicKey
        );
    event CommitedEvent(
        address user,
        bytes32 commit
        );
    event VotedEvent(
        address user,
        uint vote
        );
    event TallyEvent(
        address user,
        uint yesVotes,
        uint totalVotes
        );
    
    // Modulus for public keys
    uint constant p = 55059749849029036137623472859638053849197995389050050743443175625939575454347;//11;
    
    // Base point (generator) g
    uint constant g = 35466993160333349412106005358678383853312611466623145131611066824410945834012;//6;
    
    //Every address has an index
    //This makes looping in the program easier.
    address[] public addresses;
    mapping (address => uint) public addressid; // Address to Counter
    mapping (uint => Voter) public voters;
    mapping (address => bool) public eligible; // White list of addresses allowed to vote
    mapping (address => bool) public registered; // Address registered?
    mapping (address => bool) public votecast; // Address voted?
    mapping (address => bool) public commitment; // Have we received their commitment?
    mapping (address => uint) public refunds; // Have we received their commitment?
    
    struct Voter {
        address addr;
        uint registeredkey;
        uint reconstructedkey;
        bytes32 commitment;
        uint vote;
    }
    
    // Work around function to fetch details about a voter
    function getVoter() view public returns (uint _registeredkey, uint _reconstructedkey, bytes32 _commitment){
        uint index = addressid[msg.sender];
        _registeredkey = voters[index].registeredkey;
        _reconstructedkey = voters[index].reconstructedkey;
        _commitment = voters[index].commitment;
    }
    
    uint public totalregistered; //Total number of participants that have submited a voting key
    uint public totaleligible;
    uint public totalcommitted;
    uint public totalvoted;
    
    string public question;
    uint[2] public finaltally; // Final tally
    bool public commitmentphase; // OPTIONAL phase.
  
    enum State { SETUP, SIGNUP, COMMITMENT, VOTE, FINISHED }
    State public state;
  
    modifier inState(State s) {
        require(state == s);
         _;
    }
  
    function MyVoting() public {
        state = State.SETUP;
        question = "No question set";
    }
  
    // Owner of contract sets a whitelist of addresses that are eligible to vote.
    function setEligible(address[] addr) onlyOwner public {

        // Sign up the addresses
        for(uint i=0; i<addr.length; i++) {

            if(!eligible[addr[i]]) {
                eligible[addr[i]] = true;
                addresses.push(addr[i]);
                totaleligible += 1;
                emit SetEligibleEvent(msg.sender, addr[i]);
            }
        }
    }
    
    // Owner of contract declares that eligible addresses begin round 1 of the protocol
    function beginSignUp(string _question, bool enableCommitmentPhase) inState(State.SETUP) onlyOwner public returns (bool){

    if(addresses.length >= 3) {

        // We can now begin the signup phase.
        state = State.SIGNUP;

        question = _question;
        commitmentphase = enableCommitmentPhase;
        emit StageChangeEvent("SETUP", "SIGNUP");

      return true;
    }
    return false;
  }
  
    // Called by participants to register their voting public key
    // Participant mut be eligible, and can only register the first key sent key.
    function register(uint xG, uint vG, uint r) inState(State.SIGNUP) public returns (bool) {

        // Only white-listed addresses can vote
        if(eligible[msg.sender]) {
            if(verifyZKP(xG,r,vG) && !registered[msg.sender]) {
                // Update voter's registration
                addressid[msg.sender] = totalregistered;
                voters[totalregistered] = Voter({addr: msg.sender, registeredkey: xG, reconstructedkey: 0, vote: 0, commitment: 0});
                registered[msg.sender] = true;
                totalregistered += 1;
                emit RegisteredEvent(msg.sender, xG);

                return true;
            }
        }

        return false;
    }
    
    // Timer has expired - we want to start computing the reconstructed keys
    function finishRegistrationPhase() inState(State.SIGNUP) onlyOwner public returns(bool) {


        // Make sure at least 3 people have signed up...
        if(totalregistered < 3) {
            return;
        }

        uint temp;
        uint beforei;
        uint afteri;


        for(uint i = 0; i < totalregistered; i++){
            beforei = 1;
            for(uint j = 0; j < i; j++){
                beforei = mulmod(beforei, voters[j].registeredkey, p);
            }
            afteri = 1;
            for(j = i + 1; j < totalregistered; j++){
                afteri = mulmod(afteri, voters[j].registeredkey, p);
            }
            if(afteri != 1){
                temp = ECCMath.invmod(afteri, p);
            }else{
                temp = 1;
            }
            voters[i].reconstructedkey = mulmod(beforei, temp, p);
        }

        // We have computed each voter's special voting key.
        // Now we either enter the commitment phase (option) or voting phase.
        if(commitmentphase) {
            state = State.COMMITMENT;
            emit StageChangeEvent("SIGNUP", "COMMITMENT");
        } else {
            state = State.VOTE;
            emit StageChangeEvent("SIGNUP", "VOTE");
        }
    }
    
    /*
    * OPTIONAL STAGE: All voters submit the hash of their vote.
    * Why? The final voter that submits their vote gets to see the tally result
    * before anyone else. This provides the voter with an additional advantage
    * compared to all other voters. To get around this issue; we can force all
    * voters to commit to their vote in advance.... and votes are only revealed
    * once all voters have committed. This way the final voter has no additional
    * advantage as they cannot change their vote depending on the tally.
    * However... we cannot enforce the pre-image to be a hash, and someone could
    * a commitment that is not a vote. This will break the election, but you
    * will be able to determine who did it (and possibly punish them!).
    */
    function submitCommitment(bytes32 h) public inState(State.COMMITMENT) {

        if(!commitment[msg.sender]) {
            commitment[msg.sender] = true;
            uint index = addressid[msg.sender];
            voters[index].commitment = h;
            totalcommitted = totalcommitted + 1;
            emit CommitedEvent(msg.sender, h);

            // Once we have recorded all commitments... let voters vote!
            if(totalcommitted == totalregistered) {
                state = State.VOTE;
                emit StageChangeEvent("COMMITMENT", "VOTE");
            }
        }
    }
    
    // Given the 1 out of 2 ZKP - record the users vote!
    function submitVote(uint[4] params, uint y, uint a1, uint b1, uint a2, uint b2) inState(State.VOTE) public returns (bool) {

        uint c = addressid[msg.sender];

        // Make sure the sender can vote, and hasn't already voted.
        if(registered[msg.sender] && !votecast[msg.sender]) {

            // OPTIONAL Phase: Voters need to commit to their vote in advance.
            // Time to verify if this vote matches the voter's previous commitment.
            if(commitmentphase) {

                // Voter has previously committed to the entire zero knowledge proof...
                bytes32 h = sha3(msg.sender, params, voters[c].registeredkey, voters[c].reconstructedkey, y, a1, b1, a2, b2);

                // No point verifying the ZKP if it doesn't match the voter's commitment.
                if(voters[c].commitment != h) {
                    return false;
                }
            }

            // Verify the ZKP for the vote being cast
            if(verify1outof2ZKP(params, y, a1, b1, a2, b2)) {
                voters[c].vote = y;

                votecast[msg.sender] = true;

                totalvoted += 1;
                
                emit VotedEvent(msg.sender, y);

                return true;
            }
        }

        // Either vote has already been cast, or ZKP verification failed.
        return false;
    }
    
    // Assuming all votes have been submitted. We can leak the tally.
    // We assume Election Authority performs this function. It could be anyone.
    // Election Authority gets deposit upon tallying.
    // TODO: Anyone can do this function. Perhaps remove refund code - and force Election Authority
    // to explicit withdraw it? Election cannot reset until he is refunded - so that should be OK
    function computeTally() inState(State.VOTE) public onlyOwner {

        uint product = 1;
        uint vote;
        uint refund;

        // Multiply all votes
        for(uint i = 0; i < totalregistered; i++) {

            // Confirm all votes have been cast...
            require(votecast[voters[i].addr]);

            vote = voters[i].vote;
            product = mulmod(product, vote, p);
        }


        emit StageChangeEvent("VOTE", "TALLY");
        
        
        for(i = 0; i <= totalregistered; i++){
            if(product == ECCMath.expmod(g, i, p)){
                finaltally[0] = i;
            }
        }
        finaltally[1] = totalregistered;
        state = State.FINISHED;
        
        emit TallyEvent(msg.sender, finaltally[0], finaltally[1]);
    }
    
    function verifyZKP(uint xG, uint r, uint vG) public view returns (bool){

        // Get c = H(g, g^{x}, g^{v});
        bytes32 b_c = sha256(msg.sender, g, xG, vG);
        uint c = uint(b_c);

        // Get g^{r}, and g^{xc}
        uint rG = ECCMath.expmod(g, r, p);
        uint xcG = ECCMath.expmod(xG, c, p);

        // Add both points together
        uint rGxcG = mulmod(rG,xcG, p);

        // Verify. Do they match?
        if(rGxcG == vG) {
            return true;
        } else {
            return false;
        }
    }
    
    // We verify that the ZKP is of 0 or 1.
  function verify1outof2ZKP(uint[4] params, uint y, uint a1, uint b1, uint a2, uint b2) returns (bool) {

      uint c = addressid[msg.sender];
      
      uint yG = voters[c].reconstructedkey;
      uint xG = voters[c].registeredkey;

      //c = H(i, xG, Y, a1, b1, a2, b2);
      // Does c =? d1 + d2 (mod p - 1)
      if((uint(sha256(msg.sender, xG, y, a1, b1, a2, b2)) % (p - 1)) != addmod(params[0],params[1], p - 1)) {
        return false;
      }

      // a1 =? g^{r1} * x^{d1}

      if(a1 != mulmod(ECCMath.expmod(g, params[2], p), ECCMath.expmod(xG, params[0], p), p)) {
        return false;
      }

      //b1 =? h^{r1} * y^{d1}

      if(b1 != mulmod(ECCMath.expmod(yG, params[2], p), ECCMath.expmod(y, params[0], p), p)) {
        return false;
      }

      //a2 =? g^{r2} * x^{d2}

      if(a2 != mulmod(ECCMath.expmod(g, params[3], p), ECCMath.expmod(xG, params[1], p), p)) {
        return false;
      }
      
      // get inverse g
      uint gInv = ECCMath.invmod(g, p);

      // b2 =? h^{r2} * (y/g)^{d2}
      if(b2 != mulmod(ECCMath.expmod(yG, params[3], p), ECCMath.expmod(mulmod(y, gInv, p), params[1], p), p)) {
        return false;
      }

      return true;
    }
}