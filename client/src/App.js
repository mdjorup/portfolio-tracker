import { useEffect } from 'react';
import './App.css';
import {Routes, Route, Navigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'

//functions
import { setUser, clearUser } from './features/user/userSlice';


//pages
import Home from './pages/Home/Home.js'
import Auth from './pages/Auth/Auth.js'


//components

// persisting state on refrest
// https://blog.bitsrc.io/5-methods-to-persisting-state-between-page-reloads-in-react-8fc9abd3fa2f

function App() {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user)

  useEffect(() => {
    if(!user.jwt) {
      return
    }

    const req_body = {
      "jwt": user.jwt
    }

    axios.post("https://s6j0yldn31.execute-api.us-east-1.amazonaws.com/Prod/auth/verify", req_body)
    .then(response => {
      console.log(response.data)
      console.log("Successful JWT verification")
    }).catch(error => {
      console.log(error)
      dispatch(clearUser())
    })



  }, [])

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={user.username ? <Home /> : <Navigate to="/auth/login" /> }/>
        <Route path="/auth/register" element={!user.username ? <Auth register={true}/> : <Navigate to="/" />} />
        <Route path="/auth/login" element={!user.username ? <Auth register={false}/> : <Navigate to="/" />} />
      </Routes>      
    </div>
  );
}

export default App;
