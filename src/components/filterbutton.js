import React, { useState } from 'react';
import Button from './button';
import styled from 'styled-components';


const categories = ["전체", "분실물", "교환","모집","질문","기타"];

const ScrollableDiv = styled.div`
  display: flex;
  overflow-x: auto;
  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none; /* For Internet Explorer and Edge */
  &::-webkit-scrollbar { display: none; /* For Chrome, Safari and Opera */}
`;

const ButtonWrapper = styled.div`
min-width: fit-content;
  display: inline-flex;
  margin-right: 10px;
`;

function FilterButton() {
  const [activeCategory, setActiveCategory] = useState("전체");

  return (
    <ScrollableDiv>
      {categories.map(category => (
        <ButtonWrapper>
        <Button
        variant={"light"}
        color={"greyline"}
        size={"sm"}
        key={category}
        onClick={() => setActiveCategory(category)}
        style={{
            marginRight: '10px', // 오른쪽 마진 추가
            backgroundColor: activeCategory === category ? "primary" : "white",
            color: activeCategory === category ? "white" : "black",
          }}
        >
          {category}
        </Button>
        </ButtonWrapper>
      ))}
    </ScrollableDiv>
  );
}

export default FilterButton;
