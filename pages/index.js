import React, {Component} from 'react';
import factory from '../etherium/factory';

class CampaignIndex extends Component {
  async ComponentDidMount(){
    const campanhas = await factory.methods.getDeployed().call();

    console.log(campanhas);
  }

  render(){
    return <div>asd</div>
  }
}

export default CampaignIndex;
