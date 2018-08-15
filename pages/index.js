import React, {Component} from 'react';
import factory from '../etherium/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout'
class CampaignIndex extends Component {

  // criar instancias de método na própria classe...
  //... isso é exigido pelo next....
  // é exigido porque neste ponto estamos no NextServer
  // aqui não temos acessos aos métbitodos
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
        fluid: true
      }
    });



    return <Card.Group items={items} />;
  }

  render(){
    return (
      <Layout>
        <div>
          <h3>Lista de campanhas</h3>
          <Button
            content="Criar campanha"
            icon="add circle"
            primary={true}
            floated="right"
            />
            {this.renderCampanhas()}
        </div>
      </Layout>
    )
  }
}

export default CampaignIndex;
