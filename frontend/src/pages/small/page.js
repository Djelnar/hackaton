import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Page, Container } from './';
import { Heading, Text, Link, Tabs, Tab } from 'rebass';
import axios from 'axios'
import QRCode from 'qrcode.react'
import { AppID, AppCode } from './create';
import User from '../User'

const DescCont = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
`

const Img = styled.div`
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

export class SmallPage extends Component {
  state = {
    tab: 'desc',
  }

  setTab = (tab) => () => {
    this.setState({
      tab,
    })
  }
  componentDidMount = () => {
    axios(`http://${window.location.hostname}:3010/localEvents/${this.props.id}`)
      .then(({ data }) => {
        let { eventName,
          description,
          image,
          link,
          date,
          place,
          type,
        participants,
      createdBy } = data
        this.setState({
          eventName,
          description,
          image,
          link,
          date,
          place,
          type,
          participants,
          createdBy
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
          }
        )

      })
      .catch((e) => console.log(e))
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
    createdBy } = this.state

    return (
      <Page>
        <Container>
          <DescCont>
            <Img>
              <img src={image} />
            </Img>
            <div>
              <Heading fontSize={3}>{eventName}</Heading>
              <Text
                mt={10}
              >{/* new Intl.DateTimeFormat('ru').format(date) */}</Text>
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
            <Tab borderColor={tab === 'share' ? 'fuchsia' : 'transparent'} onClick={this.setTab('share')}>
              Share
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
                
                {
                  (createdBy !== +localStorage.getItem('userId')) ? <div
                  style={{
                    marginTop: 16,
                    padding: 8,
                    backgroundColor: 'fuchsia',
                    display: 'block',
                    width: '100%'
                  }}
                >
                  <Text
                    color='#fff'
                    fontSize={4}
                    textAlign='center'
                    style={{
                      display: 'block',
                      width: '100%'
                    }}
                  >Join</Text></div> : ''
                }
                
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
            tab === 'share' && (
              <Fragment>
                <div
                  style={{
                    marginTop: 16,
                    padding: 8,
                    backgroundColor: 'fuchsia'
                  }}
                >
                  <QRCode
                    value={window.location.toString()}
                    size={160}
                  />
                </div>
                <div
                  style={{
                    marginTop: 16,
                    padding: 8,
                    backgroundColor: 'fuchsia'
                  }}
                >
                  <Text
                    color='#fff'
                    fontSize={4}
                    textAlign='center'
                  >app.com{window.location.pathname}</Text>
                </div>
                <div
                  style={{
                    marginTop: 16,
                    padding: 8,
                    backgroundColor: 'fuchsia'
                  }}
                >
                  <Text
                    color='#fff'
                    fontSize={4}
                    textAlign='center'
                  >Share</Text></div>
                <div
                  style={{
                    marginTop: 16,
                    padding: 8,
                    backgroundColor: 'fuchsia'
                  }}
                >
                  <Text
                    color='#fff'
                    fontSize={4}
                    textAlign='center'
                  >Print</Text></div>
              </Fragment>
            )
          }
          {
            tab === 'partc' && (
              <Fragment>
                {
                  users.length ? users.map((userData, i) => {
                    (userData.id !== +localStorage.getItem('userId')) ? <User contact={this.contactAnotherUser} key={i} {...userData}/> : ''
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