import React from 'react';
import styled from 'styled-components';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

const BadgeComponent = styled.button`
position: relative;
align-items: center;
justify-content: center;
text-align: center;
text-decoration: none;
vertical-align: middle;
user-select: none;
border-radius: ${props => 
  props.borderRadius === "ss"
  ? "2px"
  : props.borderRadius === "sm"
  ? "8px"
  : "8px" };
padding: 0 
  ${props =>props.size === "ss"
  ? "0.5rem"
  : props.size === "sm"
  ? "1.1rem"
  : props.size === "md"
  ? "1.4rem"
  : props.size ==="1g"
  ? "1.6rem"
  : "1.1rem" };
  height: ${props =>
    props.size === "ss"
  ? "17px"
  : props.size === "sm"
  ? "34px"
  : props.size ==="md"
  ? "37px"
  : props.size ==="1g"
  ? "40px"
  : "34px"};
font-family: "pretendard", sans-serif;
font-size: 11px;
font-weight: 500;
border: 1px solid transparent;
background-color: ${props =>
  props.variant === "light"
  ? "#fff"
  : props.variant === "dark"
  ? "#fff"
  :props.variant === "primary"
  ? "#3182F6"
  : props.variant === "secondary"
  ? "#fff"
  : props.variant === "transparent"
  ? "#00000000"
  : props.variant === "icon"
  ? "#00000000"
  : props.variant === "grey"
  ? "#ECECEC"
  : props.variant === "danger"
  ? "#fff"
  : "#fff"};
  color: ${props =>
  props.color === "white"
  ? "#fff"
  : props.color === "black"
  ? "#6B7684"
  : props.color === "blue"
  ? "#4F75F2"
  : "#fff"};
`;

const Badge = ({borderRadius, icon, color, variant, id, onClick, size, children }) => {
  return (
    <BadgeComponent
    borderRadius={borderRadius}
    variant = {variant}
    id={id}
    onClick={onClick}
    size = {size}
    color = {color}
    >
      {children}
    </BadgeComponent>
  )
}

export default Badge;