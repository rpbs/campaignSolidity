import React, { Component } from 'react'
import { Form, Input, Message, Button } from 'semantic-ui-react';

class ContributeForm extends Component {
  render(){
      return (
        <Form>
          <Form.Field>
            <label>Valor</label>
            <Input label="ether" labelPosition="right" />
          </Form.Field>
          <Button primary>
            Contributir
          </Button>
        </Form>
      );
  }
}

export default ContributeForm;
