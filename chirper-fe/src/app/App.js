import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import Feed from './Feed/Feed';
import Profile from './Profile/Profile';
import Chirp from './Post/Chrip';
import StaticProfile from './Profile/StaticProfile';
import Login from './Login/Login';
import Cookies from 'js-cookie';


function App() {
  //const data = users[0];
  try {
    const data = JSON.parse(Cookies.get('user'));
    return (
    <Router>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Feed profile={data}/>} />
        <Route path="/profile" element={<Profile profile={data}/>} />
        <Route path="/chirp" element={<Chirp profile={data}/>} />
        <Route path="/viewProfile/:userId" element={<StaticProfile profile={data}/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
  }
  catch{
    return (
      <Router>
        <Navigation/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Login />} />
          <Route path="/chirp" element={<Login />} />
          <Route path="/viewProfile/:userId" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    );
  }
}

export default App;