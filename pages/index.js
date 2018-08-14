import React, {Component} from 'react';
import factory from '../etherium/factory';
import { Card } from 'semantic-ui-react';

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

  renderCampanhas(){
    const items = this.props.campanhas.map(address =>{
      return {
        header:address,
        description: <a>Ver campanha</a>,
        meta: "asd",
        fluid: true,
      }
    });



    return <Card.Group items={items} />;
  }

  render(){
    return <div>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"></link>
    {this.renderCampanhas()}
    </div>
  }
}

export default CampaignIndex;
