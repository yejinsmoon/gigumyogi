import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import "./login.css"
import Button from '../components/button';
import axios from 'axios';

import { AuthContext } from '../context/AuthContext';

const Login = () => {
  //서버 요청
    const [error, setError] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const baseURL = process.env.REACT_APP_SERVER_URL;
  
    const navigate = useNavigate();

    const { setIsLoggedIn, setLoggedInUsername } = useContext(AuthContext);
    
  
    const handleLogin = async (e) => {
      e.preventDefault();

      try {
        const response = await axios.post(`${baseURL}/users/login`,
        {username,password},
        {withCredentials:true});
  
        if (response.data.success!==true) {
          throw new Error('Login failed!');
        }

        setIsLoggedIn(true);
        setLoggedInUsername(username);  // 로그인한 사용자의 이름 설정

        navigate("/");

      } catch (error) {
        setError(true);
        console.error('Login error:', error);
      }
    };
  

//페이지
    return (
      <div className="login">
        <form onSubmit={handleLogin}>
        <p className='headinglarge'>지금여기 로그인</p>
        <div className='textarea' >
          <p className='textbody'>계정이 없으신가요?</p>
          <a className='textbody' href={`${baseURL}/users/signup`}><b>회원가입</b></a>
        </div>

          <input
            type="text"
            placeholder="닉네임"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant={"primary"}
            color={"white"}
            size={"md"}
            type="submit">로그인</Button>
          {error && <span className='warning'>등록되지 않은 닉네임 혹은 비밀번호입니다!</span>}
          <div className="stroke" />
          <div className='textarea'>
            <a className='textbody' href='signup'>비밀번호 재설정</a>
            <span className='textbody'>·</span>
            <a className='textbody' href='signup.html'>계정찾기</a>
          </div>

          <div className="stroke" />


        </form>
        
      </div>
    );
  };
  
export default Login;
