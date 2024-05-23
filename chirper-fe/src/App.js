import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';
import Feed from './Feed';
import Profile from './Profile';
import Chirp from './Chrip';
import {users} from './mockDb';
import StaticProfile from './StaticProfile';


function App() {
  const data = users[0];

  return (
    <Router>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Feed profile={data}/>} />
        <Route path="/profile" element={<Profile profile={data}/>} />
        <Route path="/chirp" element={<Chirp profile={data}/>} />
        <Route path="/viewProfile/:userId" element={<StaticProfile profile={data}/>} />
      </Routes>
    </Router>
  );
}

export default App;