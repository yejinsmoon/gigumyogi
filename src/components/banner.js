import React from 'react'
import styled, {keyframes} from "styled-components";
import { motion } from "framer-motion";

//배너 컨테이너
const BannerContainer = styled(motion.div)`
    box-sizing: border-box;
    align-content: center;
    align-items: start;
    display: flex;
    flex: none;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    overflow: hidden;
    padding: 24px 0px 24px 24px;
    position: relative;
    width: 100%;
    min-width: 250px;
    height: 200px;
    background-color: #4385F7;
    background-image: linear-gradient(150deg, #4385F7 0%, #4385F7 24%, #BCA3F1 72.99%, #BCA3F1 87.49%);
    color: #333D4B;
    border-radius: 18px;
    
`
//배너 안 텍스트 컨테이너
const TextArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;  
    justify-content: center;
    gap: 10px;
    height: min-content;
    overflow: visible;
    padding: 0;
    position: relative;
    flex: 100px;
    margin-right: 10px;
`
  //타이틀 텍스트
const Heading = styled.div`
    display: flex;
    line-height: 22px;
    font-weight: 600;
    font-size: 17px;
    letter-spacing: -.5px;
    overflow-wrap: break-word; // add this line
    text-overflow: ellipsis;
    flex: 1 1;
    color: #fff;
`
  //타이틀 텍스트 라지
const HeadingLarge = styled.div`
    display: flex;
    line-height: 30px;
    font-weight: 600;
    font-size: 26px;
    letter-spacing: -.5px;
    overflow-wrap: break-word;
    text-overflow: ellipsis;
    flex: 1 1;
    color: #fff;
`
  //본문 텍스트
const TextTitle = styled.div`
    display: flex;
    line-height: 22px;
    font-weight: 500;
    font-size: 15px;
    letter-spacing: -.5px;
    overflow-wrap: break-word;
    text-overflow: ellipsis;
    flex: 1 1;
    color: #fff;
`
//캐릭터 이미지 컨테이너
const ImageContainer = styled.div`
box-sizing: border-box; 
align-content: center;
justify-content: center;
    align-items: center;
  position: relative;
  overflow: hidden;
  display: block;
  position: relative;
  width: 35%;
  height: 100%;
  border-radius: 5px;
`
  //캐릭터 이미지
const ImageArea = styled.div`
    position: relative;
    overflow: hidden;
    display: block;
    height: 100%;  
    border-radius: 5px;
    background-image: url(${props => props.imgUrl});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 60%;
`
  //반짝이 애니메이션 코드
const scaleAni = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
`;
  //반짝이 1
const AnimatedImage = styled.div`
    position: absolute;
    overflow: hidden;
    display: block;
    top: 20px;
    height: 25px;  
    width: 25px;
    animation: ${scaleAni} 1s steps(2) infinite;
    border-radius: 5px;
    background-image: url(${props => props.imgUrl});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`
  //반짝이 2
const AnimatedImage2 = styled.div`
    position: absolute;
    overflow: hidden;
    display: block;
    bottom: 20px;
    right: 15px;
    height: 20px;  
    width: 20px;
    animation: ${scaleAni} 0.6s steps(2) infinite;
    border-radius: 5px;
    background-image: url(${props => props.imgUrl});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`

function Banner() {
  return (
    <BannerContainer
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    >
        <TextArea>
            <Heading>서비스 소개</Heading>
            <HeadingLarge>지금 거기 어때요?</HeadingLarge>
            <TextTitle>공연장 1km 이내인 사람만 참여 가능한 익명 채팅 서비스입니다</TextTitle>
        </TextArea>

        <ImageContainer>
          <AnimatedImage imgUrl= "https://og.kakaobank.io/view/47840d13-6436-4234-af18-132151fbd4b6"/>
          <ImageArea imgUrl = "https://og.kakaobank.io/view/f5a149fe-732f-4dc8-8de3-a9008163061d" />
          <AnimatedImage2 imgUrl= "https://og.kakaobank.io/view/6ba1a1bd-3436-4d2f-a57c-2a5f46b16fec" /> 
        </ImageContainer>

    </BannerContainer>
  )
}

export default Banner

