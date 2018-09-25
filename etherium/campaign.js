import web3 from './web3';
import Campanha from './build/Campanha.json';

export default (address) => {
  return new web3.eth.Contract(
    JSON.parse(Campanha.interface),
    address
  )
};
