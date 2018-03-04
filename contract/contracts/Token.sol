pragma solidity 0.4.19;
    import 'zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

    contract Token is MintableToken {
        string public name = "TESTTOKEN";
        string public symbol = "TTT";
        uint8 public decimals = 18;
    }