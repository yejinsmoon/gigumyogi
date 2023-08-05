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
// const TextTitle = styled.div`
//     display: flex;
//     line-height: 30px;
//     font-weight: 600;
//     font-size: 24px;
//     letter-spacing: -.5px;
//     overflow-wrap: break-word; // add this line
//     text-overflow: ellipsis;
//     flex: 1 1;
//     color: #fff;
// `
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
            <TextBody>
                Contact 서비스 이용약관
통합 금융정보 서비스 약관
마이데이터 서비스 이용약관
이용자의 권리 및 유의사항
개인정보 처리방침
채용팀 개인정보 처리방침
영상정보처리기기 운영 관리 방침
위치기반서비스 이용약관
가맹점 고지사항
토스 전자서명인증업무준칙
토스 전자인증서비스 약관
금융소비자보호
고객센터
전화: 1599-4905 (24시간 연중무휴)
이메일(고객전용): support@toss.im
            </TextBody>
        </TextArea>
    </InfoContainer>
  )
}

export default Footer;

