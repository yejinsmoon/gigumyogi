import React, { useState } from 'react';
import "./login.css"
import { useNavigate } from 'react-router-dom';
import Button from '../components/button';
import Header from '../components/header';

const Login = () => {
    const [error, setError] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('https://mo-inda.shop/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            password: password
          })
        });

        console.log(response)
  
        if (response.ok!==true) {
          throw new Error('Login failed!');
        }
  
        // const user = await response.json();
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
          <input
            type="text"
            placeholder="이메일"
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
        </form>
      </div>
    );
  };
  
export default Login;
