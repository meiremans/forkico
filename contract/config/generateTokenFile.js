const fs = require('fs');

function generateTokenFile(name,ticker,decimals,file,cb) {
    let token = `pragma solidity 0.4.19;
    import 'zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

    contract Token is MintableToken {
        string public name = "${name.toUpperCase()}";
        string public symbol = "${ticker.toUpperCase()}";
        uint8 public decimals = ${decimals};
    }`;
    fs.writeFile(file, token, function(err) {
        if (err) {
            console.log(err);
        }
        cb();
    })
}

module.exports = {
    generateTokenFile
};


