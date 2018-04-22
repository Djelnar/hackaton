import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Page, Container } from './';
import { Heading } from 'rebass';
import Axios from 'axios';

const AppID = 'Z7985VNjS9rA6QPPIBcY'

const AppCode = '74m9Tb-4Wf4iNmwtxzOZSg'

export const SHeading = Heading.extend`
  margin-top: 46px;
  margin-bottom: 32px;
`

const InputWrap = styled.div`
  background-color: #fff;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 16px;
  box-shadow: 1px 1px 11px 0px rgba(127,127,127,0.75);
  position: relative;

  & input, & div {
    display: block;
    width: 100%;
    border: 0;
    background-color: transparent;
    outline: none;
    padding: 8px;
    font-size: 18px;
  }
`

const Selector = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: #fff;
  left: 0;
  top: 0;
`;

const Closer = styled('span') `
  display: block;
  position: absolute;
  font-size: 24px;
  background-color: fuchsia;
  color: #ffffff;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 4px;
  padding-right: 4px;
  top: 0;
  right: 0;
  border-radius: 0 4px 4px 0;
`

class CreateSmallRaw extends Component {
  state = {
    suggestions: [],
    selectPlace: false,
    place: 'Place',
  }

  placeHandler = (e) => {
    Axios
      .get('http://autocomplete.geocoder.cit.api.here.com/6.2/suggest.json' +
        '?app_id=' + AppID +
        '&app_code=' + AppCode +
        '&query=' + e.target.value.trim())
      .then(({ data }) => {
        this.setState({
          suggestions: data.suggestions
        })
      })
  }

  render() {
    const { suggestions, selectPlace, place } = this.state

    return (
      <Fragment>
        <Page>
          <Container>
            <SHeading>Create</SHeading>
            <InputWrap>
              <input placeholder='Name' type='text' />
            </InputWrap>
            <InputWrap>
              <input placeholder='Description' type='text' />
            </InputWrap>
            <InputWrap>
              <input placeholder='Link' type='text' />
            </InputWrap>
            <InputWrap>
              <div children={place} onClick={() => this.setState({ selectPlace: true })} />
            </InputWrap>
            {
              place !== 'Place' && (
                <InputWrap>
                  <div>Create</div>
                </InputWrap>
              )
            }
          </Container>
          {
            selectPlace && (
              <Selector>
                <InputWrap>
                  <input placeholder='Place' onChange={this.placeHandler} type='text' />
                  <Closer
                    onClick={() => this.setState({ selectPlace: false })}
                  >Close</Closer>
                </InputWrap>
                <div
                  style={{
                    padding: '0 10px'
                  }}
                >
                  {
                    suggestions.length ? suggestions.map((sugg) => (
                      <InputWrap
                        key={sugg.label}
                        onClick={() => this.setState({
                          place: sugg.label,
                          selectPlace: false
                        })}
                      >
                        <div>{sugg.label}</div>
                      </InputWrap>
                    )) : null
                  }
                </div>
              </Selector>
            )
          }
        </Page>
      </Fragment>
    );
  }
}


export const CreateSmall = withRouter(CreateSmallRaw)
