import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Home from './pages/Home';
import Login from './pages/login';
import Signup from './pages/signup';
import Profile from './pages/profile';
import Concert from './pages/concert';
import Chat from './pages/chat';
import Header from './components/header';

import { GlobalStyle } from './styles/theme';


function App() {

  return (
    <AuthProvider>
    <Router>
    <GlobalStyle />
    <Header />
    <div>
          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/users/login" element={<Login />} />

            <Route path="/users/signup" element={<Signup />} />
ㅛ
            <Route path="/users/my_profile" element={<Profile />} />

            <Route path="/users/my_profile/nickname" element={<Profile />} />
            
            <Route path="/concert" element={<Concert />} />

            <Route path="/chat" element={<Chat />} />

          </Routes>
    </div>
    </Router>
  </AuthProvider>
  );
}

export default App;
