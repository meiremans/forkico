require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = require('./secret/mnemonic').mnemonic;

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
                return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/CJs6ec7XfxmC2k6SgObI")
            },
            gas: 4612388,
            gasPrice: 65000000000,
            network_id: 3
        }
    } ,
    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    }
};
