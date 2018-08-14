import React, {Component} from 'react';
import factory from '../etherium/factory';

class CampaignIndex extends Component {
  // criar instancias de método na própria classe...
  //... isso é exigido pelo next....
  // é exigido porque neste ponto estamos no NextServer
  // aqui não temos acessos aos métodos
  /// tradicionais no React,como ComponentDidMout
  static async getInitialProps(){
    const campanhas = await factory.methods.getDeployed().call();

    // return { campanhas: campanhas }; // mesma coisa
    return { campanhas };
  }

  render(){
    return <div>{this.props.campanhas}</div>
  }
}

export default CampaignIndex;
