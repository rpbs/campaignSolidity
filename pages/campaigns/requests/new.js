import React, { Component } from 'react';
import { Form, Message, Input, Grid, Button } from 'semantic-ui-react';
import  Layout from '../../../components/Layout';
import { Link, Router } from '../../../routes'
import Campaign from '../../../etherium/campaign';
import web3 from '../../../etherium/web3';

class RequestNew extends Component {

  state = {
    value: '',
    description: '',
    recipient: ''
  };

  static async getInitialProps(props){
    const { address } = props.query;
    return { address };
  }

  onSubmit = async event => {
    event.preventDefault();

    const {value, description, recipient} = this.state;

    try {
      const campaign = Campaign(this.props.address);
      const accounts = web3.eth.getAccounts();
      await campaign.methods.createRequest(
        description,
        web3.utils.toWei(value, 'ether'),
        recipient)
        .send({ from: accounts[0] });
    } catch (e) {

    } finally {

    }
  };

  render(){
    return (
      <Layout>
        <h3>KKK</h3>
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Descrição</label>
            <Input
              value={this.state.description}
              onChange={event => this.setState({ description: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Valor</label>
            <Input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Receber endereço</label>
            <Input
              value={this.state.recipient}
              onChange={event => this.setState({ recipient: event.target.value })}
            />
          </Form.Field>
          <Button primary>
            Contribuir
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
