var json = require('comment-json');
var fs = require('fs');

const crowdSaleConfig = json.parse(fs.readFileSync('./../config/crowdsale.json').toString(), null, true);


export function getBonuses(){
    let bonuses = [];
    Object.keys(crowdSaleConfig.WAVES).forEach(function(key) {
        bonuses.push(crowdSaleConfig.WAVES[key].BONUS);
    });
    return bonuses;
}

export function getWaveCaps(){
    let caps = [];
    Object.keys(crowdSaleConfig.WAVES).forEach(function(key) {
        caps.push(crowdSaleConfig.WAVES[key].CAP * Math.pow(10, 18)); //CAPS IN WEI
    });
    return caps;
}

export function getStartOffset(){
    return crowdSaleConfig.DATES.START_IN_DAYS;
}

export function getEndOffset(){
    return crowdSaleConfig.DATES.END_IN_DAYS;
}

export function getRate(){
    return crowdSaleConfig.RATE;
}

export function getWalletAddresses(){
    let addresses = [];
    Object.keys(crowdSaleConfig.WALLETS).forEach(function(key) {
        addresses.push(crowdSaleConfig.WALLETS[key].ADDRESS);
    });
    return addresses;
}
export function getWalletBonusAmount(){
    let addresses = [];
    Object.keys(crowdSaleConfig.WALLETS).forEach(function(key) {
        addresses.push(crowdSaleConfig.WALLETS[key].AMOUNT);
    });
    return addresses;
}

module.export = {
    getBonuses,
    getWaveCaps,
    getStartOffset,
    getEndOffset,
    getRate,
    getWalletAddresses,
    getWalletBonusAmount
};