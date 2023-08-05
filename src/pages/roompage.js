// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// function RoomPage() {
//   const { roomId } = useParams(); // get the roomId from the URL
//   const [roomData, setRoomData] = useState(null); // state to store the room data
//   const baseURL = process.env.REACT_APP_SERVER_URL; // your base API URL

//   useEffect(() => {
//     // function to fetch room data
//     const fetchRoomData = async () => {
//       try {
//         const response = await axios.get(`${baseURL}/concert/${roomId}`, { withCredentials: true });
//         setRoomData(response.data);
//       } catch (error) {
//         console.error('Failed to fetch room data', error);
//       }
//     };

//     // call the fetch function
//     fetchRoomData();
//   }, [roomId]); // dependencies: if roomId changes, fetch the data again

//   // if no roomData yet, show loading
//   if (!roomData) {
//     return <p>Loading...</p>;
//   }

//   // when roomData is fetched, show the room information
//   return (
//     <div>
//       <h1>{roomData.title}</h1>
//       {/* show other room data here */}
//     </div>
//   );
// }

// export default RoomPage;
