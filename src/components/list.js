import React from 'react'
import styled from "styled-components";
import { motion } from "framer-motion";
import Button from './button';
import { useNavigate } from "react-router-dom";


//전체 리스트 컨테이너(실시간 현장 채팅방)
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
    min-width: 250px;
    max-width: 810px;
`
//컨테이너 시작
const ListStart = styled.div`
    box-sizing: border-box;
    align-content: center;
    align-items: center;
    background-color: #fff;
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
    display: flex;
    flex: none;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 0px;
    height: 55px;
    justify-content: flex-start;
    overflow: hidden;
    padding: 15px 24px 0;
    position: relative;
    width: 100%;
`
//컨테이너 마지막
const ListEnd = styled.div`
    box-sizing: border-box;
    align-content: center;
    align-items: center;
    background-color: #fff;
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 18px;
    display: flex;
    flex: none;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 0px;
    height: 15px;
    justify-content: flex-start;
    overflow: hidden;
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
    padding: 16px 0px 16px 24px;
    position: relative;
    width: 100%;
    height: min-content;
    min-height: 115px;
    background-color: #ffff;
    color: #333D4B;
`
//텍스트 스타일
const ImageArea = styled.div`
  flex-shrink: 0;
  position: relative;
  margin-right: 15px;
  overflow: hidden;
  display: block;
  position: relative;
  width: 85px;
  height: 90px;
  background-color: #ebebeb;
  border-radius: 5px;
  background-image: url(${props => props.imgUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`
const TextArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;  
    justify-content: center;
    gap: 3px;
    height: min-content;
    overflow: visible;
    padding: 0;
    position: relative;
    flex: 100px;
    margin-right: 15px;
`
const TextInfoArea = styled.div`
    flex: 1 1;
    overflow: hidden;
    position: relative;
`
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
    color: #333D4B;
    white-space: pre-line;
`
const TextBody = styled.div`
    display: flex;
    line-height: 22px;
    font-weight: 500;
    font-size: 13px;
    letter-spacing: -.5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1 1;
    color: #6B7684;
`


function List() {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin/create");
  }

  return (
      <ListContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 , duration: 0.5 }}
      >

        <ListStart>
          {/* left */}
          <Heading>실시간 현장 채팅방</Heading>

          {/* right */}
          <Button
          variant="primary"
          onClick={() => {
            handleClick();
            console.log("Create List Button clicked");
          }}
          >
          새 콘서트 등록
          </Button>
        </ListStart>

        <ListComponents>

            <ImageArea imgUrl="https://image.ytn.co.kr/general/jpg/2023/0420/202304200938468116_d.jpg"/>
            <TextArea>
              <TextTitle> 현대카드 슈퍼콘서트 27 브루노 마스 </TextTitle>
              <TextInfoArea>
                <TextBody> 공연 날짜</TextBody>
                <TextBody> 공연 장소</TextBody>
              </TextInfoArea>
            </TextArea>

            <Button
            variant="transparent"
            color="black"
            icon="nav"
            onClick={() => console.log("List Button clicked")}
            >
            </Button>

        </ListComponents>
        
        <ListEnd />
      </ListContainer>
  )
}

export default List;