import React, { Component } from 'react'
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../etherium/campaign';
import web3 from '../etherium/web3';
import { Router } from '../routes'; // { com chaves porque exporta muitas coisas}

class ContributeForm extends Component {

  state = {
    value: '',
    loading: false,
    errorMessage: ''
  };

  onSubmit = async event => {
    event.preventDefault();

    const campanha = Campaign(this.props.address);

    this.setState({
      loading: true
    });

    try {
      const accounts = await web3.eth.getAccounts();

      await campanha.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      })
    } catch (e) {
      this.setState({ errorMessage: e.message });
    } finally {
      Router.replaceRoute(`/campaigns/${this.props.address}`);
      this.setState({
        loading: false, value: ''
      });
    }

  }

  render(){
      return (
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Valor</label>
            <Input
              label="ether"
              value={this.state.value}
              onChange={ev => this.setState({ value: ev.target.value })}
              labelPosition="right" />
          </Form.Field>
          <Message
              error
              header='Deu pau'
              content={this.state.errorMessage}
            />
          <Button primary>
            Contribuir
          </Button>
        </Form>
      );
  }
}

export default ContributeForm;
