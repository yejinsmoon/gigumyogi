// import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/socketcontext';

import Home from './pages/Home';
import Login from './pages/login';
import Signup from './pages/signup';
// import Profile from './pages/profile';
import Concert from './pages/concert';
import Room from './pages/room'
// import Room from './pages/chat2';
import Header from './components/header';
import QNA from './pages/qna';

import { GlobalStyle } from './styles/theme';
import Board from './pages/board';


function App() {

  return (
    <SocketProvider>
    <AuthProvider>
      <Router>
        <GlobalStyle />
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users/login" element={<Login />} />
            <Route path="/users/signup" element={<Signup />} />
            {/* <Route path="/users/my_profile" element={<Profile />} />
            <Route path="/users/my_profile/nickname" element={<Profile />} /> */}
            <Route path="/concert" element={<Concert />} />
            <Route path="/room/:roomId" element={<Room />} />
            {/* <Route path="/chat" element={<Chat />} /> */}
            <Route path="/qna" element={<QNA />} />
            <Route path="/board" element={<Board />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
    </SocketProvider>
  );
}

export default App;
