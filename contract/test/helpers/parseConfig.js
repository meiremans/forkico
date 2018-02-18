const crowdSaleConfig = require('./../../config/crowdsale');


export function getBonuses(){
    let bonuses = [];
    Object.keys(crowdSaleConfig.WAVES).forEach(function(key) {
        bonuses.push(crowdSaleConfig[key].BONUS);
    });
    return bonuses;
}

export function getWaveCaps(){
    let caps = [];
    Object.keys(crowdSaleConfig.WAVES).forEach(function(key) {
        caps.push(crowdSaleConfig[key].CAP * Math.pow(10, 18)); //CAPS IN WEI
    });
    return caps;
}

export function getStartOffset(){
    return crowdSaleConfig.DATES.START_IN_DAYS;
}

export function getEndOffset(){
    return crowdSaleConfig.DATES.END_IN_DAYS;
}

module.export = {
    getBonuses,
    getWaveCaps,
    getStartOffset,
    getEndOffset
};