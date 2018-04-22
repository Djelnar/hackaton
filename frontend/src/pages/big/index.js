import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Heading } from 'rebass';
import withRouter from 'react-router-dom/withRouter';
import axios from 'axios'
import { EventCard } from './eventCard';


export const Page = styled.div`
  padding-top: 1px;
  width: 100vw;
  min-height: 100vh;
  background-color: pink;
  position: relative;
`

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 640px;
  width: 100%;
  margin: 16px auto 0;
  padding-left: 20px;
  padding-right: 20px;
  height: 100%;
`

export const SHeading = Heading.extend`
  margin-top: 46px;
  margin-bottom: 32px;
`

const InputWrap = styled.div`
  background-color: #fff;
  border-radius: 4px;
  width: 100%;
  will-change: transform;
  transition: transform .1s ease-in, width .1s ease-in;
  margin-bottom: 16px;
  box-shadow: 1px 1px 11px 0px rgba(127,127,127,0.75);

  & .blacc {
    display: none;
    position: absolute;
    width: 100vw;
    height: 100vh;
    text-align: center;
    padding-top: 10px;
    color: #ffffff;
    background-color: #000000aa;
    transition: none;
    z-index: 9999;
  }
  & input {
    display: block;
    width: 100%;
    border: 0;
    background-color: transparent;
    outline: none;
    padding: 8px;
    font-size: 18px;
  }

  ${(p) => p.transform !== 0 && css`
    transform: translateY(-${p.transform}px);
    transition: transform .1s ease-out, width .1s ease-out;
    width: 100vw;
    border-radius: 0;
    box-shadow: none;
    margin-bottom: 4px;

    & input {
      padding: 14px 8px;
    }

    & .blacc {
      display: block; 
    }
  `}
`;

class BigRaw extends Component {
  state = {
    transform: 0,
    events: [],
  }

  focusHandler = (e) => {
    const { y } = e.target.getBoundingClientRect()
    this.setState({
      transform: y,
    })
  }

  blurHandler = () => {
    this.setState({
      transform: 0,
    })
  }

  componentDidMount() {
    axios(`http://${window.location.hostname}:3010/crowdEvents`)
      .then(({ data }) => {
        this.setState({
          allEvents: data,
          events: data
          // events: [
          //   {
          //     "id": 1,
          //     "eventName": "Dinamo – Rubin play",
          //     "description": "Soccer match at Khimki arena",
          //     "link": "http://belet.ru/239-futbol-dinamo-rubin.html",
          //     "type": "sport",
          //     "date": "2018-04-30T14:00:00",
          //     "participants": [
          //       1, 2
          //     ],
          //     "place": "55.8853158,37.454415"
          //   }
          // ]
        })

      })
      .catch((e) => console.log(e))
  }
  inputHandler = (e) => {
    if (e.target.value.length < 1) {
      this.setState({
        events: this.state.allEvents
      })
    }
    let events = this.state.allEvents.filter((event) => event.eventName.toLowerCase().includes(e.target.value.toLowerCase()))
    this.setState({
      events
    })
  }
  render() {
    const { transform, events } = this.state

    const { history } = this.props

    return (
      <Page>
        <Container>
          <SHeading>Search:</SHeading>
          <InputWrap
            transform={transform}
          >
            <input
              placeholder='Search'
              onFocus={this.focusHandler}
              onBlur={this.blurHandler}
              onChange={this.inputHandler}
            />
            <div
              className='blacc'
            >tap to see the results</div>
          </InputWrap>
          {
            events.length ? events.map((evt) => (
              <EventCard
                key={evt.id}
                {...evt}
              />
            )) : null
          }
        </Container>
      </Page>
    )
  }
}

export const Big = withRouter(BigRaw)