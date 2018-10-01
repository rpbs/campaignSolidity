import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import  Layout from '../../../components/Layout';
import { Link } from '../../../routes'

class RequestIndex extends Component {
  static async getInitialProps(props){
    const { address } = props.query;
    return { address };
  }

  render(){
    return (
      <Layout>
        <h3>Requisições</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary>Adicionar requisições</Button>
          </a>
        </Link>
      </Layout>
    );
  }
}

export default RequestIndex;