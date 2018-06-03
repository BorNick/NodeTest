pragma solidity ^0.4.21;

/**
 * @title ECCMath_noconflict
 *
 * Functions for working with integers, curve-points, etc.
 *
 * @author Andreas Olofsson (androlo1980@gmail.com)
 */
library ECCMath_noconflict {
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


contract LocalCrypto {

  // Modulus for public keys
  uint constant p = 55059749849029036137623472859638053849197995389050050743443175625939575454347;//11;

  // Base point (generator) G
  uint constant g = 35466993160333349412106005358678383853312611466623145131611066824410945834012;//6;


  event Debug(uint x1, uint x2);

  function LocalCrypto() {
  }

  // Retrieve the commitment hash for a voters vote.
  function commitToVote(uint[4] params, uint xG, uint yG, uint y, uint a1, uint b1, uint a2, uint b2) returns (bytes32) {
    return sha3(msg.sender, params, xG, yG, y, a1, b1, a2, b2);
  }

  // vG (blinding value), xG (public key), x (what we are proving)
  // c = H(g, g^{v}, g^{x});
  // r = v - xz (mod p);
  // return(r,vG)
  function createZKP(uint x, uint v) returns (uint[2] res) {

      uint vG = ECCMath_noconflict.expmod(g, v, p);
      uint xG = ECCMath_noconflict.expmod(g, x, p);
      uint c = uint(sha256(msg.sender, g, xG, vG));

      
      // Get 'r' the zkp
      uint cx = mulmod(x, c, p - 1);

      // v - xc
      uint r = submod(v, cx, p - 1);

      res[0] = r;
      res[1] = vG;
      return;
  }

  // a - b = c;
  function submod(uint a, uint b, uint m) returns (uint){
      uint a_m;

      if(a>b) {
        a_m = a;
      } else {
        a_m = a+m;
      }

      uint c = addmod(a_m - b, 0, m);

      return c;
  }

  // Parameters xG, r where r = v - xc, and vG.
  // Verify that vG = rG + xcG!
  function verifyZKP(uint xG, uint r, uint vG) public view returns (bool){

        // Get c = H(g, g^{x}, g^{v});
        bytes32 b_c = sha256(msg.sender, g, xG, vG);
        uint c = uint(b_c);

        // Get g^{r}, and g^{xc}
        uint rG = ECCMath_noconflict.expmod(g, r, p);
        uint xcG = ECCMath_noconflict.expmod(xG, c, p);

        // Add both points together
        uint rGxcG = mulmod(rG,xcG, p);

        // Verify. Do they match?
        if(rGxcG == vG) {
            return true;
        } else {
            return false;
        }
    }
    
    function createVote(uint yG, uint x, uint v) public view returns (uint y){
        uint xyG = ECCMath_noconflict.expmod(yG, x, p);
        uint vG = ECCMath_noconflict.expmod(g, v, p);
        y = mulmod(xyG, vG, p);
    }
    
    // random 'w', 'r2', 'd2'
  function create1outof2ZKPNoVote(uint xG, uint yG, uint w, uint r2, uint d2, uint x) returns (uint[5] res, uint[4] res2){
      

      // res[0] = y = h^{x}
      res[0] = ECCMath_noconflict.expmod(yG, x, p);

      // res[1] = a1 = g^{w}
      res[1] = ECCMath_noconflict.expmod(g, w, p);

      // res[2] = b1 = h^{w} (where h = g^{y})
      res[2] = ECCMath_noconflict.expmod(yG, w, p);

      // res[3] = a2 = g^{r2} * x^{d2}
      res[3] = mulmod(ECCMath_noconflict.expmod(g, r2, p), ECCMath_noconflict.expmod(xG, d2, p), p);

      // get inverse g
      uint gInv = ECCMath_noconflict.invmod(g, p);

      // res[4] = b2 = h^{r2}(y/g)^{d2}
      res[4] = mulmod(ECCMath_noconflict.expmod(yG, r2, p), ECCMath_noconflict.expmod(mulmod(res[0], gInv, p), d2, p), p);


      // Get c = H(i, xG, Y, a1, b1, a2, b2);
      bytes32 b_c = sha256(msg.sender, xG, res);

      // res2[0] = d1 = c - d2 mod q
      res2[0] = submod(uint(b_c), d2, p - 1);

      // res2[2] = r1 = w - (x * d1)
      res2[2] = submod(w, mulmod(x, res2[0], p - 1), p - 1);

      /* We return the following
      * res[0] = y;
      * res[1] = a1;
      * res[2] = b1;
      * res[3] = a2;
      * res[4] = b2;
      * res[5] = d1;
      * res[6] = d2;
      * res[7] = r1;
      * res[8] = r2;
      */
      res2[1] = d2;
      res2[3] = r2;
  }
  
  // random 'w', 'r1', 'd1'
  function create1outof2ZKPYesVote(uint xG, uint yG, uint w, uint r1, uint d1, uint x) returns (uint[5] res, uint[4] res2){
      

      // res[0] = y = h^{x}
      res[0] = mulmod(ECCMath_noconflict.expmod(yG, x, p), g, p);

      // res[1] = a1 = g^{r1} * x^{d1}
      res[1] = mulmod(ECCMath_noconflict.expmod(g, r1, p), ECCMath_noconflict.expmod(xG, d1, p), p);

      // res[2] = b1 = h^{r1}(y)^{d1} (where h = g^{y})
      res[2] = mulmod(ECCMath_noconflict.expmod(yG, r1, p), ECCMath_noconflict.expmod(res[0], d1, p), p);

      // res[3] = a2 = g^{w}
      res[3] = ECCMath_noconflict.expmod(g, w, p);

      // b2 = h^{w}
      res[4] = ECCMath_noconflict.expmod(yG, w, p);


      // Get c = H(i, xG, Y, a1, b1, a2, b2);
      bytes32 b_c = sha256(msg.sender, xG, res);

      // res2[1] = d2 = c - d1 mod q
      res2[1] = submod(uint(b_c), d1, p - 1);

      // res2[3] = r2 = w - (x * d2)
      res2[3] = submod(w, mulmod(x, res2[1], p - 1), p - 1);

      /* We return the following
      * res[0] = y;
      * res[1] = a1;
      * res[2] = b1;
      * res[3] = a2;
      * res[4] = b2;
      * res[5] = d1;
      * res[6] = d2;
      * res[7] = r1;
      * res[8] = r2;
      */
      res2[0] = d1;
      res2[2] = r1;
  }

  // We verify that the ZKP is of 0 or 1.
  function verify1outof2ZKP(uint[4] params, uint xG, uint yG, uint y, uint a1, uint b1, uint a2, uint b2) returns (bool) {


      //c = H(i, xG, Y, a1, b1, a2, b2);
      // Does c =? d1 + d2 (mod p - 1)
      if((uint(sha256(msg.sender, xG, y, a1, b1, a2, b2)) % (p - 1)) != addmod(params[0],params[1], p - 1)) {
        return false;
      }

      // a1 =? g^{r1} * x^{d1}

      if(a1 != mulmod(ECCMath_noconflict.expmod(g, params[2], p), ECCMath_noconflict.expmod(xG, params[0], p), p)) {
        return false;
      }

      //b1 =? h^{r1} * y^{d1}

      if(b1 != mulmod(ECCMath_noconflict.expmod(yG, params[2], p), ECCMath_noconflict.expmod(y, params[0], p), p)) {
        return false;
      }

      //a2 =? g^{r2} * x^{d2}

      if(a2 != mulmod(ECCMath_noconflict.expmod(g, params[3], p), ECCMath_noconflict.expmod(xG, params[1], p), p)) {
        return false;
      }
      
      // get inverse g
      uint gInv = ECCMath_noconflict.invmod(g, p);

      // b2 =? h^{r2} * (y/g)^{d2}
      if(b2 != mulmod(ECCMath_noconflict.expmod(yG, params[3], p), ECCMath_noconflict.expmod(mulmod(y, gInv, p), params[1], p), p)) {
        return false;
      }

      return true;
    }
}
