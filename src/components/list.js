import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styled from "styled-components";
import { motion } from "framer-motion";
import Button from './button';
import { useNavigate } from "react-router-dom";

import "./list.css"

function List() {

  const [title] = useState("");
  const [content] = useState("");
  const [startDate] = useState("");
  const [location] = useState("");
  const [gpsLat] = useState("");
  const [gpsLng] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const [concertInfo, setConcertInfo] = useState([]);

  const baseURL = process.env.REACT_APP_SERVER_URL;

  //입력할 데이터 정의
  const data = {title,
    content,
    startDate,
    location,
    gpsLat,
    gpsLng,
    imgUrl
  }

  //페이지 로드될 때 실행
  useEffect(() => {
    fetchConcertInfo();
  }, []);

  //콘서트 정보 불러오기
  const fetchConcertInfo = async () => {
    try {
          const response = await axios.get(`${baseURL}/concert`,
          {withCredentials: true});
          console.log(response.data.data);
          //map함수: 각각의 요소에 대해 처리 수행, 그 결과를 모은 새로운 배열 반환 / ...item: item 객체의 모든 속성 새 객체에 복사
          const dataWithEditFlag = response.data.data.map(item => ({ ...item, isEditing: false }));
          setConcertInfo(dataWithEditFlag);
          console.log(dataWithEditFlag)
        } catch (error) {
        console.error('콘서트 정보 불러오기 실패', error);
        }
  }

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/chat");
  }

  return (
    <ListContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 , duration: 0.5 }}
    >
    <div className='list-start'>
      <div className='heading'>실시간 현장 채팅방
        <div className='badge'>D-day</div>
      </div>
    </div>
    <div
    className='list-container'
    onClick={handleClick}
    >
        {concertInfo.length > 0 ? (
          concertInfo.map(info =>
            <div key={info.id} className='list-components'>
                <div className='image-area'>
                  <img src={info.imgUrl} alt={info.title} />
                </div>
                <div className='text-area'>
                <div className='text-title'>{info.title}</div>
                <div className='text-info-area'>
                <div className='text-body'>{info.startDate}</div>
                <div className='text-body'>{info.location}</div>
                    {/* <p>{info.__rooms__.roomId}</p> */}
                </div>
              </div>
              <Button
                variant="transparent"
                color="black"
                icon="nav"
                >
                </Button>
            </div>
          )
        ) : (
          <p className='list-components'>진행 중인 콘서트가 없습니다</p>
        )}
      </div>
      <div className='list-end' />
    </ListContainer>
  ); 
}

export default List;


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
