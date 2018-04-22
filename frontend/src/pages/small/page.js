import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Page, Container } from './';
import { Heading, Text, Link, Tabs, Tab } from 'rebass';
import axios from 'axios'


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
      .then(({data}) => {
        let {eventName,
          description,
          image,
          link,
          date,
          place,
          type} = data
        this.setState({
          eventName,
          description,
          image,
          link,
          date,
          place,
          type
        })

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
      type } = this.state

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
        </Container>
      </Page>
    );
  }
}