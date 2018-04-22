import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Heading } from 'rebass';
import generate from 'string-to-color';
import withRouter from 'react-router-dom/withRouter';
import axios from 'axios'


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

const EventCard = styled.div`
  border-radius: 4px;
  background-color: #fff;
  padding: 8px;
  width: calc(100%);
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 16px;
  box-shadow: 1px 1px 11px 0px rgba(127,127,127,0.75);
`

const EventName = styled.a`
  color: #000000;
  display: block;
  margin-bottom: 4px;
`

const EventDate = styled.div`
  margin-bottom: 4px;
  white-space: nowrap;
`
const EventType = styled.span`
  background-color: ${(p) => generate(p.children)};
  padding: 4px 8px;
  border-radius: 100px;
  margin-left: 8px;
  white-space: nowrap;
  z-index: 1;

  &:first-of-type {
    margin-left: 0;
  }

  &:after {
    /* content: ''; */
    position: absolute;
    left: 6px;
    top: 50%;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    border-radius: 20px;
    background-color: #ffffff;
  }
`

const EventParticipants = styled.p`
  margin-top: 4px;
  margin-bottom: 8px;
`

const EventClick = styled.div`
  border-radius: 0 0 4px 4px;
  display: flex;
  justify-content: center;
  width: calc(100% + 16px);
  padding: 8px 0;
  text-align: center;
  color: #ffffff;
  margin-top: 8px;
  margin-left: -8px;
  margin-bottom: -8px;
  background-color: fuchsia;
`

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
      .then(({data}) => {
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
    if(e.target.value.length < 1){
      this.setState({
        events: this.state.allEvents
      })  
    }
    let events = this.state.allEvents.filter((event) => event.eventName.toLowerCase().startsWith(e.target.value.toLowerCase()))
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
          <SHeading>Search an event</SHeading>
          <InputWrap
            transform={transform}
          >
            <input
              placeholder='Search an event'
              onFocus={this.focusHandler}
              onBlur={this.blurHandler}
              onChange={this.inputHandler}
            />
            <div
              className='blacc'
            >tap to see the results</div>
          </InputWrap>
          {
            events.length ? events.map(({ eventName, link, type, date, participants, id }) => (
              <EventCard
                key={id}
              >
                <EventName
                  href={link}
                >{eventName}</EventName>
                <EventDate>{new Intl.DateTimeFormat('ru').format(date)}</EventDate>
                {/* <EventParticipants>{participants.length} participants</EventParticipants> */}
                <EventType>{type}</EventType>
                <EventClick
                  onClick={() => history.push('/bigevent/' + id)}
                >Details</EventClick>
              </EventCard>
            )) : null
          }
        </Container>
      </Page>
    )
  }
}

export const Big = withRouter(BigRaw)