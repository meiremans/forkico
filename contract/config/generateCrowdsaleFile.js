const jsonfile = require('jsonfile');


const file = './crowdsale.json';

function generateWaves(waves, cb) {
    let wavesObj = {"PRE-ICO": {}};
    for (let i = 1; i < waves; i++) {
        wavesObj["WAVE" + i] = {};
    }
    jsonfile.writeFile(file, wavesObj,cb);
}

function fillInConfig(waveData, wallets, meta, cb) {
   jsonfile.readFile(file,function(err,res){
       let waves = res;

    let filledInWaves = {};
    let fullConfig = {};
    waveData.map((inputForWave, index) => {
        for (let key in waves) {
            if (waves.hasOwnProperty(key)) {
                if (key === Object.keys(inputForWave)[0]) {
                    filledInWaves[key] = inputForWave[key];
                }
            }
        }
    });
    fullConfig["WAVES"] = filledInWaves;
    fullConfig["WALLETS"] = wallets;
    fullConfig["DATES"] = meta.DATES;
    fullConfig["RATE"] = meta.RATE;
    fullConfig["GOAL"] = meta.GOAL;


    jsonfile.writeFile(file, fullConfig, function (err) {
        if (err) {
            console.error(err)
        }
        if (!err) {
            cb();
        }
    });
   });
};



module.exports = {
    generateWaves,
    fillInConfig
};