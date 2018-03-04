const fs = require('fs');

const generateTokenFile = require('./../config/generateTokenFile');
const file = './token.sol';

require('chai')
    .should();

before( function (done) {
    fs.writeFile("./test.sol", '', function(err) {
        if (err) {
            console.log(err);
        }
        done();
    })
});

describe('GenerateTokenFile',  function () {

    it('should generate the token file', function(done){
      generateTokenFile.generateTokenFile("TEST","TST",18,"./test.sol", function(){
          fs.readFile("./test.sol",function(err,res){
              fs.readFile("./test.res.sol",function(err,resTest){
                  res.toString().should.equal(resTest.toString());
                  done();
              })

          })
      });
    })
})