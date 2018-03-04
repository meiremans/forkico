pragma solidity 0.4.18;
    import 'zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

    contract Token is MintableToken {
        string public name = "TEST";
        string public symbol = "TST";
        uint8 public decimals = 18;
    }