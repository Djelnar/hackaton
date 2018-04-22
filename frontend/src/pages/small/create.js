import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Page, Container } from './';


class CreateSmallRaw extends Component {
  state = {  }
  render() {
    return (
      <Page>
        <Container>
          f
        </Container>
      </Page>
    );
  }
}


export const CreateSmall = withRouter(CreateSmallRaw)
