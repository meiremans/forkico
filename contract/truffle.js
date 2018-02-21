require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = require('./secret/mnemonic').mnemonic;
const infura = require('./secret/infura').key;

module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 7545,
            gas: 4700000,
            gasPrice: 65000000000,
            network_id: "*" // Match any network id
        },
        ropsten: {
            provider: function () {
                return new HDWalletProvider(mnemonic, `https://ropsten.infura.io/${infura}`)
            },
            gas: 4612388,
            gasPrice: 65000000000,
            network_id: 3
        },
        mainnet: {
            provider: function () {
                return new HDWalletProvider(mnemonic, `https://mainnet.infura.io/${infura}`)
            },
            gas: 4699999,
            gasPrice: 20000000000,
            network_id: "*"
        }
    } ,
    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    }
};
