import React, { Component } from 'react';
import { Form, Message, Input, Grid, Button } from 'semantic-ui-react';
import  Layout from '../../../components/Layout';
import { Link, Router } from '../../../routes'
import Campaign from '../../../etherium/campaign';
import web3 from '../../../etherium/web3';

class RequestNew extends Component {
  static async getInitialProps(props){
    const { address } = props.query;
    return { address };
  }
  state = {
    value: '',
    description: '',
    recipient: ''
  };

  onSubmit = async event => {
    event.preventDefault();
    console.log('asd');
    const {value, description, recipient} = this.state;

    try {
      const campaign = Campaign(this.props.address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.criarRequisicao(
        description,
        web3.utils.toWei(value, 'ether'),
        recipient)
        .send({ from: accounts[0] });
    } catch (e) {
      console.log(e);
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
