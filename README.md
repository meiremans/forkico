# ForkIco


![alt text](https://steemitimages.com/0x0/https://steemitimages.com/DQmWmtWJRw66XNhXTHok5JzqdB85VhJkbhwPitHNi9fVFog/image.png)

ForkIco Is an Ethereum token that you can fork. You have to touch 0 Solidity to create a Crowdsale. You can deploy it throug the modex platform(coming soon?)

  - 100% config
  - 100% Magical

# Transparancy

  - Easy Readable: Almost Nobody has the technical skills to do so. With ForkToken you can show potential investors your config file, which is easy understandable.
  - Anti Fraud: ForkToken is build with legitness in mind. When running an unmodified version of ForkToken, you guaranty that you cannot cheat the crowdsale.


You can also:
  - Fully customize the code
  - Use it as a boilerplate
  - Play around with it

A crowdsale contract should be easy readable.  As written on the [ethereum website][ethereum-website]

>Sometimes a good idea takes a lot of funds and collective effort. You could ask for donations, but donors prefer to give to projects they are more certain will get traction and proper funding. This is an example where a crowdfunding would be ideal: you set up a goal and a deadline for reaching it. If you miss your goal, the donations are returned, therefore reducing the risk for donors. Since the code is open and auditable, there is no need for a centralized, trusted platform and therefore the only fees everyone will pay are just the gas fees.

Pay attention to "the code is open and auditable". As of now everyone has different smart contracts, It is impossible to read them for 99% of the investors. So they only read whitepapers and thrust that what is written there is what is in the code.(it's often not).

### Tech

The ForkIco tech stack is:

* [solidity] - Ethereum Programming language!
* [node.js] - evented I/O for the backend
* [ganache] - for local tests
* [truffle] - deployment system for smart contracts

### Installation

ForkToken requires [Node.js](https://nodejs.org/) v8.9.4+ to run.
In case you want to run it locally(Recommended), also install [Ganache](https://github.com/trufflesuite/ganache/releases) (V1.1.0)
Fork this repository.
Check it out locally.

Install the dependencies.

```sh
$ cd forkcoin
$ npm install
$ npm install -g truffle
```

edit contracts/Token.sol and change "FORKTOKEN" and "FRK" to your name and symbol
```sh
 string public name = "FORKTOKEN";
 string public symbol = "FRK";
```

OR run generateTokenFile

edit contracts/config/crowdsale.json. Here lives your easy to read configuration for the crowdsale:
```sh
{
  "DATES": {
    "START_IN_DAYS": 5,
    "END_IN_DAYS": 10
  },
  "WAVES": {
    "PRE-ICO": {
      "BONUS": 200,
      "CAP": 1
    },
    "WAVE1": {
      "BONUS": 100,
      "CAP": 2
    },
    "WAVE2": {
      "BONUS": 75,
      "CAP": 3
    },
    "WAVE3": {
      "BONUS": 50,
      "CAP": 4
    },
    "WAVE4": {
      "BONUS": 25,
      "CAP": 5
    }
  }
}
```
START_IN_DAYS: is an offset of the date of deploy. In case your crowdsale is open at the moment of deploy you fill in 0 here.

END_IN_DAYS: the Offset after the date of deploy.

WAVES: you can add as many waves as you want. PRE-ICO wave is required and 1 aditional wave. If you don't want a pre-ico, put the CAP on 0.

BONUS is the added bonus for the wave in percent. so if someone sends you 1 ETH. in a wave with 100 bonus. It gives him for the value of 2 eth the tokens.

CAP is the cap in eth, after this is reached, the wave goes to the next wave. If the wave is the last wave, the crowdsale closes

OR run generateCrowdsaleFile. First run generateWaves(AMOUNT_OF_WAVES). 
Then run fillInConfig(waveData, wallets, meta, cb). See test for an example.

### Development

Want to contribute? Great!
Just place a push request.

For the unit tests you need to have truffle and ganache installed.
run $truffle test to test them


### Todos

 - Write MORE Tests
 - Add More configuration options
 - Implement a flattener to flatten all files and be able to verify them on etherscan

License
----

MIT


**Free Software**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [ethereum-website]: <https://www.ethereum.org/crowdsale>
   [node.js]: <http://nodejs.org>
   [solidity]:<https://solidity.readthedocs.io/en/develop/>
   [node.js]: <https://nodejs.org> 
   [ganache]: <http://truffleframework.com/ganache/>
   [truffle]: <http://truffleframework.com/>
