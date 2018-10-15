import React, { Component } from 'react';
import { Card, Grid, Button, Table } from 'semantic-ui-react';
import  Layout from '../../../components/Layout';
import RequestRow from '../../../components/RequestRow';
import { Link } from '../../../routes'
import Campaign from '../../../etherium/campaign';

class RequestIndex extends Component {
  static async getInitialProps(props){
    const { address } = props.query;
    const campaign = Campaign(address);
    const requesCount = campaign.methods.getRequestCount().call();

    const requests = await Promise.all(
      Array(requesCount)
        .fill()
        .map((element, index) => {
          return campaign.methods.requisicoes(index).call();
        })
    );
    return { address };
  }

  renderRow(){
    return this.props.requests.map((request, index) => {
      return (<RequestRow
        key={index}
        request={request}
        address={this.props.address}
        />
      );
    });
  }

  render(){

    const {Header, Row, HeaderCell, Body} = Table;

    return (
      <Layout>
        <h3>Requisições</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary>Adicionar requisições</Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>Teste</HeaderCell>
              <HeaderCell>Teste</HeaderCell>
              <HeaderCell>Teste</HeaderCell>
              <HeaderCell>Teste</HeaderCell>
              <HeaderCell>Teste</HeaderCell>
              <HeaderCell>Teste</HeaderCell>
              <HeaderCell>Teste</HeaderCell>
            </Row>
          </Header>
          <Body>
           {this.renderRow()}
          </Body>
        </Table>
      </Layout>
    );
  }
}

export default RequestIndex;
