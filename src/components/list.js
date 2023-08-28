import React, { useEffect, useState, useCallback, useContext } from 'react';
import axios from 'axios';

import { AuthContext } from '../context/AuthContext';
import { SocketContext } from '../context/socketcontext';

import styled from "styled-components";
import { color, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import "./list.css"

function List() {

const [upcomingConcerts, setUpcomingConcerts] = useState([]);
const [recentConcerts, setRecentConcerts] = useState([]);

const auth = useContext(AuthContext);
const socket = useContext(SocketContext);
  
const fetchConcertInfo = useCallback(async () => {
  const baseURL = process.env.REACT_APP_SERVER_URL;
  try {
    const response = await axios.get(`${baseURL}/concert`,
    {withCredentials: true});
    // console.log(response.data.data);

    const upcoming = [];
    const recent = [];
    const now = new Date();
    now.setHours(0, 0, 0, 0);  // set the time to the start of the day

    response.data.data.forEach(concert => {
      const concertDate = new Date(concert.startDate);
      concertDate.setHours(0, 0, 0, 0);  // set the time to the start of the day

      // 현재 날짜, 미래 날짜로 등록된 정보만 취급 
      if (concertDate >= now) {
        // 콘서트 날짜 정보가 당일일 경우
        if (concertDate.getTime() === now.getTime()) {  
          recent.push(concert);
        } 
        // 콘서트 날짜 정보가 미래일 경우
        else {  
          upcoming.push(concert);
        }
      }
      // Else if the concert date is in the past, ignore
    });

    setUpcomingConcerts(upcoming);
    setRecentConcerts(recent);

  } catch (error) {
    console.error('콘서트 정보 불러오기 실패', error);
  }
}, []);

useEffect(() => {
  fetchConcertInfo();
}, [fetchConcertInfo]);


  const navigate = useNavigate();

  return (

    // 당일 콘서트
    <ListContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 , duration: 0.5 }}
    >
    <div className='list-start'>
  <div className='heading'>실시간 현장 채팅방
    <div
    className='badge'
    style={{color: "#FF004D", backgroundColor: "#FFE5ED"}}>
      D-day
    </div>
  </div>
</div>
<div className='list-container'>
{recentConcerts.length > 0 ? (
  recentConcerts.map(info =>
    <div key={info.id}
        className='list-components'
        onClick={() => {
          if(auth.isLoggedIn){
            socket.emit("joinRoom", info.roomId);
          }else{
            socket.emit("join", info.roomId);
          }
          navigate(`/room/${info.roomId}`);
        }}>
            <div className='image-area'>
              {/* <img src={info.imgUrl} alt={info.title} /> */}
              <img src="http://tkfile.yes24.com/upload2/PerfBlog/202308/20230801/20230801-46706.jpg" alt="2023 NCT CONCERT - NCT NATION：To The World" border="0"></img>
            </div>
            <div className='text-area'>
            <div className='text-title'>{info.title}</div>
            <div className='text-info-area'>
            <div className='text-body' style={{ fontWeight: 600, paddingRight: '5px', color:'#4E5968'}}>
              공연날짜
              <div className='text-body'>{info.startDate}</div>
            </div>
            <div className='text-body' style={{ fontWeight: 600, paddingRight: '5px', color:'#4E5968'}}>
              공연장소
              <div className='text-body' style={{ color: '#A168FF' }}>{info.location}</div>
            </div>
            </div>
          </div>
        </div>
      )
    ) : (
      <p className='list-components'>등록된 콘서트 정보가 없습니다</p>
    )}
      </div>
      {/* <div className='list-end' /> */}

      <div className='list-middle'>
  <div className='heading'>오픈 예정인 현장 채팅방
  </div>
</div>
<div className='list-container'>
{upcomingConcerts.length > 0 ? (
  upcomingConcerts.map(info =>
    <div key={info.id}
        className='list-components'
        onClick={() => {
          if(auth.isLoggedIn){
            socket.emit("joinRoom", info.roomId);
          }else{ 
            socket.emit("join", info.roomId);
          }
          navigate(`/room/${info.roomId}`);
        }}>
            <div className='image-area'>
              {/* <img src={info.imgUrl} alt={info.title} /> */}
              <img src="http://tkfile.yes24.com/upload2/PerfBlog/202308/20230801/20230801-46706.jpg" alt="2023 NCT CONCERT - NCT NATION：To The World" border="0"></img>
            </div>
            <div className='text-area'>
            <div className='text-title'>{info.title}</div>
            <div className='text-info-area'>
            <div className='text-body' style={{ fontWeight: 500, paddingRight: '5px', color:'#4E5968'}}>
              공연날짜
              <div className='text-body'>{info.startDate}</div>
            </div>
            <div className='text-body' style={{ fontWeight: 600, paddingRight: '5px', color:'#4E5968'}}>
              공연장소
              <div className='text-body' style={{ color: '#A168FF' }}>{info.location}</div>
            </div>
            </div>
          </div>
        </div>
      )
    ) : (
      <p className='list-components'>콘서트 정보를 불러오고 있습니다</p>
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