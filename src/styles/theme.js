import { createGlobalStyle } from 'styled-components';

const Color = {
    white: '#FFFFFF',
    gray1: '#F5F5F9',
    gray2: '#E9E9EE',
    gray3: '#C7C7CD',
    gray4: '#9090A0',
    gray5: '#626273',
    gray6: '#464656',
    black: '#212121',
    primary: '#FF6C3E',
    secondary: '#FF916F',
    danger: '#F5656A',
  };

const FontSizes = {
  Headinglarge: '26px',
  Headingmedium: '20px',
  Headingsmall: '16px',
  bodylarge: '15px',
  bodymedium: '13px',
  detail: '11px',
};

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard-semibold';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard-bold';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 700;
    font-style: bold;
  }


  body {
    font-family: 'Pretendard', Arial, Helvetica, sans-serif;
    margin: 0px;
  }
`;

export { Color, FontSizes, GlobalStyle };