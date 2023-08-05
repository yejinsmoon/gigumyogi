import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate} from 'react-router-dom';

import { useInView } from 'react-intersection-observer';
import styled from "styled-components";
import { motion } from "framer-motion";
import './popups.css'

import SendIcon from '@mui/icons-material/Send';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { ContactForm } from './form';


function ServiceList() {

//프레이머 모션에 뷰포트 슬라이드인 추가
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const navigate = useNavigate();

  // 팝업 상태 관리를 위한 state
  const [isPopupOpen, setPopupOpen] = useState(false);
  const popupRef = useRef(null);

  const togglePopup = (event) => {
    if (event) event.stopPropagation();
    setPopupOpen(!isPopupOpen);
};

const handleClickOutside = useCallback((event) => {
  if (popupRef.current && !popupRef.current.contains(event.target) && isPopupOpen) {
    setPopupOpen(false);
  }
}, [isPopupOpen, popupRef]);

useEffect(() => {
  if (isPopupOpen) {
    document.addEventListener("click", handleClickOutside);
  } else {
    document.removeEventListener("click", handleClickOutside);
  }
  return () => {
    document.removeEventListener("click", handleClickOutside);
  };
}, [isPopupOpen, handleClickOutside]);

  // const handleClickOutside = (event) => {
  //   if (popupRef.current && !popupRef.current.contains(event.target) && isPopupOpen) {
  //     setPopupOpen(false);
  //   }
  // };
  

  // useEffect(() => {
  //   if (isPopupOpen) {
  //     document.addEventListener("click", handleClickOutside);
  //   } else {
  //     document.removeEventListener("click", handleClickOutside);
  //   }
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, [isPopupOpen]);



  
  return (
    <Container>


      <ListContainer
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      >
        <ListComponents
        onClick={() => navigate("/qna")}>
        {/* <Icon imgUrl =
        "https://img1.kakaocdn.net/thumb/R55x55@2x.q100/?fname=https%3A%2F%2Ft1.kakaocdn.net%2Ffriends%2Fprod%2Fhome_tab%2Flink-shortcut%2Flink_shortcut_20221220143716_8dbfbefd2fe746b4b5bc901303d7bfe6.png" /> */}
        <Heading>서비스 정보</Heading>
        </ListComponents>
      </ListContainer>



      <ListContainer
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ListComponents2
        onClick={(event) => togglePopup(event)}
        >

          <TextArea>
            <Heading>문의 및 의견</Heading>
            <TextTitle> 문의사항 및 의견이 있을 경우  </TextTitle>
          </TextArea>
          <SendIcon style={{ color: '#A168FF' }} />
          {/* <Icon imgUrl =
        "https://img1.kakaocdn.net/thumb/R55x55@2x.q100/?fname=https%3A%2F%2Ft1.kakaocdn.net%2Ffriends%2Fprod%2Fhome_tab%2Flink-shortcut%2Flink_shortcut_20221220143716_8dbfbefd2fe746b4b5bc901303d7bfe6.png" /> */}
        </ListComponents2>
      </ListContainer>

      {/* 팝업 컴포넌트 - 팝업 상태에 따라 on 또는 off 클래스를 적용 */}
      <div ref={popupRef} className={`popups ${isPopupOpen ? 'on' : 'off'}`}>
        <div className='popup-inner'>
          <div className='info-cont'>
          <div className='pop-bg'>
          <div style={{ position: 'absolute', top: '60px', right: '20px', bottom: '60px', left: '20px' }}>
            <div className='info-cont-inner'>
            <CloseRoundedIcon
            className='btn-close'
            onClick={(event) => togglePopup(event)}
            />
              <div className='pop-content'>
                <strong>문의 및 의견</strong>
                <ContactForm />
              </div>
          </div>
          </div>
          </div>
          </div>
        </div>
      </div>



    </Container>
  )
}



export default ServiceList;

const Container = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    min-width: 250px;
    max-width: 810px;
    gap:15px;
`

const ListContainer = styled(motion.div)`
align-content: flex-start;
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: 0px;
    height: 100%; // adjust this to fit your needs
    justify-content: flex-start;
    padding: 0;
    position: relative;
    width: 100%;
`

//개별 리스트 컨테이너
const ListComponents = styled.div`
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
    min-height: 60px;
    max-height: 60px;
    background-color: #ffff;
    color: #333D4B;
    border-radius: 10px;
`

const ListComponents2 = styled.div`
    box-sizing: border-box;
    align-content: center;
    align-items: flex-end; // changed from 'start' to 'flex-end'
    display: flex;
    flex: none;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    overflow: visible;
    padding: 20px 24px;
    position: relative;
    width: 100%;
    height: min-content;
    min-height: 60px;
    background-color: #ffff;
    color: #333D4B;
    border-radius: 10px;
`;


const TextArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;  
    justify-content: center;
    gap: 15px;
    height: min-content;
    overflow: visible;
    padding: 0;
    position: relative;
    margin-right: 15px;
`
// const TextInfoArea = styled.div`
//     flex: 1 1;
//     overflow: hidden;
//     position: relative;
// `
const Heading = styled.div`
    display: flex;
    line-height: 22px;
    font-weight: 700;
    font-size: 17px;
    letter-spacing: -.5px;
    overflow-wrap: break-word; // add this line
    text-overflow: ellipsis;
    flex: 1 1;
    color: #333D4B;
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
    color: #8B95A1;
    white-space: pre-line;
`
// const TextBody = styled.div`
//     display: flex;
//     line-height: 22px;
//     font-weight: 500;
//     font-size: 13px;
//     letter-spacing: -.5px;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     white-space: nowrap;
//     flex: 1 1;
//     color: #8B95A1;
// `

// const Icon = styled.div`
//   box-sizing: border-box;
//   flex-shrink: 0;
//   width: 65px;
//   height: 65px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   padding: 10px;
//   overflow: visible;
//   position: relative;
//   align-content: center;
//   flex-wrap: nowrap;
//   gap: 10px;
//   border-radius: 100px;
//   background-image: url(${props => props.imgUrl});
//   background-position: center;
//   background-repeat: no-repeat;
//   background-size: 80%;
//   margin-right: 15px;
// `
