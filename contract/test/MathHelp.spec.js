const BigNumber = web3.BigNumber;


require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

const MathHelp = artifacts.require('MathHelp');


contract('MathHelp', function (accounts) {
    beforeEach(async function () {
        this.math = await MathHelp.new();
    });
    it('should give the amount of a percentage of a value', async function () {
        (await this.math.getPercentAmount(100,2,18)).should.be.bignumber.equal(2);
        (await this.math.getPercentAmount(500000,20,18)).should.be.bignumber.equal(100000);
        (await this.math.getPercentAmount(500000,5,18)).should.be.bignumber.equal(25000);
    });
});