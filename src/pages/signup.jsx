import React, { useState } from 'react';
import "./login.css"
import "../styles/typography.css"
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Button from '../components/button';
import axios from 'axios';

const Signup = () => {
    const [error, setError] = useState(false);
    const [users, setUsers] = useState("");
    // const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");

    const baseURL = process.env.REACT_APP_SERVER_URL;
  
    const navigate = useNavigate()

    
    const handleSignup = async (e) => {
      e.preventDefault();
      console.log(users,password)
      // console.log(users,nickname,password)
      
      try {
        const response = await axios.post(`${baseURL}/users/signup`,{username:users,password},{withCredentials:true})

        console.log(response)

        //conclict 될 때 에러, 409는 임시
        if (response.status === 409) {
          setError('이미 존재하는 닉네임이에요.');
          return;
        }

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

        <p className='Heading2 margin-large'>간편 회원가입</p>

          <p className='TextBody'>닉네임</p>

          <input
            type="text"
            placeholder="닉네임"
            onChange={(e) => setUsers(e.target.value)}
          />

          {/* <p className='TextBody'>닉네임</p>

          <input
            type="text"
            placeholder="닉네임"
            onChange={(e) => setNickname(e.target.value)}
          /> */}

          <p className='TextBody'>비밀번호</p>

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
          {error && <span>회원가입에 실패하였습니다. 다시 시도해주세요.</span>}


        </form>
      </div>
    );
  };
  
  export default Signup;
