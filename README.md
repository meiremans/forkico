install dependencies
run server.js

post to localhost:3000/generateContract
````
{
	"waves":2,
	"token": {
		"name" : "testtoken",
		"ticker" : "TTT"
	}
}
````
Where waves are the amount of aves that you want(2 min)
And token name and ticker

Then after this post to localhost:3000/generateContract

```
{"meta":{
  "DATES": {
    "START_IN_DAYS": 5,
    "END_IN_DAYS": 10
  },
  "RATE" : 100,
  "GOAL"  : 1000
  },
  "waveData": [{
         "PRE-ICO":
          {
                    "BONUS": 100,
                    "CAP": 1
                }
        },
            {
                "WAVE1": {
                    "BONUS": 75,
                    "CAP": 2
                }
            }],
  "wallets":{
    "OWNER":{
      "ADDRESS" : "0x8d3afe0bd3e0fbf96e6a78103d100c359e0b17e5", 
      "AMOUNT" : 20 
    },
    "TEAM":{
      "ADDRESS" : "0x8d3afe0bd3e0fbf96e6a78103d100c359e0b17e5", 
      "AMOUNT" : 20
    },
    "ECOSYSTEM" :{
      "ADDRESS" : "0x8d3afe0bd3e0fbf96e6a78103d100c359e0b17e5", 
      "AMOUNT" : 20 
    },
    "BOUNTY" : {
      "ADDRESS": "0x8d3afe0bd3e0fbf96e6a78103d100c359e0b17e5",
      "AMOUNT" : 5 
}
  }
}
````
DATES: are the start and end date, relative to now.
RATE: how much tokens for 1 eth.
GOAL: the softcap, only when this is reached all waves unlock(except for PRE-ICO which is not refundable)
Wavedata: for each wave the data, the first wave is always "PRE-ICO", from then on WAVEi (where i is the number of the wave)
cap = the wave cap
Bonus = the bonus in percent

Wallets: here you put your teamwallets and the amount they are getting on successfull complation of the contract.
