import React, { useState } from 'react'
import styled from "styled-components";
import Button from '../components/button';
import Badge from '../components/badge';
import FilterButton from '../components/filterbutton';

import { useNavigate } from 'react-router-dom';

function Board({ roomId }) {
  const [userPosts, setUserPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("전체");

  const navigate = useNavigate();

  const handleCreatePostClick = () => {
    navigate(`/room/${roomId}/create`);
  }

  const addPost = (category, postContent) => {
    setUserPosts(prevPosts => [
      ...prevPosts,
      { id: prevPosts.length + 1, category: category, content: postContent }
    ]);
  }

  const filteredPosts = userPosts.filter(post => 
    activeCategory === "전체" ? true : post.category === activeCategory
  );


  return (
    <BoardContainer>
    <ListContainer2>
    <FilterButton />
    <Button
      variant={"primary"}
      borderRadius={'md'}
      color={"greyline"}
      size={"md"}
      type="submit"
      icon="write"
      onClick={handleCreatePostClick} 
      fixed={true}></Button>
    </ListContainer2>

        <ListContainer>
          <TextArea>
          <Badge
          borderRadius='ss'
          size = 'ss'
          color = 'black'
          variant= 'grey'
          >모집
          </Badge>
            <TextTitle>
              글 제목
            </TextTitle>
            <TextTitle2>히히</TextTitle2>
            <TextTitle2>
            2분 전 ∙ 조회 5
            </TextTitle2>
          </TextArea>
        </ListContainer>

        <ListContainer>
          <TextArea>
            <TextTitle>
              글 제목
            </TextTitle>
            <TextTitle2>히히</TextTitle2>
            <TextTitle2>
            2분 전 ∙ 조회 5
            </TextTitle2>
          </TextArea>
        </ListContainer>

    </BoardContainer>
        );
      };

export default Board;

const BoardContainer = styled.div`
  display: flex;
  background-color: #fff;
  align-items: flex-start;
  justify-content: flex-start;

  box-sizing: border-box;
  width: 100%;
  max-width: 810px;
  display: flex;
  flex-direction: column;
  position: relative;
  flex-wrap: nowrap;
`;


const ListContainer = styled.div`
    box-sizing: border-box;
    align-content: center;
    align-items: start;
    display: flex;
    flex: none;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    overflow: hidden;
    padding: 16px 24px;
    position: relative;
    width: 100%;
    min-width: 250px;
    height: min-content;
    min-height: 100px;
    color: #333D4B;
    border-bottom: 1px solid #F2F3F6;
`

const ListContainer2 = styled.div`
    box-sizing: border-box;
    display: flex;  // 요소를 가로 방향으로 정렬
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;  // 요소를 왼쪽으로 정렬
    gap: 10px;  // 요소들 사이에 10px 간격
    overflow: hidden;
    padding: 16px 24px;
    position: relative;
    width: 100%;
    color: #333D4B; 
    align-items: start;
`;


//배너 안 텍스트 컨테이너
const TextArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;  
    justify-content: center;
    height: min-content;
    overflow: visible;
    position: relative;
    flex: 100px;
    gap: 5px;
`
  //타이틀 텍스트 라지
const HeadingLarge = styled.div`
    display: flex;
    line-height: 30px;
    font-weight: 600;
    font-size: 22px;
    letter-spacing: -.5px;
    overflow-wrap: break-word;
    text-overflow: ellipsis;
    flex: 1 1;
    color: #191F28;
    `

    //본문 텍스트
const TextTitle = styled.div`
color: #333D4B;
font-family: Pretendard;
font-size: 17px;
font-style: normal;
font-weight: 600;
line-height: normal;
`

const TextTitle2 = styled.div`
color: #6B7684;
font-family: Pretendard;
font-size: 13px;
font-style: normal;
font-weight: 500;
line-height: normal;
`



