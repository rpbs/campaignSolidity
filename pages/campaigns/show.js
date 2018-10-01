import React, { Component } from 'react';
import Layout from '../../components/Layout';
import ContributeForm from '../../components/ContributeForm';
import Campaign from '../../etherium/campaign';
import { Card, Grid, Button } from 'semantic-ui-react';
import { Link } from '../../routes';


class CampaignShow extends Component {
  static async getInitialProps(props){
    let address = props.query.address;
    const campanha = Campaign(address);
    const dados = await campanha.methods.getSummary().call();

    return {
      contribuicaoMinima: dados[0],
      balance: dados[1],
      requisicoes: dados[2],
      aprovadoresCount: dados[3],
      manager: dados[4],
      address: address
    };
  }

  renderCards() {
    const {
      contribuicaoMinima,
      balance,
      requisicoes,
      aprovadoresCount,
      manager
    } = this.props;

    const items = [
      {
          header: manager,
          description: 'manager',
          meta: 'teste',
          style: { overflowWrap: 'break-word'}
      },
      {
          header: contribuicaoMinima,
          description: 'contribuicaoMinima',
          meta: 'contribuicaoMinima',
          style: { overflowWrap: 'break-word'}
      },
      {
          header: requisicoes,
          description: 'requisicoes',
          meta: 'requisicoes',
          style: { overflowWrap: 'break-word'}
      },
      {
          header: aprovadoresCount,
          description: 'aprovadoresCount',
          meta: 'aprovadoresCount',
          style: { overflowWrap: 'break-word'}
      },
      {
          header: balance,
          description: 'balance',
          meta: 'balance',
          style: { overflowWrap: 'break-word'}
      }
    ];
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderCards()}
            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
            <Link route={`/campaigns/${this.props.address}/requests`}>
              <a>
                <Button>Ver requisições</Button>
              </a>
            </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}




export default CampaignShow;
