import Web3 from './web3';
import CampanhaFactory from './build/CampanhaFactory';

const instance = new Web3.eth.Contract(
  JSON.parse(CampanhaFactory.interface),
  '0x9F01f10f12999af97C574162F66Ee8bFd93DCa1A'
);

export default instance;
