import Web3 from './web3';
import CampanhaFactory from './build/CampanhaFactory';

const instance = new web3.eth.Contract(
  JSON.parse(CampanhaFactory.interface),
  '0xFAF446D734E98Cff9a276C6B03DEbb490F3E7D2b'
);

export default instance;
