import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import useRoomData from '../hooks/useRoomData';

import './header.css';
import BackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Button from './button';
import LogoutButton from './logoutbutton';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';


import styled from "styled-components";

const StyledHeading = styled.div`
  font-size: ${(props) => props.size}rem;
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color || "inherit"};
`;

const Header = ({
  title,
  leftIcon,
  rightIcon,
  font,
  bgColor,
  leftAction,
  rightAction,
  isLoggedIn,
  loggedInUsername,
  handleLoginClick,
  handleSignupClick,
  shouldShowPopup,
  closePopup
}) => {
  return (
    <div className='headerexpand' style={{ backgroundColor: bgColor }}>
      <div className="headercontainer">
        <div className="headerleft" onClick={leftAction}>{leftIcon}</div>
        <div className="headertitle" style={{ fontStyle: font }}>{title}</div>
        <div className="headerright">
          {isLoggedIn ? (
            <>
            <Button
          variant={"transparent"}
          color={"primary"}
          size={"s"}
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            console.log("Share Button clicked")
          }}
        >
          링크복사
          <FileCopyOutlinedIcon />
        </Button>
              <p className="texttitle">{`${loggedInUsername}님`}</p>
              <LogoutButton />
            </>
          ) : (
            <>
            <Button
          variant={"transparent"}
          color={"primary"}
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
                variant={"transparent"}
                color={"black"}
                size={"s"}
                onClick={handleLoginClick}
              >
                로그인
              </Button>
              <Button
                variant={"primary"}
                color={"white"}
                onClick={handleSignupClick}
              >
                회원가입
              </Button>
              {shouldShowPopup && (
                <div className="_popup">
                  닉네임과 비밀번호만으로 가입할 수 있어요!
                  <CloseIcon fontSize="small" onClick={closePopup} />
                </div>
              )}
            </>
          )}
          <div onClick={rightAction}>{rightIcon}</div>
        </div>
      </div>
    </div>
  );
};

const HeaderController = ({}) => {
  const { isLoggedIn, loggedInUsername } = useContext(AuthContext);
  const [isPopupVisible, setPopupVisibility] = useState(true);
  const [hasUserClosedPopup, setHasUserClosedPopup] = useState(false);
  const location = useLocation();

  const navigate = useNavigate(); 

  const match = location.pathname.match(/\/room\/(\w+)/);
  const roomId = match ? match[1] : null;
  
  const roomData = useRoomData(roomId);

  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  }

  const handleLoginClick = () => {
    navigate("/users/login");
  }

  const handleSignupClick = () => {
    navigate("/users/signup");
  }

  const closePopup = () => {
    setPopupVisibility(false);
    setHasUserClosedPopup(true);
  }

  const shouldShowPopup = location.pathname === "/" && isPopupVisible && !hasUserClosedPopup;

  const headerConfig = {
    '/': {
      leftIcon:
      <StyledHeading
      onClick={() => navigate("/")}
      size={1.2}
      weight="600">지금여기</StyledHeading>,
      // rightIcon: <ShareIcon />,
      bgColor: '#F5F6F7',
      leftAction: () => navigate('/'),
      isLoggedIn,
      loggedInUsername,
      handleLoginClick,
      handleSignupClick,
      shouldShowPopup,
      closePopup
    },
    '/users/login': {
      leftIcon:
      <>
    <span onClick={goBack}><BackIcon /></span>
    <span onClick={() => navigate("/")}><HomeOutlinedIcon /></span>
      </>
      ,
      // rightIcon: <InfoIcon />,
      // font: 'italic',
      bgColor: 'white',
      // leftAction: goBack,
      isLoggedIn,
      loggedInUsername,
      handleLoginClick,
      handleSignupClick,
      shouldShowPopup,
      closePopup
    },
    '/users/signup': {
      leftIcon:
      <>
    <span onClick={goBack}><BackIcon /></span>
    <span onClick={() => navigate("/")}><HomeOutlinedIcon /></span>
      </>,
      bgColor: 'white',
      // leftAction: goBack,
      isLoggedIn,
      loggedInUsername,
      handleLoginClick,
      handleSignupClick,
      shouldShowPopup,
      closePopup
    },
    '/room/:roomId': {
      // title: "채팅방",
      leftIcon:
      (
        <>
          <span className='headerleft' onClick={goBack}><BackIcon /></span>
          <StyledHeading
            size={1.2}
            weight="600"
          >
            {roomData && roomData.title}
          </StyledHeading>
        </>
      ),
      // rightIcon: <SearchIcon />,
      font: 'normal',
      bgColor: 'white',
      isLoggedIn,
      loggedInUsername,
      handleLoginClick,
      handleSignupClick,
      shouldShowPopup,
      closePopup
    },
    '/qna': {
      leftIcon:
      <>
    <span onClick={goBack}><BackIcon /></span>
    <StyledHeading
      onClick={() => navigate("/")}
      size={1.2}
      weight="600">서비스정보</StyledHeading>
    </>,
      bgColor: 'white',
      isLoggedIn,
      loggedInUsername,
      handleLoginClick,
      handleSignupClick,
      shouldShowPopup,
      closePopup
    },
    default: {
      leftIcon:
      <StyledHeading
      onClick={() => navigate("/")}
      size={1.3}
      weight="600">지금여기</StyledHeading>,
      // rightIcon: <ShareIcon />,
      bgColor: '#F5F6F7',
      leftAction: () => navigate('/'),
      isLoggedIn,
      loggedInUsername,
      handleLoginClick,
      handleSignupClick,
      shouldShowPopup,
      closePopup
    },
  };

  ///room/:roomId 패턴과 일치하는 정규식
  const roomPattern = /^\/room\/[a-zA-Z0-9]+$/;
  const isRoomPath = roomPattern.test(location.pathname);

  const config = isRoomPath ? headerConfig['/room/:roomId'] : headerConfig[location.pathname] || headerConfig.default;

  return <Header {...config} />;
};

export default HeaderController;
