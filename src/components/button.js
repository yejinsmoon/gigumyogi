import React from 'react';
import styled from 'styled-components';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

const ButtonComponent = styled.button`
position: relative;
display: inline-flex;
align-items: center;
justify-content: center;
text-align: center;
text-decoration: none;
vertical-align: middle;
cursor: pointer;
user-select: none;
border-radius: 8px;
padding: 0 
  ${props =>props.size === "s"
  ? "0.8rem"
  :props.size === "sm"
  ? "1.1rem"
  : props.size === "md"
  ? "1.4rem"
  : props.size ==="1g"
  ? "1.6rem"
  : "1.1rem" };
  height: ${props =>
  props.size === "sm"
  ? "34px"
  : props.size ==="md"
  ? "37px"
  : props.size ==="1g"
  ? "40px"
  : "34px"};
font-family: "pretendard", sans-serif;
font-size: small;
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
  : props.variant === "warning"
  ? "#fff"
  : props.variant === "danger"
  ? "#fff"
  : "#fff"};
  color: ${props =>
  props.color === "white"
  ? "#fff"
  : props.color === "black"
  ? "#333D4B"
  : props.color === "blue"
  ? "#4F75F2"
  : "#fff"};
`;

const Button = ({icon, type, color, variant, className, id, onClick, size, children }) => {
  return (
    <ButtonComponent
    type= {type ? type : "button"}
    variant = {variant}
    className={className ? `btn-component ${className}`: "btn-component"}
    id={id}
    onClick={onClick}
    size = {size}
    color = {color}
    >
      {icon === "nav" && <NavigateNextRoundedIcon />}
      {children}
    </ButtonComponent>
  )
}

export default Button;