import React from 'react'
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';

//전체 컨테이너(공지)
const NoticeContainer = styled(motion.div)`
    box-sizing: border-box;
    align-content: center;
    align-items: center;
    display: flex;
    flex: none;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    overflow: visible;
    padding: 15px 20px;
    position: relative;
    width: 100%;
    height: min-content;
    min-height: 85px;
    min-width: 250px;
    background-color: #ECECEF;
    color: #333D4B;
    border-radius: 10px;
`
//이미지
const ImageArea = styled.div`
  -shrink: 0;
  position: relative;
  margin-right: 15px;
  overflow: hidden;
  display: block;
  position: relative;
  width: 85px;
  height: 90px;
  border-radius: 5px;
  background-image: url(${props => props.imgUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 50%;
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
    gap: 3px;
`
const TextTitle = styled.div`
    display: flex;
    line-height: 22px;
    font-weight: 500;
    font-size: 15px;
    letter-spacing: -.5px;
    overflow-wrap: break-word; // add this line
    text-overflow: ellipsis;
    flex: 1 1;
    color: #333D4B;
`
const TextBody = styled.div`
    display: flex;
    line-height: 18px;
    font-weight: 500;
    font-size: 13px;
    letter-spacing: -.5px;
    overflow-wrap: break-word;
    text-overflow: ellipsis;
    flex: 1 1;
    color: #6B7684;
`

function Notice() {
//프레이머 모션에 뷰포트 슬라이드인 추가
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  return (
    <NoticeContainer
    ref={ref}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    >
        <ImageArea imgUrl="https://www.seoul.go.kr/res_newseoul/images/seoul/img_seoullogo.png" />
        <TextArea>
            <TextTitle>찾으시는 공연이 없으신가요?</TextTitle>
            <TextBody> 서울시 체육시설관리사업소에서 진행되는 공연만 지원됩니다. 문의 및 제안하실 공연이 있는 경우 이쪽으로</TextBody>
        </TextArea>
    </NoticeContainer>
  )
}

export default Notice;

