import React from 'react'
import styled from "styled-components";

//전체 컨테이너(공지)
const InfoContainer = styled.div`
box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;  // Centers children along the horizontal axis
  align-items: center;  // Centers children along the vertical axis
  overflow: visible;
  padding: 16px 24px;
  position: relative;
  width: 100%;
  height: min-content;
  color: #333D4B;
  background-color: #1A1F27;
`
//텍스트 스타일
const TextArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;  // Centers children along the horizontal axis
    justify-content: center;  // Centers children along the vertical axis
    height: min-content;
    max-width: 810px;
    overflow: visible;
    position: relative;
    gap: 20px;
    margin-top: 50px;
    margin-bottom: 50px;
`
const TextTitle = styled.div`
    display: flex;
    line-height: 30px;
    font-weight: 600;
    font-size: 24px;
    letter-spacing: -.5px;
    overflow-wrap: break-word; // add this line
    text-overflow: ellipsis;
    flex: 1 1;
    color: #fff;
`
const TextBody = styled.div`
    display: flex;
    line-height: 22px;
    font-weight: 500;
    font-size: 13px;
    letter-spacing: -.5px;
    overflow-wrap: break-word;
    text-overflow: ellipsis;
    flex: 1 1;
    color: #6B7684;
`

function Footer() {
  return (
    <InfoContainer>
        <TextArea>
            <TextTitle>찾으시는 공연이 없으신가요?</TextTitle>
            <TextBody>
                서울시 체육시설관리사업소에서 진행되는 공연만 지원됩니다
            </TextBody>
        </TextArea>
    </InfoContainer>
  )
}

export default Footer;

