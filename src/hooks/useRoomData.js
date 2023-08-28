// hooks/useRoomData.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useRoomData = (roomId) => {
  const [roomData, setRoomData] = useState(null);
  const baseURL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(`${baseURL}/concert`);
        const room = response.data.data.find(room => room.roomId === roomId);
        setRoomData(room);

      } catch (error) {
        console.error('방 정보를 가져오는데에 실패했습니다', error);
      }
    };

    fetchRoomData();
  }, [roomId, baseURL]);

  return roomData;
}

export default useRoomData;
