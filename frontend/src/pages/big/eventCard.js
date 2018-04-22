import React, { PureComponent } from 'react';
import styled from 'styled-components';
import generate from 'string-to-color';
import { withRouter } from 'react-router-dom';


const EventName = styled.a`
  color: #000000;
  display: block;
  margin-bottom: 4px;
`

const EventCardS = styled.div`
  border-radius: 4px;
  background-color: #fff;
  padding: 8px;
  width: calc(100%);
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 16px;
  box-shadow: 1px 1px 11px 0px rgba(127,127,127,0.75);
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

class EventCardR extends PureComponent {
  state = {}
  render() {
    const { eventName, link, type, date, participants, id, history } = this.props
    return (
      <EventCardS
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
      </EventCardS>
    )
  }
}

export const EventCard = withRouter(EventCardR)