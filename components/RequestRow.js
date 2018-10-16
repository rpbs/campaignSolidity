import React, { Component } from 'react'
import { Form, Input, Message, Button, Table } from 'semantic-ui-react';
import Campaign from '../etherium/campaign';
import web3 from '../etherium/web3';
import { Router } from '../routes'; // { com chaves porque exporta muitas coisas}

class RequestRow extends Component {

  aprovar = async () => {
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.aprovarRequisicao(this.props.id).send({
      from: accounts[0]
    });
  };

  finalizar = async () => {
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizarRequesicao(this.props.id).send({
      from: accounts[0]
    });
  };

  render(){
    const { Row, Cell } = Table;
    const { id, request, aprovadoresCount } = this.props;
    return (
      <Row>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{request.value}</Cell>
        <Cell>{request.vendor}</Cell>
        <Cell>{request.complete}</Cell>
        <Cell>{request.aprovadoresCount}/{aprovadoresCount}</Cell>
        <Cell>
          <Button color="green" basic onClick={this.aprovar}>
            Aprovar
          </Button>
        </Cell>
        <Cell>
          <Button color="red" basic onClick={this.finalizar}>
            Finalizar
          </Button>
        </Cell>
      </Row>
    );
  };
}

export default RequestRow;
