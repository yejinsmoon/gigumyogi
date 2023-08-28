import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

import { AuthContext } from "../context/AuthContext";
import useRoomData from '../hooks/useRoomData';

import './login.css';
import styled from "styled-components";

import TabView from '../components/tabview';
import Chat from './chat';
import Board from './board';

function Room() {
  const { roomId } = useParams();
  const roomData = useRoomData(roomId);
  
  const { isLoggedIn, loggedInUsername } = useContext(AuthContext);
  const username = isLoggedIn ? loggedInUsername : '';

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io.connect(process.env.REACT_APP_SERVER_URL, {
      withCredentials: true,
      transports: ["websocket"]
    });

    newSocket.on('connect_error', (err) => {
      console.error("Connection Error:", err);
    });
  
    if (isLoggedIn) {
      newSocket.emit('joinRoom', {roomId});
    } else {
      newSocket.emit('join', {roomId});
    }
    // console.log({roomId}, 'roomId');
  
    setSocket(newSocket);
  
    return () => {
      if (isLoggedIn) {
        newSocket.emit('leaveRoom', {roomId});
      } else {
        newSocket.emit('leave', {roomId});
      }
      newSocket.disconnect();
      console.log("Disconnected from the server!");
    };
  }, [roomId, isLoggedIn]);
  


  if (!roomData) {
    return <p>방 정보를 불러오고 있습니다</p>;
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
        socket={socket}
        username={username}
        roomId={roomId}
        />},
        { name: "게시판", content:
        <Board
        roomId={roomId}
        /> },
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
