import React from 'react'
import styled from "styled-components";

import Icons from '../components/icons';
import List from '../components/list';
import Banner from '../components/banner';
import OpeningList from '../components/openinglist';
import Notice from '../components/notice';
import ServiceInfo from '../components/serviceinfo';
import Footer from '../components/footer';

function Home() {
  return (
    <HomeContainer>
      <Homebody>
        <Icons />
        <Banner />
        <List />
        <Notice />
        <OpeningList />
        <ServiceInfo />
      </Homebody>
      <Footer />
    </HomeContainer>
  )
} 

export default Home

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F2F4F6;
  flex-direction: column;
`;

const Homebody = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 810px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  align-content: center;
  flex-wrap: nowrap;
  gap:15px;
  padding: 0px 20px 0px 20px;
`;