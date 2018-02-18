pragma solidity ^0.4.18;

import './Token.sol';
import './MathHelp.sol';
import "zeppelin-solidity/contracts/crowdsale/CappedCrowdsale.sol";
import "zeppelin-solidity/contracts/crowdsale/RefundableCrowdsale.sol";
import 'zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';
import "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "zeppelin-solidity/contracts/token/ERC20/PausableToken.sol";


contract ForkedCrowdsale is CappedCrowdsale, RefundableCrowdsale, Pausable {

    uint256 stage = 0;

    MathHelp math = new MathHelp();
    address private wallet;
    address private teamWallet;
    address private ecosystemWallet;
    address private bountyWallet;
    address private remainingTokensWallet;

    // Amount raised in PreICO
    // -------------------------
    uint256 public totalWeiInPreICO;
    uint256 public totalWeiInICO;
    // -----------------------
    uint256 private bonus;
    uint256 private rate;
    uint256 private tokensCap;
    uint256[] private WAVE_CAPS;
    uint256[] private WAVE_BONUSES;
    bool isFinalized;


    uint256 public totalTokensForSaleDuringPreICO;


    // ==============================

    // Events
    event EthTransferred(string text,uint256 amount);
    event EthRefunded(string text);
    event IncrementWave(uint256 newWave);
    event TokenMint(address indexed beneficiary, uint256 amount);

    /**
        * @dev Contructor
        * @param _startTime startTime of crowdsale
        * @param _endTime endTime of crowdsale
        * @param _rate HRC / ETH rate
        * @param _cap The cap in WEI(hardcap)
        * @param _goal the goal in WEI(softcap)
        * @param _wallet wallet on which the contract gets created
        * @param _teamWallet wallet for the team
        * @param _ecosystemWallet wallet for the ecosystem
        * @param _bountyWallet wallet for the bountie


    */
    function ForkedCrowdsale(uint256 _startTime, uint256 _endTime, uint256 _rate, uint256 _cap, uint256 _goal, uint256[] _waveCaps, uint256[] _waveBonuses, address _wallet, address _teamWallet, address _ecosystemWallet, address _bountyWallet) public
    CappedCrowdsale(_cap)
    FinalizableCrowdsale()
    RefundableCrowdsale(_goal)

    Crowdsale(_startTime, _endTime, _rate, _wallet) {
        require(_goal <= _cap);
        remainingTokensWallet = _wallet;
        wallet = _wallet;
        tokensCap = _cap;
        rate = _rate;
        WAVE_CAPS = _waveCaps;
        WAVE_BONUSES = _waveBonuses;
        teamWallet = _teamWallet;
        ecosystemWallet = _ecosystemWallet;
        bountyWallet = _bountyWallet;
        totalTokensForSaleDuringPreICO = _waveCaps[0] * _rate;
        setCrowdsaleStage(0);//set in pre ico stage
    }

    // Crowdsale Stages
    // -----------------------

    // Change Crowdsale Stage.

    function setCrowdsaleStage(uint256 _stage) private {
        setCurrentBonus(WAVE_BONUSSES[_stage]);
        stage = _stage;
    }

    function getCurrentStage() public constant returns (uint256){
        return stage;
    }

    function currentWaveCap() public constant returns (uint256) {
       return WAVE_CAPS[stage];
    }

    function incrementWave() private {
        stage = stage + 1;
        IncrementWave(stage);
        return;
    }

    // Change the current bonus
    function setCurrentBonus(uint256 _bonus) private {
        bonus = _bonus;
        return;
    }

    //---------------------------end stages----------------------------------

    // creates the token to be sold.
    // override this method to have crowdsale of a specific MintableToken token.
    function createTokenContract() internal returns (MintableToken) {
        return new Token();
    }
    // Override to indicate when the crowdsale ends and does not accept any more contributions
    // Checks endTime by default, plus cap from CappedCrowdsale
    function hasEnded() public view returns (bool) {
        return super.hasEnded();
    }

    // Override this method to have a way to add business logic to your crowdsale when buying
    // Returns weiAmount times rate by default
    function getTokenAmount(uint256 weiAmount) internal view returns (uint256) {
        return super.getTokenAmount(weiAmount + math.getPercentAmount(weiAmount, bonus, 18));
    }

    // Override to create custom fund forwarding mechanisms
    // Forwards funds to the specified wallet by default
    function forwardFunds() whenNotPaused internal {
        if (stage == 0) {
            wallet.transfer(msg.value);
            totalWeiInPreICO = totalWeiInPreICO + msg.value;
            if (shouldIncrementWave(totalWeiInICO, totalWeiInPreICO, currentWaveCap())) {
                incrementWave();
            }
            EthTransferred("forwarding funds to wallet",msg.value);
        } else {
            super.forwardFunds();
            totalWeiInICO = totalWeiInICO.add(msg.value);
            EthTransferred("forwarding funds to vault",msg.value);
            if (shouldIncrementWave(totalWeiInICO, totalWeiInPreICO, currentWaveCap())) {
                incrementWave();
            }

        }
    }

    function shouldIncrementWave(uint256 _totalWeiInICO, uint256 _totalWeiInPreIco, uint256 _currentWaveCap) constant public returns (bool){
        return (_totalWeiInICO + _totalWeiInPreIco) >= _currentWaveCap;
    }

    // Criteria for accepting a purchase
    // Make sure to call super.validPurchase(), or all the criteria from parents will be overwritten
    function validPurchase() internal view returns (bool) {
        return super.validPurchase();
    }

    // Override to execute any logic once the crowdsale finalizes
    // Requires a call to the public finalize method, only after the sale hasEnded
    function finalization() internal {

        //mint tokens for team/ecosystem/bounties
        if (token.totalSupply() < tokensCap) {
            mintTokens(remainingTokensWallet, tokensCap.sub(token.totalSupply()));
        }
        //no more tokens from now on
        token.finishMinting();
        return super.finalization();
    }

    function finalize() public onlyOwner {

        uint256 tokenSupplyBeforeExtraMinting = token.totalSupply();
        require(!isFinalized);
        require(hasEnded());
        mintTokens(teamWallet, math.getPercentAmount(tokenSupplyBeforeExtraMinting, 20, 18));
        mintTokens(bountyWallet, math.getPercentAmount(tokenSupplyBeforeExtraMinting, 5, 18));
        mintTokens(ecosystemWallet, math.getPercentAmount(tokenSupplyBeforeExtraMinting, 20, 18));
        finalization();
        isFinalized = true;
    }


    function mintTokens(address beneficiary, uint256 tokens) whenNotPaused public onlyOwner {
        require(beneficiary != 0x0);
        // Cannot mint after sale is closed
        require(!isFinalized);
        token.mint(beneficiary, tokens);
        TokenMint(beneficiary, tokens);
    }
}