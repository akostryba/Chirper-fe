import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';
import Feed from './Feed';
import Profile from './Profile';
import Chirp from './Chrip';
import StaticProfile from './StaticProfile';


function App() {
  const data = {
        username: "Andrew",
        picture: "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3Dhttps://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
    };
  return (
    <Router>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Feed profile={data}/>} />
        <Route path="/profile" element={<Profile profile={data}/>} />
        <Route path="/chirp" element={<Chirp profile={data}/>} />
        <Route path="/viewProfile/:username" element={<StaticProfile/>} />
      </Routes>
    </Router>
  );
}

export default App;