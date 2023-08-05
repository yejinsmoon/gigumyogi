import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client'

import { AuthContext } from "../context/AuthContext";

import './login.css';
import styled from "styled-components";

import Header from '../components/header';
import TabView from '../components/tabview';
import Chat from './chat';
import Board from './board';

function Room() {
  const { roomId } = useParams();
  const [roomData, setRoomData] = useState(null);
  
  const { isLoggedIn, loggedInUsername } = useContext(AuthContext);
  const username = isLoggedIn ? loggedInUsername : '';

  const baseURL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const socket = io(baseURL);

    // Fetch room data
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(`${baseURL}/concert`);
        const room = response.data.data.find(room => room.roomId === roomId);
        setRoomData(room);
      } catch (error) {
        console.error('방 정보를 가져오는데에 실패했습니다', error);
      }
    };

    // Emit events based on login status
    if (isLoggedIn) {
      socket.emit('joinRoom', { username, roomId });
    } else {
      socket.emit('join', { roomId });
    }

    fetchRoomData();

    return () => {
      // Emit events based on login status
      if (isLoggedIn) {
        socket.emit('leaveRoom', { username, roomId });
      } else {
        socket.emit('leave', { roomId });
      }
    //사용자가 다른 방으로 이동하거나 로그아웃 등의 행동을 할 때
    //이전 방의 소켓 연결이 끊어지고 새로운 연결이 생성      
      socket.disconnect();
    };
  }, [roomId, username, baseURL, isLoggedIn]);  // include isLoggedIn in dependencies

  if (!roomData) {
    return <p>Loading room information...</p>;
  }

  return (
    <RoomContainer>
      <Roombody>
        <InfoContainer>
          <TextArea>
            <TextTitle>
              공연장소 <TextTitle2>{roomData.location}</TextTitle2>
            </TextTitle>
            <TextTitle>
              공연시간 <TextTitle2>{roomData.startDate}</TextTitle2>
            </TextTitle>
            <TextTitle style= {{ color: '#A168FF'}}>
              정보 n개 공유 중
            <TextTitle2>{roomData.participantsCount} 230명 참여중 · n분 전</TextTitle2>
            </TextTitle>
          </TextArea>
        </InfoContainer>
        </Roombody>
        
        <TabView
        style={{ flex: 1 }}
        tabs={[ 
          { name: "전체채팅", content:
          <Chat
          // socket={socket}
          username={username}
          room={roomId}
          />},
          { name: "게시판", content: <Board /> },
        ]}
        />
    </RoomContainer>
  );
};

export default Room;

const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  height: 100vh;
  overflow: hidden;
`;

const Roombody = styled.div`
  flex-direction: column;
  width: 100%;
  max-width: 810px;
`;

const InfoContainer = styled.div`
  box-sizing: border-box;
  margin-top: 45px;
  justify-content: space-between;
  padding: 10px 20px;
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;  
  justify-content: center;
  height: min-content;
  overflow: visible;
  padding: 0;
  position: relative;
  flex: 0 0 100px;
  margin-right: 10px;
`;

const TextTitle = styled.div`
  display: flex;
  line-height: 22px;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: -.5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1 1;
  color: #4E5968;
  margin-top: 10px;
`;

const TextTitle2 = styled.div`
  display: flex;
  line-height: 22px;
  font-weight: 400;
  font-size: 13px;
  letter-spacing: -.5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1 1;
  color: #4E5968;
  margin-left: 12px;
`;
