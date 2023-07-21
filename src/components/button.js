import React from 'react';
import styled from 'styled-components';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';


//버튼 variable
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
padding: 0 ${props => {
  switch(props.size) {
    case 'ss': 
      return '0.3rem';
    case 's': 
      return '0.7rem';
    case 'sm': 
      return '1.1rem';
    case 'md': 
      return '1.4rem';
    case '1g': 
      return '1.6rem';
    default: 
      return '1.1rem';
  }
}};

height: ${props => {
  switch(props.size) {
    case 's': 
      return '34px';
    case 'md': 
      return '40px';
    case '1g': 
      return '48px';
    default: 
      return '34px';
  }
}};
font-family: "pretendard", sans-serif;
font-size: small;
font-weight: 500;
border: 1px solid;
border-color: ${props => {
  switch(props.color) {
    case 'blueline':
      return '#4F75F2';
    case 'redline':
      return '#F04452';
    default:
      return '#00000000';
  }
}};
background-color: ${props => {
  switch(props.variant) {
    case 'light':
      return 'rgba(0, 0, 0, 0)';
    case 'dark':
      return '#00000000';
    case 'primary':
      return '#3182F6';
    case 'secondary':
      return '#00000000';
    case 'blueline':
      return '#00000000';
    case 'icon':
      return '#00000000';
    case 'warning':
      return '#00000000';
    case 'danger':
      return '#00000000';
    default:
      return '#00000000';
  }
}};
color: ${props => {
  switch(props.color) {
    case 'white':
      return '#fff';
    case 'black':
      return '#333D4B';
    case 'blue':
      return '#4F75F2';
    case 'blueline':
      return '#4F75F2';
    case 'red':
      return '#F04452';
    case 'redline':
      return '#F04452';
    default:
      return '#fff';
  }
}};
`

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