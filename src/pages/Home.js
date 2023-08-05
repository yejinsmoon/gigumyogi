import React from 'react'
import styled from "styled-components";

import List from '../components/list';
import Banner from '../components/banner';
import ServiceList from '../components/servicelist';
import Notice from '../components/notice';
import Footer from '../components/footer';

function Home() {
  return (
    <HomeContainer>
      <Homebody>
        <Banner />
        <List />
        <Notice />
        <ServiceList />
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
  background-color: #F5F6F7;
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
  background-color: #F5F6F7;
`;