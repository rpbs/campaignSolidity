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
  render(){
    return (
      <Layout>
        <h3>asd</h3>
        <Form>
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
        <Button primary>Criar</Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
