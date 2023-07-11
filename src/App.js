import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/login';
import Signup from './pages/signup';
import Profile from './pages/profile';
import Concert from './pages/concert';
import Chat from './pages/chat';

import { GlobalStyle } from './styles/theme';


function App() {

  return (
    <Router>
    <GlobalStyle />
    <div>
          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/users/login" element={<Login />} />

            <Route path="/users/signup" element={<Signup />} />

            <Route path="/users/my_profile" element={<Profile />} />

            <Route path="/users/my_profile/nickname" element={<Profile />} />
            
            <Route path="/concert" element={<Concert />} />

            <Route path="/chat" element={<Chat />} />

          </Routes>
    </div>
    </Router>
  );
}

export default App;
