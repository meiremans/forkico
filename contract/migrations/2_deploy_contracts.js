const Crowdsale = artifacts.require("./../contracts/ForkedCrowdsale.sol");
const Web3 = require('web3');
const parseConfig = require('./../test/helpers/parseConfig');

function getWalletsForNetwork(network, accounts) {
    let wallets = {};
    if (network === "development") {
        wallets.owner = accounts[0];
        wallets.team = accounts[7];
        wallets.ecosystem = accounts[8];
        wallets.bounty = accounts[9];
    }
    if (network === "ropsten") {
        console.log(accounts);
        wallets.owner = '0x8d3afe0bd3e0fbf96e6a78103d100c359e0b17e5';
        wallets.team = '0x8d3afe0bd3e0fbf96e6a78103d100c359e0b17e5';
        wallets.ecosystem = '0x8d3afe0bd3e0fbf96e6a78103d100c359e0b17e5';
        wallets.bounty = '0x8d3afe0bd3e0fbf96e6a78103d100c359e0b17e5';

    }
    return wallets;
}

module.exports = function (deployer, network, accounts) {


    const RATE = 100000;

    //TODO: when truffleHdwallet finally upgrades to the new web3 provider, rewrite with promises
    web3.eth.getBlockNumber((e, blocknr) => {
        if (!e) {
            web3.eth.getBlock(blocknr, (e, block) => {
                if (e) {
                    console.error('error' + e);
                }

                if (block) {
                    console.log(block);
                    const startTime = block.timestamp + duration.weeks(1); // one second in the future
                    const endTime = startTime + duration.days(2);//TODO: RESET TO: duration.days(178); // half a year
                    const rate = new web3.BigNumber(RATE);
                    const cap = new web3.BigNumber(5 * Math.pow(10, 18));
                    const goal = new web3.BigNumber(3 * Math.pow(10, 18));
                    const WAVE_CAPS = parseConfig.getWaveCaps();
                    const WAVE_BONUSES = parseConfig.getBonuses();

                    const wallets = getWalletsForNetwork(network, accounts);
                    console.log(wallets);

                    deployer.deploy(Crowdsale, startTime, endTime, rate, cap, goal,WAVE_CAPS,WAVE_BONUSES, wallets.owner, wallets.team, wallets.ecosystem, wallets.bounty).then(async () => {
                        const instance = await Crowdsale.deployed();
                        const token = await instance.token.call();

                        console.log('-----> Token Address', token);
                        console.log('-----> startTime:  ', new Date(startTime * 1000).toISOString());
                        console.log('-----> endTime:    ', new Date(endTime * 1000).toISOString());
                        console.log('-----> rate:       ', rate.toString());
                        console.log('-----> wallet:     ', wallets.owner);
                        console.log('-----> cap:        ', cap);
                        console.log('-----> waves caps: ', WAVE_CAPS);
                        console.log('-----> bonusses:   ', WAVE_BONUSES);
                        console.log('-----> goal:       ', goal);

                    }).catch(console.error);
                }
                else {
                    console.error('CANNOT GET ETH BLOCK, RETRY PLS');
                }
            })
        }
    })
};

const duration = {
    seconds: function (val) {
        return val
    },
    minutes: function (val) {
        return val * this.seconds(60)
    },
    hours: function (val) {
        return val * this.minutes(60)
    },
    days: function (val) {
        return val * this.hours(24)
    },
    weeks: function (val) {
        return val * this.days(7)
    },
    years: function (val) {
        return val * this.days(365)
    }
};
