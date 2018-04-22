import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Page, Container } from './';
import { Heading } from 'rebass';
import Axios from 'axios';

export const AppID = 'Z7985VNjS9rA6QPPIBcY'

export const AppCode = '74m9Tb-4Wf4iNmwtxzOZSg'

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
    eventName: '',
    description: '',
    link: '',
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
          suggestions: data.suggestions || []
        })
      })
  }

  inputHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  joinEvent = (createdId) => {
    Axios.patch(`http://${window.location.hostname}:3010/localEvents/${createdId}`, {
      participants: [
        +localStorage.getItem('userId'),
      ]
    }).then(({data})=> {
      this.props.history.push('/smallevent/' + data.id)
      // console.log(data)
    }).catch((e) => console.log(e))
  }

  createNewGroup = () => {
    // console.log(this.state.place)
    let {eventName,
      description,
      link,
      place} = this.state
    Axios.post(`http://${window.location.hostname}:3010/localEvents`, {
      createdBy: +localStorage.getItem('userId'),
      eventName,
      description,
      link,
      place
    }).then(({data})=> {
      this.joinEvent(data.id)
    }).catch((e) => console.log(e))
  }

  render() {
    const { suggestions, selectPlace, place, eventName,
      description,
      link } = this.state

    return (
      <Fragment>
        <Page>
          <Container>
            <SHeading>Create new group</SHeading>
            <InputWrap>
              <input onChange={this.inputHandler} value={eventName} name="eventName" placeholder='Group name' type='text' />
            </InputWrap>
            <InputWrap>
              <input onChange={this.inputHandler} value={description} name="description" placeholder='Description' type='text' />
            </InputWrap>
            <InputWrap>
              <input onChange={this.inputHandler} value={link} name="link" placeholder='Link' type='text' />
            </InputWrap>
            <InputWrap>
              <div children={place} onClick={() => this.setState({ selectPlace: true })} />
            </InputWrap>
            {
              place !== 'Place' && (
                <InputWrap
                  style={{
                    backgroundColor: 'fuchsia'
                  }}
                >
                  <div
                    style={{
                      color: '#fff',
                      textAlign: 'center',
                      userSelect: 'none'
                    }}
                    onClick={this.createNewGroup}
                  >Create</div>
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
