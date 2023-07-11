import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Concert() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [location, setLocation] = useState("");
  const [gpsLat, setGpsLat] = useState("");
  const [gpsLng, setGpsLng] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const [concertInfo, setConcertInfo] = useState(null);

  const baseURL = process.env.REACT_APP_SERVER_URL;

  //입력할 데이터 정의
  const data = {title,
    content,
    startDate,
    location,
    gpsLat,
    gpsLng,
    imgUrl
  }

  //데이터 입력하기
  const handleSubmit = async (e) => {
    e.preventDefault();
  //(폼 제출 시 페이지 새로고침 기본 동작 취소)
    try {
        console.log(title,
            content,
            startDate,
            location,
            gpsLat,
            gpsLng,
            imgUrl
            )
        
        console.log('1')
        const response =
          await axios.get(`${baseURL}/room`,
          // data,
          {withCredentials: true});
        
        console.log(response,'2');
        } catch (error) {
        console.error('There was an error!', error);
    }
  }

  // useEffect(() => {
  //   if (response.data.message === true) setconcertInfo(concertInfo);
  //   }, [concertInfo, setconcertInfo]);


//공연 정보 정의 및 가져오기 
useEffect(() => {
  fetchConcertInfo();
}, []);

const fetchConcertInfo = async () => {
  try {
    const response = await axios.get(`${baseURL}/concert`);
    setConcertInfo(response.data.data);
    console.log("콘서트 정보 받음",response.data.data)

  } catch (error) {
    console.error('콘서트 정보를 불러올 수 없음', error);
  }
}

// 공연정보 수정(근데 조금 더 알아봐야겠다)
  // const updateConcert = async (id) => {
  //   try {
  //     const response = await axios.put(`${baseURL}/concert/${id}`, {
  //       title,
  //       content,
  //       startDate,
  //       location,
  //       gpsLat,
  //       gpsLng
  //     });

  //     console.log(response.data);
  //     // Handle the updated concert data as needed
  //   } catch (error) {
  //     console.error('콘서트 정보를 업데이트 할 수 없습니다.', error);
  //   }
  // }

// 입력 폼 및 입력 데이터 보여주기)
return (
  <div>
      <form onSubmit={handleSubmit}>
      <input type="text" placeholder="image url" onChange={(e) => setImgUrl(e.target.value)} />
        <input type="text" placeholder="title" onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="content" onChange={(e) => setContent(e.target.value)} />
        <input type="date" placeholder="start date" onChange={(e) => setStartDate(e.target.value)} />
        <input type="text" placeholder="location" onChange={(e) => setLocation(e.target.value)} />
        <input type="text" placeholder="gps latitude" onChange={(e) => setGpsLat(e.target.value)} />
        <input type="text" placeholder="gps longitude" onChange={(e) => setGpsLng(e.target.value)} />
        <button type="submit">Submit</button>
      </form>

      {concertInfo ? (
concertInfo.map(info =>
<div key={info.id}>
<h2>{info.imgUrl}</h2>
<h2>{info.title}</h2>
<p>{info.content}</p>
<p>{info.startDate}</p>
<p>{info.location}</p>
<p>{info.gpsLat}</p>
<p>{info.gpsLng}</p>
<p>{info.__rooms__.roomId}</p>
</div>
)
) : (
<p>공연정보를 불러오고 있습니다</p>
)}
      {/* {concertInfo && (
        <button onClick={() => updateConcert(concertInfo ? concertInfo.id : "")}>
        콘서트 정보 업데이트
      </button>      
      )} */}

  </div>
  );
}

export default Concert;
