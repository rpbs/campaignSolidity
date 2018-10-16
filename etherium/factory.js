import Web3 from './web3';
import CampanhaFactory from './build/CampanhaFactory';
console.log(CampanhaFactory.interface);
const instance = new Web3.eth.Contract(
  JSON.parse(CampanhaFactory.interface),
  '0xbf3b6375782b255AE4ef87FE4f8782b0710a6a51'
);

export default instance;
