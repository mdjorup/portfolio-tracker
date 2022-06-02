import './App.css';
import {Routes, Route, Link} from "react-router-dom"


//pages
import Home from './pages/Home/Home.js'
import Auth from './pages/Auth/Auth.js'

//components



function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/register" element={<Auth register={true}/>} />
        <Route path="/auth/login" element={<Auth register={false}/>} />
      </Routes>      
    </div>
  );
}

export default App;
