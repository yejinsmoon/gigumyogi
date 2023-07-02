import React, { useState } from 'react';
import "./login.css"
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Button from '../components/button';
import axios from 'axios';

const Signup = () => {
    const [error, setError] = useState(false);
    const [users, setUsers] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
  
    const navigate = useNavigate()
  
    const handleSignup = async (e) => {
      e.preventDefault();
      console.log(users,nickname,password)
  
      try {
        const response = await fetch("https://mo-inda.shop/users/signup", {
          method: 'POST',
          // credentials: "include",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username:users,
            nickname,
            password
          })
        });

        console.log(response)

        // if (!response.ok) {
        //   throw new Error('Signup failed');
        // }

        const data = response;
        console.log(data);
        navigate("/");
      } catch (error) {
        console.error('Error:', error);
        setError(true);
      }
    };
  
    return (
      <div className="login">
        <Header />
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="이메일"
            onChange={(e) => setUsers(e.target.value)}
          />
          <input
            type="text"
            placeholder="닉네임"
            onChange={(e) => setNickname(e.target.value)}
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
            type="submit">가입하기</Button>
          {error && <span>회원가입에 실패하였습니다. 다시 시도해주세요!</span>}
        </form>
      </div>
    );
  };
  
  export default Signup;
