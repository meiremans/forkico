
const generateCrowdsalefile = require('./../config/generateCrowdsaleFile');
const jsonfile = require('jsonfile');
const file = './crowdsale.json';

require('chai')
    .should();

before( function (done) {
    jsonfile.writeFile(file,{},function(){done()});
});

describe('GenerateCrowdSaleFile', async function () {
   it('should create a crowdsale.json config file', function (done) {
        const amountOfWaves = 2;
        generateCrowdsalefile.generateWaves(amountOfWaves, function(){
            jsonfile.readFile(file,function(err,res){
              res.should.be.deep.equal({"PRE-ICO": {}, "WAVE1": {}});
              done();
          });

        });

    });

    it('should fill in the json file', function (done) {
        const waves = [{
            "PRE-ICO":
                {
                    BONUS: 100,
                    CAP: 1
                }
        },
            {
                "WAVE1": {
                    BONUS: 75,
                    CAP: 2
                }
            }];
        const wallets ={
            "OWNER":{
                "ADDRESS" : "0x8d3afe0bd3e0fbf96e6a78103d100c359e0b17e5", // THe owner address, you will deploy from this adress. The mnemonic must cover this adress!
                    "AMOUNT" : 20 //amount of bonus for owner, in percent
            },
            "TEAM":{
                "ADDRESS" : "0x8d3afe0bd3e0fbf96e6a78103d100c359e0b17e5", //The team address
                    "AMOUNT" : 20 //amount of bonus for Team, in percent
            },
            "ECOSYSTEM" :{
                "ADDRESS" : "0x8d3afe0bd3e0fbf96e6a78103d100c359e0b17e5", // the ecosystem address
                    "AMOUNT" : 20 //amount of bonus for Ecosystem, in percent
            },
            "BOUNTY" : {
                "ADDRESS": "0x8d3afe0bd3e0fbf96e6a78103d100c359e0b17e5", // the bounty address
                    "AMOUNT" : 5 //amount of bonus for Bounty, in percent
            }
        };
        const meta = {
            "DATES": {
                "START_IN_DAYS": 5, //amount of days when to start the crowdsale after it has been deployed
                "END_IN_DAYS": 10 // amount of days the crowdsale will run.
            },
            "RATE" : 100000, // the rate, you get this amount of token for every 1 ETH.
            "GOAL" : 3, // the goal. also named "softcap". If this amount is not reached, the ico investors get their money back.
        };
        generateCrowdsalefile.fillInConfig(waves,wallets,meta,function(){
            jsonfile.readFile(file,function(err,res) {
                res.should.be.deep.equal({
                    "DATES": {
                        "START_IN_DAYS": 5, //amount of days when to start the crowdsale after it has been deployed
                        "END_IN_DAYS": 10 // amount of days the crowdsale will run.
                    },
                    "RATE": 100000, // the rate, you get this amount of token for every 1 ETH.
                    "GOAL": 3, // the goal. also named "softcap". If this amount is not reached, the ico investors get their money back.
                    "WAVES": {
                        "PRE-ICO": { //The pre ico wave is obligated. Set CAP to 0 have no pre ico.
                            "BONUS": 100, // the bonus in percent.
                            "CAP": 1  //the cap, after this amount in ETH is reaced, the next wave will start
                        },
                        "WAVE1": {  //the first ICO wave. Also obligated
                            "BONUS": 75,
                            "CAP": 2 // the cap should be higher as the previous wave cap(the cap is the total in the contract NOT in this wave)
                        }
                    },
                    "WALLETS": {
                        "OWNER": {
                            "ADDRESS": "0x8d3afe0bd3e0fbf96e6a78103d100c359e0b17e5", // THe owner address, you will deploy from this adress. The mnemonic must cover this adress!
                            "AMOUNT": 20 //amount of bonus for owner, in percent
                        },
                        "TEAM": {
                            "ADDRESS": "0x8d3afe0bd3e0fbf96e6a78103d100c359e0b17e5", //The team address
                            "AMOUNT": 20 //amount of bonus for Team, in percent
                        },
                        "ECOSYSTEM": {
                            "ADDRESS": "0x8d3afe0bd3e0fbf96e6a78103d100c359e0b17e5", // the ecosystem address
                            "AMOUNT": 20 //amount of bonus for Ecosystem, in percent
                        },
                        "BOUNTY": {
                            "ADDRESS": "0x8d3afe0bd3e0fbf96e6a78103d100c359e0b17e5", // the bounty address
                            "AMOUNT": 5 //amount of bonus for Bounty, in percent
                        }
                    }
                });
                done()
            })
        });
    })
});