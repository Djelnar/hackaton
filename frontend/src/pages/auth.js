import React, { Component } from 'react';
import styled from 'styled-components';
import { Select, Heading, Button } from 'rebass';
import withRouter from 'react-router-dom/withRouter';


const Page = styled.div`
  padding-top: 1px;
  width: 100vw;
  height: 100vh;
  background-color: pink;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 640px;
  width: 100%;
  margin: 80px auto 0;
  padding-left: 32px;
  padding-right: 32px;
  height: 100%;
`

const Horizontal = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 24px;
`

const SSelect = Select.extend`
  max-width: 30px;
  background-color: #fff;
  flex: 0 0 auto;
`

const Input = styled.input`
  display: block;
  width: calc(100% - 8px);
  background-color: #fff;
  border: none;
  border-radius: 4px;
  margin-left: 8px;
  padding-left: 8px;
  font-size: 24px;
  height: 100%;
  outline: none;
  border: 2px solid transparent;

  &:focus {
    border: 2px solid fuchsia;
  }
  `

const SHeading = Heading.extend`
  margin-top: 32px;
  margin-bottom: 32px;
  `

const InputWrap = styled.div`
  align-self: stretch;
`

class AuthRaw extends Component {
  state = {
    phone: '',
  }

  changeNumber = (e) => {
    if (/^\d+$/.test(e.target.value) || !e.target.value) {
      this.setState({
        phone: e.target.value.slice(0, 10)
      })
    }
  }

  gotoForm = () => {
    this.props.history.replace('/select-size')
  }

  render() {
    const { phone } = this.state

    return (
      <Page>
        <Container>
          <SHeading>Enter your number</SHeading>
          <Horizontal>
            <SSelect>
              <option>+7</option>
              <option>+1</option>
            </SSelect>
            <InputWrap>
              <Input value={phone} onChange={this.changeNumber} />
            </InputWrap>
          </Horizontal>
          <div style={{ width: '100%' }} />
          <Button
            disabled={phone.length !== 10}
            bg='fuschia'
            fontSize={3}
            onClick={this.gotoForm}
          >Login</Button>
        </Container>
      </Page>
    );
  }
}

export const Auth = withRouter(AuthRaw)