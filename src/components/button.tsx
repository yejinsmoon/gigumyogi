// import React from 'react';
// import styled from 'styled-components';
// import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
// import CreateIcon from '@mui/icons-material/Create';

// const ContentWrapper = styled.div`
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
// `;

// type StyledButtonProps = {
//     borderRadius?: "ss" | "s" | "sm" | "md" | "1g";
//     size?: "s" | "sm" | "md" | "1g";
//     color?: "white" | "black" | "primary" | "blue" | "blueline" | "red" | "redline" | "greyline";
//     variant?: "light" | "dark" | "primary" | "secondary" | "blueline" | "icon" | "warning" | "greyline";
//     fixed?: boolean;
//     fontSize?: "sm" | "md" | "lg";
//   };


//   const ButtonComponent = styled.button<StyledButtonProps>`
// position: relative;
// ${props => props.fixed && `
//     position: fixed;
//     bottom: 24px;
//     right: 24px;
//   `};
// align-items: center;
// justify-content: center;
// text-align: center;
// text-decoration: none;
// vertical-align: middle;
// cursor: pointer;
// user-select: none;
// border-radius: ${props => 
//   props.borderRadius === "ss"
//   ? "2px"
//   : props.borderRadius === "sm"
//   ? "8px"
//   : props.borderRadius === "md"
//   ? "200px"
//   : "8px" };
// padding: 0 ${props => {
//   switch(props.size) {
//     case 'ss': 
//       return '0.3rem';
//     case 's': 
//       return '0.6rem';
//     case 'sm': 
//       return '1.1rem';
//     case 'md': 
//       return '0.8rem';
//     case '1g': 
//       return '1.6rem';
//     default: 
//       return '0.8rem';
//   }
// }};

// height: ${props => {
//   switch(props.size) {
//     case 's': 
//       return '34px';
//     case 'sm': 
//       return '40px';
//     case 'md': 
//       return '3.1rem';
//     case '1g': 
//       return '48px';
//     default: 
//       return '34px';
//   }
// }};
// font-family: "pretendard", sans-serif;
// font-size: ${props => {
//     switch(props.fontSize) {
//       case 'sm':
//         return '1rem'; // small font-size
//       case 'md':
//         return '1.5rem'; // medium font-size
//       case 'lg':
//         return '2rem'; // large font-size
//       default:
//         return '0.8rem'; // default font-size
//     }
// }};
// font-weight: 500;
// border: 1px solid;
// border-color: ${props => {
//   switch(props.color) {
//     case 'blueline':
//       return '#4F75F2';
//     case 'redline':
//       return '#F04452';
//     case 'greyline':
//       return '#E5E8EB';
//     default:
//       return '#00000000';
//   }
// }};
// background-color: ${props => {
//   switch(props.variant) {
//     case 'light':
//       return 'rgba(0, 0, 0, 0)';
//     case 'dark':
//       return '#00000000';
//     case 'primary':
//       return '#A168FF';
//     case 'secondary':
//       return '#00000000';
//     case 'blueline':
//       return '#00000000';
//     case 'icon':
//       return '#00000000';
//     case 'warning':
//       return '#00000000';
//     case 'greyline':
//       return '#00000000';
//     default:
//       return '#00000000';
//   }
// }};
// color: ${props => {
//   switch(props.color) {
//     case 'white':
//       return '#fff';
//     case 'black':
//       return '#333D4B';
//     case 'primary':
//       return '#A168FF';
//     case 'blue':
//       return '#4F75F2';
//     case 'blueline':
//       return '#4F75F2';
//     case 'red':
//       return '#F04452';
//     case 'redline':
//       return '#F04452';
//     case 'greyline':
//       return '#333D4B';
//     default:
//       return '#fff';
//   }
// }};
// `

// interface ButtonProps {
//   icon?: "nav" | "write";
//   borderRadius?: "s" | "sm" | "md";
//   type?: string;
//   color?: "white" | "black" | "primary" | "blue" | "blueline" | "red" | "redline" | "greyline";
//   variant?: "light" | "dark" | "primary" | "secondary" | "blueline" | "icon" | "warning" | "greyline";
//   className?: string;
//   id?: string;
//   onClick?: () => void;
//   size?: "s" | "sm" | "md" | "1g";
//   children: React.ReactNode;
//   fixed?: boolean;
//   fontSize?: "sm" | "md" | "lg";
// }

// const Button: React.FC<ButtonProps> = ({
//   icon, borderRadius, type, color, variant,
//   className, id, onClick, size, children, fixed, fontSize
// }) => {
//   return (
//     <ButtonComponent
//       type={type ? type : "button"}
//       variant={variant}
//       className={className ? `btn-component ${className}` : "btn-component"}
//       id={id}
//       onClick={onClick}
//       size={size}
//       color={color}
//       borderRadius={borderRadius}
//       fixed={fixed}
//       fontSize={fontSize}
//     >
//       <ContentWrapper>
//         {icon === "nav" && <NavigateNextRoundedIcon />}
//         {icon === "write" && <CreateIcon style={{ color: '#ffffff' }} />}
//         {children}
//       </ContentWrapper>
//     </ButtonComponent>
//   );
// }

// export default Button;
