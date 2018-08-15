import React, { Component } from 'react';
import Layout from '../../components/Layout'
import { Button, Checkbox, Form, Input, Message } from 'semantic-ui-react'
import factory from '../../etherium/factory';
import web3 from '../../etherium/web3';

class CampaignNew extends Component {
  state = {
    contribuicaoMinima: '',
    errorMessage: ''
  };

  onSubmit = async (event) => {
    event.preventDefault();
    try {
      const contas = await web3.eth.getAccounts();
      await factory.methods
        .criarCampanha(this.state.contribuicaoMinima)
        .send({
          from: contas[0]
        });
    } catch (e) {
      this.setState({ errorMessage: e.message });
    }
  };

  render() {
    return (
      <Layout>
        <h3>Criar nova campanha</h3>
        <Form onSubmit={this.onSubmit} error={this.state.errorMessage}>
          <Form.Field>
            <label>Contribuição mínima</label>
            <Input label='wei'
              labelPosition="right"
              placeholder='Seu valor aqui'
              value={ this.state.contribuicaoMinima }
              onChange={ ev =>
                this.setState({ contribuicaoMinima: ev.target.value })
              }
            />
          </Form.Field>
          <Message
              error
              header='Deu pau'
              content={this.state.errorMessage}
            />
          <Button primary>Criar</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew
