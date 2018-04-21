import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Page, Container } from './';
import { Heading, Text, Link, Tabs, Tab } from 'rebass';


const BIG = {
  "id": 1,
  "eventName": "Dinamo – Rubin play",
  "description": "Soccer match at Khimki arena",
  "link": "http://belet.ru/239-futbol-dinamo-rubin.html",
  "type": "sport",
  "date": "2018-04-30T14:00:00",
  "participants": [
    1, 2
  ],
  "place": "55.8853158,37.454415"
}

const DescCont = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
`

const Img = styled.div`
  flex: 0 0 80px;
  height: 80px;
  display: flex;
  align-items: center;
  background-color: fuchsia;
  margin-right: 12px;
  & img {
    display: block;
    width: 100%;
  }
`

export class BigPage extends Component {
  state = {
    tab: 'desc',
  }

  setTab = (tab) => () => {
    this.setState({
      tab,
    })
  }

  render() {
    const { id } = this.props

    const { tab } = this.state

    return (
      <Page>
        <Container>
          <DescCont>
            <Img>
              <img src='https://pp.userapi.com/c837229/v837229998/63bce/U6LZXTT_LVg.jpg' />
            </Img>
            <div>
              <Heading fontSize={3}>{BIG.eventName}</Heading>
              <Text
                mt={10}
                textAlign='left'
              >{BIG.date}</Text>
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
                  textAlign='left'
                  fontSize={3}
                  style={{
                    width: '100%'
                  }}
                >
                  {BIG.description}
                </Text>
                <Text
                  style={{
                    width: '100%'
                  }}
                  mt={8}
                  textAlign='left'
                >
                  <Link
                    href={BIG.link}
                    textAlign='left'
                  >Link</Link>
                </Text>
                <Text
                  style={{
                    width: '100%'
                  }}
                  mt={8}
                  textAlign='left'
                >Type: {BIG.type}</Text>
              </Fragment>
            )
          }
        </Container>
      </Page>
    );
  }
}