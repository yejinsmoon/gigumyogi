import React, { useState } from 'react';
import "./login.css"
import "../index.css"
import { useNavigate } from 'react-router-dom';
import Button from '../components/button';
import Header from '../components/header';
import axios from 'axios';

const Login = () => {
    const [error, setError] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const baseURL = process.env.REACT_APP_SERVER_URL;
  
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`${baseURL}/users/login`,
        {username,password},
        {withCredentials:true});

        console.log(response)
  
        if (response.data!=='성공') {
          throw new Error('Login failed!');
        }

        navigate("/");
      } catch (error) {
        setError(true);
        console.error('Login error:', error);
      }
    };
  
    return (
      <div className="login">
        <Header />
        <form onSubmit={handleLogin}>
        <p className='Heading2 margin-large'>지금여기 로그인</p>

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
          {error && <span>등록되지 않은 사용자 이름 혹은 비밀번호입니다!</span>}

          <div className="stroke" />

          <p className='TextBody'>
            <a href='signup'>비밀번호 재설정</a>
            <span className='spanClass2'>·</span>
            <a href='signup.html'>계정찾기</a>
          </p>

          <div className="stroke" />


        </form>
        
      </div>
    );
  };
  
export default Login;
