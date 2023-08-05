import React, { useEffect, useState, useRef } from 'react';

import { SocketContext } from '../context/socketcontext';
import { AuthContext } from '../context/AuthContext';
import io from 'socket.io-client'

import './chat.css';
import SendIcon from '@mui/icons-material/Send';

import ScrollToBottom from 'react-scroll-to-bottom';


// const SCROLL_BUTTON_STYLE = {
//     position: 'absolute',
//     right: '10px',
//     bottom: '10px',
//     zIndex: '100',
//   };

function Chat({
    username, room
}) {
    //현재 작성 중인 메세지
    const [message, setMessage] = useState("");
    //채팅창에 표시될 모든 메세지 저장
    const [chat, setChat] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io.connect('/');
    //서버에서 message event 수신, 새 메세지 화면에 표시하는 이벤트 핸들러
        socketRef.current.on("message", (message) => {
          receivedMessage(message);
        });
    
    //컴포넌트 언마운트 시 소켓 연결 종료
        return () => socketRef.current.disconnect();
      }, [room]);

    //새 메세지 받으면 호출, 새 메세지를 채팅 목록에 추가
      const receivedMessage = (message) => {
        setChat(oldChat => [...oldChat, message]);
      }

      //메세지 보내는 이벤트 핸들러, 메세지 오브젝트 생성 및 서버 전송, 즉시 메세지 화면 표시
      const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() !== "") {
            const messageObject = {
                room: room,
                author: username,
                content: message,
                sender: "You",
                time: new Date(Date.now()).getHours() + ":" +
                new Date(Date.now()).getMinutes(),
            };
            setMessage("");
            socketRef.current.emit("message", messageObject);
    
            // Add this line to immediately show the message after sending
            setChat([...chat, messageObject]);
        } else {
            // 메세지가 비어 있을 경우의 처리를 작성하실 수 있습니다.
            alert('메세지를 입력하세요');
        }
    };    

      //채팅 목록의 각 메세지 반복하여 화면 표시
      const renderChat = () => {
        let lastAuthor = null;
        return chat.map((message, index) => {
            const consecutive = index > 0 && chat[index - 1].author === message.author;
            const firstInSequence = index > 0 && chat[index - 1].author !== message.author;
            lastAuthor = message.author;
    
            return (
                <div 
                className={`message ${consecutive ? 'consecutive' : 'non-consecutive'} ${firstInSequence ? 'first-in-sequence' : ''}`} 
                id={username === message.author ? "you" : "other"}
                key={index}>
                    <div>
                        <div className='message-content'>
                                <p>{message.content}</p>
                            <div className='message-meta'>
                                <p>{message.time}</p>
                                <p>{message.author}</p>
                            </div>
                        </div>
                    </div>
                </div>
                );
            });
        };
    

      return (
        <div className='chat-window'>
            <div className='chat-header'>
                <p>공연장 반경 1km 이내인 사람만 채팅에 참여 가능해요</p>
            </div>

            <div className='chat-body'>
                <ScrollToBottom className='message-container'>
                    {renderChat()}
                </ScrollToBottom>
            </div>

            <div className='chat-footer'>
                <input
                type='text'
                placeholder='메세지 입력'
                value={message}
                onChange={(event) => {
                    setMessage(event.target.value);
                }}
                />
                <button onClick={sendMessage}><SendIcon style={{ color: '#A168FF' }} /></button>
            </div>
        </div>
    )
}

export default Chat;



{/* 
// function Chat({

    
//     username, room
// }) {

//     const [currentMessage, setCurrentMessage] = useState("");
//     const [messageList, setMessageList] = useState([]);

//     const sendMessage = async() => {
//         if (currentMessage !=="") {
//              const messageData = {
//                 room: room,
//                 author: username,
//                 message: currentMessage,
//                 time: new Date(Date.now()).getHours() + ":" +
//                 new Date(Date.now()).getMinutes(),
//              };
//              socket.emit("send_message", messageData);
//              setMessageList((list) => [...list,messageData]);
//              setCurrentMessage("");
//         }
//     };    

//     useEffect(() => {
//         socket.emit('joinRoom', {username, room}); // Emit the joinRoom event when the component is mounted.

//         socket.on("receive_message",(data) => {
//             setMessageList((list) => [...list,data]);
//         });

//         return () => {
//             socket.emit('leaveRoom', {username, room}); // Emit the leaveRoom event when the component is unmounted.
//         }
//     }, []);

//   return (
// <div className='chat-window'>

//     <div className='chat-header'>
//         <p>공연장 반경 1km 이내인 사람만 채팅에 참여 가능해요</p>
//     </div>

//     <div className='chat-body'>
//         <ScrollToBottom className='message-container'>
//         {messageList.map((messageContent,index) => {
//             return (
//                 <div 
//                 className='message'
//                 id={username === messageContent.author ? "you" : "other"}
//                 key={index}
//                 >
                   <div>
                        <div className='message-content'>
                                <p>{messageContent.message}</p>
                            <div className='message-meta'>
                                <p>{messageContent.time}</p>
                                 <p>{messageContent.author}</p>
                            </div>
                        </div>
                    </div>
                  </div>
//             );
//         })}
//         </ScrollToBottom>
//     </div>

//     <div className='chat-footer'>
//         <input
//         type='text'
//         placeholder='메세지 입력'
//         value={currentMessage}
//         onChange={(event) => {
//             setCurrentMessage(event.target.value);
//         }}
//         />
//         <button onClick={sendMessage}><SendIcon style={{ color: '#A168FF' }} /></button>
//     </div>

// </div>
//   )
// }

// export default Chat; */}
