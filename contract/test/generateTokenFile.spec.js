const fs = require('fs');

const generateTokenFile = require('./../config/generateTokenFile');
const file = './token.sol';

require('chai')
    .should();

before( function (done) {
    fs.writeFile("./test.test", '', function(err) {
        if (err) {
            console.log(err);
        }
        done();
    })
});

describe('GenerateTokenFile',  function () {

    it('should generate the token file', function(done){
      generateTokenFile.generateTokenFile("TEST","TST",18,"./test.test", function(){
          fs.readFile("./test.test",function(err,res){
              fs.readFile("./test.res",function(err,resTest){
                  console.log(err);
                  res.toString().should.equal(resTest.toString());
                  done();
              })

          })
      });
    })
})