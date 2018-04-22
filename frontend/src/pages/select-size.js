import React from 'react';
import styled from 'styled-components';
import { Heading } from 'rebass';
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
  margin: 40px auto 0;
  padding-left: 32px;
  padding-right: 32px;
  height: 100%;
`

const SHeading = Heading.extend`
  margin-top: 32px;
  margin-bottom: 32px;
`

const LinkHeading = SHeading.extend`
  text-decoration: underline dashed fuchsia;
  color: fuchsia;
  font-weight: 400;
  font-size: 48px;
`

const SelectSizeRaw = ({ history }) => (
  <Page>
    <Container>
      <SHeading>
        Select type of a crowd
      </SHeading>
      <LinkHeading
        onClick={() => history.push('/big-form')}
      >
        Large events
      </LinkHeading>
      <LinkHeading
        onClick={() => history.push('/small-form')}
      >
        Small meetings/groups
      </LinkHeading>
    </Container>
  </Page>
)

export const SelectSize = withRouter(SelectSizeRaw)