import './App.scss'
import  { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Chat from './components/layouts/chat';
import Start from './components/layouts/start';
import connection from './components/Sockets/socket-config';
import VideoCall from './components/layouts/video-call';
import VocalCall from './components/layouts/vocal-call.jsx'

connection()
//set main routes

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/*' element={<Start/>}/>
        <Route path='/me' element={<Navigate to='/me/:uid'/>}/>
        <Route path='/call/vocal-call/:token' element={<VocalCall/>}/>
        <Route path='/call/video-call/:token' element={<VideoCall/>}/>
        <Route path='/me/:uid' element={<Chat/>}/>
      </Routes>
    </Router>
  );
}

export default App;
