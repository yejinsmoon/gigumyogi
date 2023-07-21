import styled from "styled-components";
import {FontSizes} from '../styles/theme';

import Button from './button';
import LogoutButton from './logoutbutton';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import CloseIcon from '@mui/icons-material/Close';

import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";

import "./header.css";

const StyledHeading = styled.div`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color || "inherit"};
`;

function Header() {
  const { isLoggedIn, loggedInUsername } = useContext(AuthContext);

  const [isPopupVisible, setPopupVisibility] = useState(true);

  const [hasUserClosedPopup, setHasUserClosedPopup] = useState(false);
  const closePopup = () => {
    setPopupVisibility(false);
    setHasUserClosedPopup(true);
  }

  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  const shouldShowPopup = isLandingPage && isPopupVisible && !hasUserClosedPopup;

  const navigate = useNavigate();

  const handleLoginClick = () => {
    console.log("Login Button clicked");
    navigate("/users/login");
  }

  const handleSignupClick = () => {
    console.log("Signup Button clicked");
    navigate("/users/signup");
  }
  
  return (
    <div className="headerexpand">
    <div className="headercontainer">
      {/* Header left */}
      <div className="headerleft">
        <StyledHeading
        onClick={() => navigate("/")}
        size={FontSizes.Headingmedium}
        weight="700">지금여기</StyledHeading>
      </div>

      {/* Header right */}
      <div className="headerright">
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
        {isLoggedIn ? (  // Conditional rendering based on isLoggedIn state
          <>
          <p className="texttitle">{`${loggedInUsername}님`}</p>
          <LogoutButton />
          </>
        ) : (
          <>
          <div className="modal">
            <Button
            variant={"primary"}
            color={"white"}
            onClick={handleSignupClick}>
              회원가입
            </Button>
            {shouldShowPopup && (
            <div className="_popup">
              닉네임과 비밀번호만으로 가입할 수 있어요!
              <CloseIcon
              fontSize="small"
              onClick={closePopup} />
            </div>
            )}
          </div>
            <Button
            variant={"transparent"}
            color={"black"}
            size={"s"}
            onClick={handleLoginClick}>
            로그인
            </Button>
          </>
        )}
      </div>
    </div>
    </div>
  )
}

export default Header;