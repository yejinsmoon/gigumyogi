import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Concert() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [location, setLocation] = useState("");
  const [gpsLat, setGpsLat] = useState("");
  const [gpsLng, setGpsLng] = useState("");
  const [concertInfo, setConcertInfo] = useState(null);
  const baseURL = process.env.REACT_APP_SERVER_URL;
  const data = {title,
    content,
    startDate,
    location,
    gpsLat,
    gpsLng}

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log(title,
            content,
            startDate,
            location,
            gpsLat,
            gpsLng)
        // const response = await axios.post({
        //     // method: 'post',
        //     // url: `${baseURL}/concert`,
        //     url: `https://mo-inda.shop/concert`,
        //     withCredentials: true,
        //     headers: { 'Content-Type': 'application/json' },
        //     data: {
        //         title,
        // content,
        // startDate,
        // location,
        // gpsLat,
        // gpsLng
        //     },
        //     });
        console.log('1')
        const response = await axios.get(`${baseURL}/users/token`, {
            // withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                withCredentials: true,
                
                // Authorization: `Bearer `,
                },
            });

      console.log(response,'2');
    } catch (error) {
      console.error('There was an error!', error);
    }
  }

  const updateConcert = async (id) => {
    try {
      const response = await axios.put(`https://mo-inda.shop/concert/${id}`, {
        title,
        content,
        startDate,
        location,
        gpsLat,
        gpsLng
      });

      console.log(response.data);
      // Handle the updated concert data as needed
    } catch (error) {
      console.error('There was an error!', error);
    }
  }

  useEffect(() => {
    fetchConcertInfo();
  }, []);

  const fetchConcertInfo = async () => {
    try {
      const response = await axios.get('https://mo-inda.shop/concert');
      setConcertInfo(response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="title" onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="content" onChange={(e) => setContent(e.target.value)} />
        <input type="date" placeholder="start date" onChange={(e) => setStartDate(e.target.value)} />
        <input type="text" placeholder="location" onChange={(e) => setLocation(e.target.value)} />
        <input type="text" placeholder="gps latitude" onChange={(e) => setGpsLat(e.target.value)} />
        <input type="text" placeholder="gps longitude" onChange={(e) => setGpsLng(e.target.value)} />
        <button type="submit">Submit</button>
      </form>

      {concertInfo ? (
        <div>
          <h2>{concertInfo.title}</h2>
          <p>{concertInfo.content}</p>
          <p>{concertInfo.startDate}</p>
          <p>{concertInfo.location}</p>
          <p>{concertInfo.gpsLat}</p>
          <p>{concertInfo.gpsLng}</p>
        </div>
      ) : (
        <p>공연정보를 불러오고 있습니다</p>
      )}
      
      {concertInfo && (
        <button onClick={() => updateConcert(concertInfo ? concertInfo.id : "")}>
        Update Concert
      </button>      
      )}
    </div>
  );
}

export default Concert;
