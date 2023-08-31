// 기본 리액트 라이브러리와 필요한 훅들, 사용자 인증 위한 컨텍스트
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// 스타일 및 아이콘
import '../components/popup.css';
import './chat.css';
import SendIcon from '@mui/icons-material/Send';
import useRoomData from '../hooks/useRoomData';

// 외부 라이브러리
import ScrollToBottom from 'react-scroll-to-bottom';
import axios from 'axios';
import Button from '../components/button';

//두 위도,경도 좌표간의 거리 계산 로직
function haversineDistance(coords1, coords2) {
  function toRad(value) {
      return (value * Math.PI) / 180;
  }
  const R = 6371;  // 지구 반지름 (km)
  const dLat = toRad(coords2.lat - coords1.lat);
  const dLng = toRad(coords2.lng - coords1.lng);
  const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(coords1.lat)) * Math.cos(toRad(coords2.lat)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

//채팅방 로직
function Chat({ socket, username, roomId }) {

  const [currentMessage, setCurrentMessage] = useState("");
const [messages, setMessages] = useState([]);

  //채팅방의 중심 위치 가져옴
  const [centerLocation, setCenterLocation] = useState({ lat: 0, lng: 0 });  // 기본값 설정
  const roomData = useRoomData(roomId);
useEffect(() => {
  if (roomData && roomData.gpsLat && roomData.gpsLng) {
    setCenterLocation({ lat: roomData.gpsLat, lng: roomData.gpsLng });
  }
}, [roomData]);

//사용자의 현재 위치를 얻어와서 isAtLocation 상태를 설정
const [isAtLocation, setIsAtLocation] = useState(false);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const distance = haversineDistance(
          { lat: latitude, lng: longitude },
          centerLocation  // 업데이트된 값 사용
        );
        setIsAtLocation(distance <= 1);  // 거리가 1km 이내인지 판단
      });
    } else {
      console.warn('위치정보가 지원되지 않는 브라우저입니다.');
    }
  }, [centerLocation]);

//chat footer onclick시 로그인 유무에 따른 필요 팝업 로직
  const navigate = useNavigate();
  const { isLoggedIn, loggedInUsername } = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState(false);
  const handleShowPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

//채팅불러오기
    const [currentId, setCurrentId] = useState(0);
    const baseURL = process.env.REACT_APP_SERVER_URL;

    const fetchChats = useCallback(async () => {
      try {
        const fetchURL = `${baseURL}/room/${roomId}/chat`;
        const params = {id:currentId};
        const response = await axios.get(fetchURL, { params });
  
        if (response.data.data.length > 0) {
          setCurrentId(response.data.data[0].id);
          setMessages((prevMessages) => [...prevMessages, ...response.data.data]);
        } else {
          console.log("No messages received");
        }
      } catch (error) {
        console.error('채팅을 불러오는데 실패했습니다.', error);
      }
    }, [roomId, baseURL, currentId]);

    useEffect(() => {
      // 컴포넌트가 마운트될 때 fetchChats를 한 번 실행
      fetchChats();
    }, []);

//무한스크롤
    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        if (scrollTop < scrollHeight * 0.2) {
          fetchChats();
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [fetchChats]);

// id=0 get요청드렸다면  보내 스크롤 탑 값을 주면 다시 재호출한다.
//클라이언트 쪽 채팅 메시지의 상태 및 목록 관리
    
const sendMessage = async() => {
  if (currentMessage.trim() !== "") {
    const now = new Date(Date.now());
  const currentHour = now.getHours();
  const isPM = currentHour >= 12;
  const formattedTime = `${isPM ? "오후" : "오전"} ${isPM ? currentHour - 12 : currentHour}:${now.getMinutes()}`;
    const messageData = {
      roomId: roomId,
      username: username,
      message: currentMessage,
      isAtLocation: isAtLocation,
      // sender: "You",
      time: formattedTime,
    };
    console.log("Sending message:", messageData);  // 이 부분을 추가
    await socket.emit("message", messageData);
    setMessages((messages) =>[...messages, messageData]);
    setCurrentMessage("");
  } else {
    alert('메세지를 입력하세요');
  }
};

useEffect(() => {
//메세지 로컬 상태 업데이트, 소켓을 통해 실시간으로 새로운 메시지를 받으면 messages를 업데이트
  const messageListener = (message) => {
      console.log("Client: Received message from server:", message);
      setMessages((messages) => [...messages, message]);
  }; 
  socket.on("message", messageListener);
  return () => {
    socket.off("message", messageListener);
  }
}, [socket]);





//메세지 화면에 렌더링
const renderChat = () => {
  let lastUsername = null;

  console.log(messages,'뿌려주는부분')

  return messages.map((message, index) => {
    const isYou = loggedInUsername === message.username;
    
    const messageMeta = (
      <>
        <div className='message-content'>
          <p>{message.message}</p>
        </div>
        <div>
          {message.time}
        </div>
      </>
    );

    const messageMetaYou = (
      <>
        <div>
          {message.time}
        </div>
        <div className='message-content'>
          <p>{message.message}</p>
        </div>
      </>
    );

    // 이전 메시지 작성자와 현재 메시지 작성자를 비교합니다.
    const showAuthor = lastUsername !== message.username;
    lastUsername = message.username; // 마지막으로 메시지를 작성한 사용자의 이름을 업데이트합니다.

    return (
      <div className={`message ${isYou ? "you" : "other"}`} key={index}>
        <div className='message-meta'>
          { showAuthor && <p id="author">{message.username}</p> }
          {message.isAtLocation ? <div className='badge' style={{color: "#A168FF", backgroundColor: "#ECE1FF"}}>현장</div> : ''}
        </div>
        <div className='message-meta'>
          {isYou ? messageMetaYou : messageMeta}
        </div>
      </div>
    );
  });
};

useEffect(() => {
  const closeOnOutsideClick = (event) => {
    const popupInner = document.querySelector(".chat-footer");

    // 클릭 이벤트가 팝업 내부에서 발생하지 않았고, 팝업이 현재 표시되는 경우 팝업을 닫습니다.
    if (showPopup && !popupInner.contains(event.target)) {
      handleClosePopup();
    }
  };
  document.addEventListener("click", closeOnOutsideClick);
  // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
  return () => {
    document.removeEventListener("click", closeOnOutsideClick);
  };
}, [showPopup]);


//본 페이지 화면
  return (
    <div className='chat-window'>
      <div className='chat-header'>
        <p>공연장 반경 1km 이내인 사용자는 채팅에 표시돼요</p>
      </div>

      <div className='chat-body' style={{ padding: '0 0 0 20px' }}>
        <ScrollToBottom className='message-container' >
          {renderChat()}
        </ScrollToBottom>
      </div>

      <div className='chat-footer' onClick={!isLoggedIn ? handleShowPopup : null}>
      <input
      type='text'
      maxLength="300"
      placeholder={isLoggedIn ? '메세지 입력' : '메세지를 입력하려면 로그인하세요'}
      value={currentMessage}
      disabled={!isLoggedIn}
      onChange={(e) => {
    if (e.target.value.length > 300) {
      alert('메세지는 한 번에 300자를 초과하지 못합니다.');
      setCurrentMessage(e.target.value.substring(0, 300));
    } else {
      setCurrentMessage(e.target.value);
    }
    console.log("Current input value:", e.target.value);
  }}
/>

<button 
  onClick={() => {
      if(isLoggedIn) {
          sendMessage();
      } else {
          handleShowPopup();
      }
  }}
>
  <SendIcon style={{ color: '#A168FF' }} />
</button>
        </div>


      <div className={`g__popups pop-tnc ${showPopup ? 'on' : ''}`}>
        <div className="g__popup-inner">
          <div className="g__info-cont">
            <div className="g__info-cont-inner">
              <button className="g__btn-close" onClick={handleClosePopup}></button>
              <div className="g__pop-content info_cont">
                <div className='row'>
                  <p className='heading'>로그인만 하면 채팅에 참여할 수 있어요</p>
                </div>
                <div className='row'> 
                <Button
        variant={"primaryline"}
        color={"primaryline"}
        size={"lg"}
        type="submit"
        onClick={() => navigate("/users/login")}>로그인하기</Button>

<Button
        variant={"primary"}
        color={"white"}
        size={"lg"}
        type="submit"
        onClick={() => navigate("/users/signup")}
        >회원가입하기</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat;

