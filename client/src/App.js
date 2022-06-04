import './App.css';
import {Routes, Route, Navigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';


//pages
import Home from './pages/Home/Home.js'
import Auth from './pages/Auth/Auth.js'

//components



function App() {


  const user = useSelector((state) => state.user)

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={user.username ? <Home /> : <Navigate to="/auth/login" /> }/>
        <Route path="/auth/register" element={<Auth register={true}/>} />
        <Route path="/auth/login" element={<Auth register={false} />} />
      </Routes>      
    </div>
  );
}

export default App;
