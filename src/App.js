import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/login';
import Signup from './pages/signup';
import Profile from './pages/profile';
import Concert from './pages/concert';
import Room from './pages/room';

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

            <Route path="/room" element={<Room />} />

          </Routes>
    </div>
    </Router>
  );
}

export default App;
