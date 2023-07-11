import styled from "styled-components";
import {FontSizes} from '../styles/theme';
import Button from './button';
import LogoutButton from './logoutbutton';
import { useNavigate } from 'react-router-dom';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import React, { useState } from 'react';

const StyledHeading = styled.div`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color || "inherit"};
`;


function Header() {

  const navigate = useNavigate();

  const handleLoginClick = () => {
    console.log("Login Button clicked");
    navigate("/users/login");
    setIsLoggedIn(true);
  }

  const handleSignupClick = () => {
    console.log("Signup Button clicked");
    navigate("/users/signup");
    setIsLoggedIn(false);
  }
  
  return (
    <HeaderExpand>
    <HeaderContainer>
      {/* Header left */}
      <HeaderLeft>
        <StyledHeading
        onClick={() => navigate("/")}
        size={FontSizes.Headingmedium}
        weight="700">지금여기</StyledHeading>
      </HeaderLeft>

      {/* Header right */}
      <HeaderRight>
        <Button
          variant={"transparent"}
          color={"blue"}
          size={"s"}
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            console.log("Share Button clicked")
          }}
        >
          링크복사
          <FileCopyOutlinedIcon />
        </Button>
        <Button
        variant={"primary"}
        color={"white"}
        onClick={handleSignupClick}>
          회원가입
        </Button>
        <Button
        variant={"transparent"}
        color={"black"}
        size={"s"}
        onClick={handleLoginClick}>
        로그인
        </Button>
        <LogoutButton />
      </HeaderRight>
    </HeaderContainer>
    </HeaderExpand>
  )
}

export default Header;

const HeaderExpand = styled.div`
    width:100%;
    background-color: #fff;
    position: fixed;
    top: 0; 
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    
`

const HeaderContainer = styled.div`
    height: min-content;
    box-sizing: border-box;
    align-items: center;
    display: flex;
    width: 100%;
    justify-content: space-between;
    overflow: visible;
    padding: 16px 16px 16px 24px;
    height: 52px;
    max-width: 810px;
    color: #333D4B;
    min-width: 250px;
`;

const HeaderLeft = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: row;
  overflow: hidden;
  gap: 5px;
  flex-wrap: nowrap;
`;

const HeaderRight = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  gap: 5px;
  flex-wrap: nowrap;
`;