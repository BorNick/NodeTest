
function commitToVote(msgSender, params, xG, yG, y, a1, b1, a2, b2) {
    return sha3_256(msgSender, params, xG, yG, y, a1, b1, a2, b2);
}

/*function createZKP(uint x, uint v) returns (uint[2] res) {

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

    // We return the following
    // res[0] = y;
    // res[1] = a1;
    // res[2] = b1;
    // res[3] = a2;
    // res[4] = b2;
    // res[5] = d1;
    // res[6] = d2;
    // res[7] = r1;
    // res[8] = r2;
    //
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

    // We return the following
    // res[0] = y;
    // res[1] = a1;
    // res[2] = b1;
    // res[3] = a2;
    // res[4] = b2;
    // res[5] = d1;
    // res[6] = d2;
    // res[7] = r1;
    // res[8] = r2;
    //
    res2[0] = d1;
    res2[2] = r1;
}*/