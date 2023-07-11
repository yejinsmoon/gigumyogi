import React from 'react'
import styled from "styled-components";
import Header from '../components/header';
import './login.css';
import TabComponent from '../components/tab';

function Chat() {
  return (
      <ChatContainer>
        <Header />
        <Chatbody>
          <BannerContainer>
            <TextArea>
            <HeadingLarge>콘서트명</HeadingLarge>
            <TextTitle>공연장소 <TextTitle2>공연상세주소</TextTitle2></TextTitle>
            <TextTitle>공연시간 <TextTitle2>공연시작종료시간</TextTitle2></TextTitle>
            </TextArea>
          </BannerContainer>
          <TabComponent />
        <Chatbody2>


        </Chatbody2>
        </Chatbody>
      </ChatContainer>
          
      );
    };
    
  export default Chat;

const ChatContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const Chatbody = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 810px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  align-content: center;
  flex-wrap: nowrap;
`;

const Chatbody2 = styled.div`
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
  background-color:  #F9F9F9;;
  height: 100vh;
`;

const BannerContainer = styled.div`
    box-sizing: border-box;
    margin-top: 52px;
    align-content: center;
    align-items: start;
    display: flex;
    flex: none;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    overflow: hidden;
    padding: 16px 24px;
    position: relative;
    width: 100%;
    min-width: 250px;
    color: #333D4B;
    
`
//배너 안 텍스트 컨테이너
const TextArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;  
    justify-content: center;
    height: min-content;
    overflow: visible;
    padding: 0;
    position: relative;
    flex: 100px;
    margin-right: 10px;
`
  //타이틀 텍스트 라지
const HeadingLarge = styled.div`
    display: flex;
    line-height: 30px;
    font-weight: 600;
    font-size: 25px;
    letter-spacing: -.5px;
    overflow-wrap: break-word;
    text-overflow: ellipsis;
    flex: 1 1;
    color: #191F28;
    margin: 20px 0;
    `

    //본문 텍스트
const TextTitle = styled.div`
display: flex;
    line-height: 22px;
    font-weight: 600;
    font-size: 13px;
    letter-spacing: -.5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1 1;
    color: #4E5968;
    margin-top: 10px;
`

const TextTitle2 = styled.div`
display: flex;
    line-height: 22px;
    font-weight: 400;
    font-size: 13px;
    letter-spacing: -.5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1 1;
    color: #4E5968;
    margin-left: 12px;
`