import './App.scss'
import  { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Chat from './components/layouts/chat'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={''}/>
        <Route path='/me' element={<Navigate to='/me/uid'/>}/>
        <Route path='/me/:uid' element={<Chat/>}/>
      </Routes>
    </Router>
  );
}

export default App;
