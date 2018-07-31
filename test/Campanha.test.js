const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../etherium/build/CampanhaFactory.json');

let endereco;
const campanha = require('../etherium/build/Campanha.json');

let accounts, factory, campanhaAddress, campanhaContrato;

beforeEach(async() => {
  accounts = await web3.eth.getAccounts();
  endereco = accounts[0];
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: endereco, gas: '1000000' });

  await factory.methods.criarCampanha('100').send({
    from: endereco,
    gas: '1000000'
  });

  [campanhaAddress] = await factory.methods.getDeployed().call();
  campanhaContrato = await new web3.eth.Contract(
    JSON.parse(campanha.interface),
    campanhaAddress
  );

});

describe('Campanhas', () => {
  it('factory e campanha', () => {
    assert.ok(factory.options.address);
    assert.ok(campanhaContrato.options.address);
  });

  it('quem criou o contrato é o dono dele...', async () => {
    const manager = await campanhaContrato.methods.manager().call();
    assert.equal(endereco, manager);
  });

  it('pessoas doando e sendo aprovadores...', async () => {
    await campanhaContrato.methods.contribute().send({
      value: '200',
      from: accounts[1]
    });

    let contribuiu = await campanhaContrato.methods.aprovadores(accounts[1]).call();
    assert(contribuiu);
  });
});
