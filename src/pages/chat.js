// 기본 리액트 라이브러리와 필요한 훅들, 사용자 인증 위한 컨텍스트
import React, { useEffect, useState, useCallback, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// 스타일 및 아이콘
import '../components/popup.css';
import './chat.css';
import SendIcon from '@mui/icons-material/Send';
import useRoomData from '../hooks/useRoomData';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// 외부 라이브러리
import ScrollToBottom, { useAtTop, useAtEnd, useScrollToBottom } from 'react-scroll-to-bottom';
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
    console.log("Center Location updated");
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

  const chatBodyRef = useRef(null);
  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };  

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

//채팅불러오기
    const [currentId, setCurrentId] = useState(0);
    const baseURL = process.env.REACT_APP_SERVER_URL;
    const [isLoading, setIsLoading] = useState(false);
    const [disableLoadMore, setDisableLoadMore] = useState(false);

    const fetchChats = useCallback(async () => {
      console.log('Fetching chats');
      try {
        if (isLoading || disableLoadMore) return ;
        setIsLoading(true);
        const fetchURL = `${baseURL}/room/${roomId}/chat`;
        const params = {id: currentId};
        const response = await axios.get(fetchURL, { params });
    
        if (response.data.data.length > 0) {
          setCurrentId(response.data.data[0].id);
          setMessages(prevMessages => [...response.data.data, ...prevMessages]);
        }
        else {
          setIsLoading(false);
        console.log('Fetched chats:', response.data.data);
        setDisableLoadMore(true);
        }
      } catch (error) {
        console.error('Failed to fetch chats:', error);
        setIsLoading(false);
      }
    }, [roomId, baseURL, currentId, isLoading]);
    
    useEffect(() => {
      fetchChats();
    }, []);

//무한스크롤

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

useEffect(() => {
  function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log('Element is in the viewport!');
        fetchChats(); // Element가 뷰포트에 들어왔을 때 fetchChats 호출
      } else {
        console.log('Element is out of the viewport.');
      }
    });
  }
  
  const observer = new IntersectionObserver(handleIntersection, options);
  const target = document.querySelector('.target-element'); // 관찰할 대상

  if (target) {
    observer.observe(target);
  }

  // 컴포넌트 언마운트 시 observer 해제
  return () => {
    if (target) {
      observer.unobserve(target);
    }
  };
}, [fetchChats]);



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
    await socket.emit("message", messageData);
    console.log('Setting messages after sending', [...messages, messageData]);  // 이 부분 추가
    
    setMessages((messages) =>[...messages, messageData]);
    setCurrentMessage("");
  } else {
    alert('메세지를 입력하세요');
  }
};

// useEffect(() => {
//   const messageListener = (message) => {
//     console.log('Setting messages after receiving', [...messages, message]);  // 이 부분 추가
//     setMessages((messages) => [...messages, message]);
//   }; 
//   socket.on("message", messageListener);
  
//   // Cleanup
//   return () => {
//     socket.off("message", messageListener);
//   };
// }, [socket]);



//메세지 화면에 렌더링
const renderChat = () => {
  let lastUsername = null;
//각 메세지는 message객체에 저장, messages배열 순회하면서
//각 메시지(message)와 해당 메시지의 인덱스(index)를 인자로 받아 작업을 수행
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

      <div className='chat-body' style={{ padding: '0 0 0 20px' }} ref={chatBodyRef}>
      {/* 이 부분이 중요: 스크롤이 이 div에 도달하면 이전 메시지를 불러옴 */}
      <div className="target-element" />
        {renderChat()}
      </div>
      <button className="scroll-to-bottom-button" onClick={scrollToBottom}>
        <ArrowDownwardIcon />
      </button>


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
    // console.log("Current input value:", e.target.value);
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

