import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Button from '../components/button';

import './concert.css';
import '../components/list.css';
import styled from "styled-components";

function Concert() {
  const [imgUrl, setimgUrl] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [location, setLocation] = useState("");
  const [gpsLat, setGpsLat] = useState("");
  const [gpsLng, setGpsLng] = useState("");

  const [concertInfo, setConcertInfo] = useState([]);

  const baseURL = process.env.REACT_APP_SERVER_URL;

  //입력할 데이터 정의
  const data = {
    imgUrl,
    title,
    content,
    startDate,
    location,
    gpsLat,
    gpsLng
  }


  //데이터 입력하기
  const handleSubmit = async (e) => {
    e.preventDefault();
  //(폼 제출 시 페이지 새로고침 기본 동작 취소)
    try {
        
        console.log('1')
        console.log(typeof startDate)
        const response =
          await axios.post(`${baseURL}/concert`,data,
          {withCredentials: true});
        
        console.log(response,'2');

        fetchConcertInfo();

        } catch (error) {
        console.error('There was an error!', error);
    }
  }


//공연 정보 정의 및 가져오기
//useeffect의 첫번째 매개변수는 함수: 컴포넌트가 렌더링 된 후 fetchconcertinfo 호출, 두번째 매개변수는 의존성 array: 배열에 있는 값이 변경될 때에만 첫번째 매개변수 함수 실행 
//처음 컴포넌트가 마운트될 때 'fetchconcertinfo'를 실행해라
useEffect(() => {
  fetchConcertInfo();
}, []);

//매개변수() => {}안의 결과에 따라 달라짐, 매개변수 사용하지 않을 경우 호출되면 고정된 작업 수행, 출력
const fetchConcertInfo = async () => {
  try {
    const response = await axios.get(`${baseURL}/concert`,
    {withCredentials: true});
    // console.log(response.data.data);
    //map함수: 각각의 요소에 대해 처리 수행, 그 결과를 모은 새로운 배열 반환 / ...item: item 객체의 모든 속성 새 객체에 복사
    const dataWithEditFlag = response.data.data.map(item => ({ ...item, isEditing: false }));
    setConcertInfo(dataWithEditFlag);
    // console.log(dataWithEditFlag)
  } catch (error) {
    // console.error('콘서트 정보 불러오기 실패', error);
  }
}


//공연 정보 편집 상태 설정
const handleEdit = (id) => {
  setConcertInfo(
    concertInfo.map(item =>
      item.id === id ? { ...item, isEditing: true } : item
    )
  );
}


//공연 데이터 업데이트
// 상수를 정의하고 비동기적으로 진행되는 ()매개변수에 {}함수를 실행하겠다. 화살표 함수
const handleUpdate = async (id, newData) => {
  try {
    const response = await axios.put(`${baseURL}/concert/${id}`,
    newData,
    {withCredentials: true})
    
    if (response.data.success!==true) {
      throw new Error('업데이트 실패');
    }

    setConcertInfo(
      concertInfo.map(item => {
        return item.id === id ? { ...item, ...newData, isEditing: false } : item;
    })    
    );
  } catch (error) {
  }
}


//콘서트 정보 삭제 //response: 요청 응답을 변수 response에 저장하겠다. 이 변수 활용, 응답의 상태나 데이터 등 추후 활용 -> 서버의 응답 response 저장 / 서버의 응답을 콘솔에 출력 
const handleDelete = async (id) => {
  console.log('Deleting concert with id:', id); //콘솔 확인 후 삭제
  try {
    const response = await axios.delete(`${baseURL}/concert/${id}`,
    {withCredentials: true});
    console.log('Server response:', response);
    //concertinfo 업데이트 -> filter을 통해 이 배열에서 삭제한 콘서트를 제외한 나머지 콘서트만을 선택하여 새 배열을 만들고, setConcertInfo 함수는 이 새 배열로 concertInfo 상태를 업데이트
    setConcertInfo(concertInfo.filter(item => item.id !== id));
  } catch (error) {
    console.error('공연 정보 삭제 실패', error);
  }
}


// 입력 폼 , 입력 데이터 보여주기
return (
<Container>
  <Body>

  <div className='createconcert'>
    <form onSubmit={handleSubmit}>
      <p className='headinglarge'>공연 생성하기</p>
      <input type="text" placeholder="Image URL" onChange={e => setimgUrl(e.target.value)} />
      <input type="text" placeholder="공연 제목" onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="세부 내용" onChange={(e) => setContent(e.target.value)} />
      <input type="date" placeholder="공연 날짜" onChange={(e) => setStartDate(e.target.value)} />
      <input type="text" placeholder="장소명" onChange={(e) => setLocation(e.target.value)} />
      <input type="text" placeholder="gps latitude" onChange={(e) => setGpsLat(e.target.value)} />
      <input type="text" placeholder="gps longitude" onChange={(e) => setGpsLng(e.target.value)} />
      <Button
        variant={"primary"}
        color={"white"}
        size={"sm"}
        type="submit">공연 생성하기</Button>
    </form>

    {concertInfo ? (
    concertInfo.map(info =>
      <div key={info.id} className='list-container'>
        {info.isEditing ? (
          <form onSubmit={(e) => {
          e.preventDefault();
          handleUpdate(info.id, {
          imgUrl: e.target.elements.imgUrl.value,
          title: e.target.elements.title.value,
          content: e.target.elements.content.value,
          startDate: e.target.elements.startDate.value,
          location: e.target.elements.location.value,
          gpsLat: e.target.elements.gpsLat.value,
          gpsLng: e.target.elements.gpsLng.value,
          });
          }}>
          <input type="text" placeholder="이미지 url" name="imgUrl" defaultValue={info.imgUrl} />
          <input type="text" placeholder="공연 제목"name="title" defaultValue={info.title} />
          <input type="text" placeholder="세부 내용"name="content" defaultValue={info.content} />
          <input type="date" name="startDate" defaultValue={info.startDate} />
          <input type="text" placeholder="장소명" name="location" defaultValue={info.location} />
          <input type="text" name="gpsLat" defaultValue={info.gpsLat} />
          <input type="text" name="gpsLng" defaultValue={info.gpsLng} />
          <Button
            variant={"light"}
            color={"blueline"}
            size={"s"}
            type="submit"> 공연정보 업데이트</Button>
          </form>
          ) : (

          <div className='list-components'>
          <div className='image-area' style={{backgroundImage: `url(${info.imgUrl})`}} />
          <div className='text-area'>
          <div className='text-title'>{info.title}</div>
          <div className='text-info-area'>
          <div className='text-body'>{info.startDate}</div>
          <div className='text-body'>{info.location}</div>
          {/* <p>{info.__rooms__.roomId}</p> */}
          </div>
          </div>
          
          <div className='button-area'>
          <Button
            variant={"light"}
            color={"blueline"}
            size={"s"}
            onClick={() => handleEdit(info.id)}
          >
          수정하기
          </Button>

          <Button
            variant={"light"}
            color={"redline"}
            size={"s"}
            onClick={() => handleDelete(info.id)}
          >
          삭제하기
          </Button>
          </div>
          </div>
          )}
          </div>
        )
        ) : (
        <p>콘서트 정보를 불러오는 중입니다</p>
        )}
      </div>
  </Body>
</Container>
);
}

export default Concert;


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  flex-direction: column;
  
`;

const Body = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 810px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  align-content: center;
  flex-wrap: nowrap;
  gap:10px;
  padding: 0px 20px 0px 20px;
`;
