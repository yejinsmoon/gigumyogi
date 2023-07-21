import React, { useState, useContext } from 'react';
import ButtonComponent from './button';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'

const baseURL = process.env.REACT_APP_SERVER_URL;

function LogoutButton() {

  const { setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      // 로그아웃 요청 보내기
      const response = 
      await axios.post(`${baseURL}/users/logout`);
      // 로그아웃 성공 후 처리할 작업 (예: 상태 업데이트, 리다이렉트 등)
      console.log('로그아웃 성공',response.data.message);
      setIsLoggedIn(false);
      return response

    } catch (error) {
      // 로그아웃 실패 시 처리할 작업
      console.error('로그아웃 실패', error);
    }
  };

  return (
    <ButtonComponent
    onClick={handleLogout}
    variant="primary"
    color="white">
      로그아웃
    </ButtonComponent>
  );
}

export default LogoutButton;
