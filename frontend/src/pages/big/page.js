import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Page, Container } from './';
import { Heading, Text, Link, Tabs, Tab } from 'rebass';
import User from '../User'

import axios from 'axios'
import { AppID, AppCode } from '../small/create';


const DescCont = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
`

const Push = styled.div`
  text-align: center;
  position: fixed;
  top: ${(props) => props.show ? '10px' : '-50px' };
  transition: max-height 1s ease-out 0.5s;
  left: 5%;
  width: 90%;
  /* color:  */
  background: #AEE8CC;
  max-height: ${(props) => props.show ? 'auto' : '0' };
  padding: 20px 10px;
  border-radius: 4px;
box-shadow: 1px 1px 11px 0px rgba(127,127,127,0.75);
`

const Img = styled.div`
margin-top: 8px;
  flex: 0 0 120px;
  height: 120px;
  display: flex;
  align-items: center;
  background-color: fuchsia;
  margin-right: 12px;
  & img {
    display: block;
    width: 100%;
  }
`

const Button = styled.div`
border-radius: 4px;
box-shadow: 1px 1px 11px 0px rgba(127,127,127,0.75);
text-align: center;
padding: 9px 0;
margin-top: 10px;
/* height: 20px; */
width: 100%;
  background: fuchsia;
  font-weight: 500;
`

const Choose = styled.div`
padding: 10px 0 0 0;
  width: 100%;
`

const ChooseBtn = styled.div`
  background: ${((props) => props.accept ? '#DDE8B9' : '#CB8589')};
  width: 50%;
  display: inline-block;
  padding: 8px;
  border-radius: 4px;
box-shadow: 1px 1px 11px 0px rgba(127,127,127,0.75);
`

export class BigPage extends Component {
  state = {
    tab: 'desc',
    place: ''
  }

  setTab = (tab) => () => {
    this.setState({
      tab,
      displayPush: false
    })
  }
  componentDidMount = () => {
    this.socket = new WebSocket(`ws://${window.location.hostname}:3020`)
    this.socket.onopen = () => {
      console.log("connected");
    };
    this.socket.onmessage = (event) => {
      let messageData = JSON.parse(event.data)
      switch(messageData.type){
        case 'handshake':
          this.socket.send(JSON.stringify({
            type: 'handshake',
            sockId: messageData.sockId,
            userId: localStorage.getItem('userId')
          }))
          break
        case 'invite':
        let {from,
          fromGroupName,
          fromType} = messageData 
          this.setState({
            push: {from,
              fromGroupName,
              fromType},
            displayPush: true
          })
          break
        default:
          console.log(messageData)
      }
    };
    this.socket.onerror = (error) => {
      console.log("sock error ", error.message);
    };
    

    axios(`http://${window.location.hostname}:3010/crowdEvents/${this.props.id}`)
      .then(({ data }) => {
        let { eventName,
          description,
          image,
          link,
          date,
          place,
          type,
        participants} = data
        this.setState({
          eventName,
          description,
          image,
          link,
          date,
          place,
          type,
          participants
        }, () => {
          let promises = this.state.participants.map((userId) => axios(`http://${window.location.hostname}:3010/users/${userId}`))
          Promise.all(promises)
            .then((results) => {
              let users = results.map(({data}) => data)
              this.setState({
                users
              })
            })
            .catch((e) => console.log('partc err', e))
        })
        

      })
      .catch((e) => console.log(e))

  }

  contactAnotherUser = (id) => {
    
    this.socket.send(JSON.stringify({
      type: 'invite',
      fromGroupName: this.state.eventName,
      fromType: 'event',
      userName: localStorage.getItem('userName'),
      recipientId: id
    }))
  }

  joinEvent = () => {
    let participianIds = this.state.users.map((user) => user.id)
    axios.patch(`http://${window.location.hostname}:3010/crowdEvents/${this.props.id}`, {
      participants: [
        +localStorage.getItem('userId'),
        ...participianIds
      ]
    }).then(({data})=> {
      console.log(data)
    }).catch((e) => console.log(e))
  }
  closePush = () => {
    this.setState({
      displayPush: false
    })
  }

  render() {
    const { id } = this.props

    const { tab, eventName, image,
      description,
      link,
      date,
      place,
      type,
      users,
    push,
  displayPush } = this.state

      console.log('push!', push)

    const [lng, lat] = place.split(',')

    return (
      <Page>
        {displayPush ? <Push show={this.state.displayPush}>
          <span style={{fontWeight: 'bold'}}>
{push.from}
          </span> invites you to meet at <br/>
          <span style={{fontWeight: 'bold'}}>{push.fromGroupName}</span> {push.fromType}!
          <Choose  >
            <ChooseBtn onClick={this.closePush} accept={true}>
              Accept!
            </ChooseBtn>
            <ChooseBtn onClick={this.closePush} >
              No, thanks...
            </ChooseBtn>
          </Choose>
        </Push> : ''}
        
        <Container>
          <DescCont>
            <Img>
              <img src={image} />
            </Img>
            <div>
              <Heading fontSize={3}>{eventName}</Heading>
              <Text
                mt={10}
              >{new Intl.DateTimeFormat('ru').format(date)}</Text>
            {
              (users && users.length && !users.filter( user => +user.id === +localStorage.getItem('userId')).length ? <Button onClick={() => this.joinEvent()} >Join</Button> : '' )
            }
            </div>
            
          </DescCont>
          <Tabs
            style={{
              border: 'none',
              width: '100%'
            }}
            mt={16}
          >
            <Tab borderColor={tab === 'desc' ? 'fuchsia' : 'transparent'} onClick={this.setTab('desc')}>
              Description
            </Tab>
            <Tab borderColor={tab === 'partc' ? 'fuchsia' : 'transparent'} onClick={this.setTab('partc')}>
              Participants
            </Tab>
            <Tab borderColor={tab === 'map' ? 'fuchsia' : 'transparent'} onClick={this.setTab('map')}>
              Map
            </Tab>
          </Tabs>
          {
            tab === 'desc' && (
              <Fragment>
                <Text
                  mt={16}
                  fontSize={3}
                  style={{
                    width: '100%',
                    wordWrap: 'break-word'
                  }}
                >
                  {description}
                </Text>
                <Text
                  style={{
                    width: '100%'
                  }}
                  mt={8}
                >
                  <Link
                    href={link}
                  >Event link</Link>
                </Text>
                {/* <Text
                  style={{
                    width: '100%'
                  }}
                  mt={8}
                >Type: {type}</Text> */}
              </Fragment>
            )
          }
          {
            tab === 'partc' && (
              
              <Fragment>
                {
                  users.length ? users.map((userData, i) => {
                    return (userData.id !== +localStorage.getItem('userId')) ? <User contact={this.contactAnotherUser} key={i} {...userData}/> : ''
                  }) : null
                }
              </Fragment>
            )
          }
          <div id='mapContainer' style={{
            display: tab === 'map' ? 'block' : 'none',
            height: 300,
            width: 300,
            backgroundColor: '#ffffff',
            marginTop: 24
          }}>
            <img style={{
              display: 'block',
              width: '100%'
            }}
              src={'https://image.maps.cit.api.here.com/mia/1.6/mapview' +
                '?app_id=' + AppID +
                '&app_code=' + AppCode +
                '&w=300' +
                '&h=300' +
                '&c=' + this.state.place +
                '&z=16'} />
          </div>
        </Container>
      </Page>
    );
  }
}