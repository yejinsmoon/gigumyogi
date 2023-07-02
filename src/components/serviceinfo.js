import React from 'react'
import styled from "styled-components";

//전체 컨테이너(공지)
const InfoContainer = styled.div`
box-sizing: border-box;
    align-content: center;
    align-items: center;
    display: flex;
    flex: none;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    overflow: visible;
    padding: 16px 24px;
    position: relative;
    width: 100%;
    height: min-content;
    min-height: 115px;
    min-width: 250px;
    color: #333D4B;
    margin-top: 30px;
    margin-bottom: 30px;
`
//텍스트 스타일
const TextArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;  
    justify-content: center;
    height: min-content;
    overflow: visible;
    position: relative;
    flex: 100px;
    gap: 20px;
`
const TextTitle = styled.div`
    display: flex;
    line-height: 30px;
    font-weight: 700;
    font-size: 24px;
    letter-spacing: -.5px;
    overflow-wrap: break-word; // add this line
    text-overflow: ellipsis;
    flex: 1 1;
    color: #333D4B;
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

function ServiceInfo() {
  return (
    <InfoContainer>
        <TextArea>
            <TextTitle>서비스 정보</TextTitle>
            <TextBody>
                어쩌구저쩌구 안심시키는 정보 걍 사이드프로젝트입니다어쩌구저쩌구 안심시키는 정보 걍 사이드프로젝트입니다어쩌구저쩌구 안심시키는 정보 걍 사이드프로젝트입니다어쩌구저쩌구 안심시키는 정보 걍 사이드프로젝트입니다
            </TextBody>
        </TextArea>
    </InfoContainer>
  )
}

export default ServiceInfo;

