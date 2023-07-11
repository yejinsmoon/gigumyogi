import React, { useState } from 'react';
import styled from 'styled-components';

const TabContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #fff;
  box-sizing: border-box;
  width: 100%;
  max-width: 810px;
  position: relative;
  align-content: flex-start;
  flex-wrap: nowrap;
`;

const Tab = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  background-color: ${props => props.active ? 'transparent' : 'transparent'};
  color: ${props => props.active ? '#4E5968' : '#8B95A1'};
`;

const Content = styled.div`
  padding: 20px;
  background-color: #fff;
`;

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <TabContainer>
        <Tab active={activeTab === 0} onClick={() => handleTabClick(0)}>전체채팅</Tab>
        <Tab active={activeTab === 1} onClick={() => handleTabClick(1)}>게시판</Tab>
      </TabContainer>
      <Content>
        {activeTab === 0 && <p>Content for Tab 1</p>}
        {activeTab === 1 && <p>Content for Tab 2</p>}
      </Content>
    </div>
  );
};

export default TabComponent;
