const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../etherium/build/CampanhaFactory.json');

//const campanha = require('../etherium/build/Campanha.json');

let accounts, factory, campanhaAddress, campanha;

beforeEach(async() => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' });

    await factory.methods.criarCampanha(100).send({
    from: accounts[0],
    gas: '1000000'
  });

  [campanhaAddress] = await factory.methods.getDeployed().call();
  campanha = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface),
    campanhaAddress
  );

});

describe('Campanhas', () => {
  it('factory e campanha', () => {
    assert.ok(factory.options.address);
    assert.ok(campanha.options.address);
  });
});
