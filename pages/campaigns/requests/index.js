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
    const requesCount = await campaign.methods.getRequestCount().call();
    const aprovadoresCount = await campaign.methods.aprovadoresCount().call();
    const requests = await Promise.all(
      Array(parseInt(requesCount))
        .fill()
        .map((element, index) => {
          console.log(index);
          return campaign.methods.requisicoes(index).call();
        })
    );
    return { address, requests, requesCount, aprovadoresCount };
  }

  renderRow(){
    console.log(this.props.requests);
    return this.props.requests.map((request, index) => {
      return (<RequestRow
        id={index}
        request={request}
        address={this.props.address}
        aprovadoresCount={this.props.aprovadoresCount}
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
                  <HeaderCell>Teste</HeaderCell>
            </Row>
          </Header>
          <Body>
           {this.renderRow()}
          </Body>
        </Table>
        <div>Total de: {this.props.requesCount} requisições</div>
      </Layout>

    );
  }
}

export default RequestIndex;
