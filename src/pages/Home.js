import React from 'react'
import styled from "styled-components";
import Header from '../components/header';
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
        <Header />
        <Icons />
        <Banner />
        <List />
        <Notice />
        <OpeningList />
        <ServiceInfo />
        <Footer />
      </Homebody>
    </HomeContainer>
  )
} 

export default Home

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F2F4F6;
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
  gap:10px;
  margin: 0px 14px 0px 14px;

`;