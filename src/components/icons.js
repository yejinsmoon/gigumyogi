import React from 'react'
import styled from "styled-components";
import {FontSizes} from '../styles/theme';
import { motion } from "framer-motion";

//폰트스타일
const StyledHeading = styled.div`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
`;
//아이콘 메뉴 컨테이너
const IconsContainer = styled(motion.div)`
    box-sizing: border-box;
    align-content: center;
    align-items: center;
    display: flex;
    flex: none;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    overflow: visible;
    padding: 15px 24px;
    position: relative;
    width: 100%;
    max-width: 810px;
    gap: 20px;
    background-color: var(--gigumyogi);
    color: #333D4B;
`;
//아이콘 컨테이너
const IconContainer = styled.div`
  box-sizing: border-box;
  flex-shrink: 0;
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: visible;
  position: relative;
  padding: 0px;
  align-content: center;
  flex-wrap: wrap;
  gap: 4px;
  border-radius: 0px;
`
//아이콘
const Icon = styled.div`
  box-sizing: border-box;
  flex-shrink: 0;
  width: 65px;
  height: 65px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #f9f9f9;
  overflow: visible;
  position: relative;
  align-content: center;
  flex-wrap: nowrap;
  gap: 10px;
  border-radius: 27px;
  background-image: url(${props => props.imgUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 80%;
`
function Icons() {
  return (
    <IconsContainer
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    >
      <IconContainer>

        <Icon imgUrl =
        "https://img1.kakaocdn.net/thumb/R55x55@2x.q100/?fname=https%3A%2F%2Ft1.kakaocdn.net%2Ffriends%2Fnew_store%2Fprod%2Fhome_tab%2Flink-shortcut%2Flink_shortcut_20221213104052_066aa0d8bb4f4e35aefe3258f7090f33.jpg" />
        <StyledHeading size={FontSizes.bodymedium} weight="600">서비스정보</StyledHeading>
      
      </IconContainer>

      <IconContainer>

        <Icon imgUrl =
        "https://img1.kakaocdn.net/thumb/R55x55@2x.q100/?fname=https%3A%2F%2Ft1.kakaocdn.net%2Ffriends%2Fprod%2Fhome_tab%2Flink-shortcut%2Flink_shortcut_20221220143716_8dbfbefd2fe746b4b5bc901303d7bfe6.png" />
        <StyledHeading size={FontSizes.bodymedium} weight="600">문의 및 의견</StyledHeading>
      
      </IconContainer>
    </IconsContainer>
  )
}

export default Icons;
