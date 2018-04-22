import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import generate from 'string-to-color';
import { Subhead } from 'rebass';

const Tag = styled.span`
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

const Img = styled.div`
  flex: 0 0 80px;
  height: 80px;
  display: flex;
  align-items: center;
  background-color: fuchsia;
  margin-right: 12px;
  width: 80px;
  & img {
    display: block;
    width: 100%;
  }
`

const UserCard = styled.div`
  border-radius: 4px;
  background-color: #fff;
  padding: 8px;
  width: calc(100%);
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 16px;
  box-shadow: 1px 1px 11px 0px rgba(127,127,127,0.75);
`

const Button = styled.div`
border-radius: 4px;
box-shadow: 1px 1px 11px 0px rgba(127,127,127,0.75);
text-align: center;
padding: 30px 0;
height: 80px;
width: 80px;
  background: pink;
  font-weight: 500;
`

const Main = styled.div`
justify-content: space-between;
  display: flex;
`

const Tags = styled.div`
  padding: 20px 0 10px 0;
`

export default ({id, name, gender, age, tags, contact}) => {
  return (
    <UserCard>
      <Main>
        <div style ={{display: 'flex'}}>
          <Img>
          <img src="https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Dog-512.png" />
          </Img>
          <div>
          <Subhead
            children={name}
          />
          <span>{gender}</span>
          <span> {age}</span>
          </div>
        </div>
        <Button onClick={() => contact(id)} >Contact</Button>
      </Main>
      <Tags>
        {tags.map((tag, i) => <Tag key={i}>{tag}</Tag> )}
      </Tags>
    </UserCard>
  )
}