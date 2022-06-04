import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import "./Auth.css"

import { setUser } from '../../features/user/userSlice'

const Auth = ({register}) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [buttonFill, setButtonFill] = useState("unfilled")


    const headerName = register ? "Register" : "Login"

    useEffect(() => {
        if (register && name && username && email && password){
            setButtonFill("filled")
        } else if(!register && username && password) {
            setButtonFill("filled")
        } else {
            setButtonFill("unfilled")
        }
        
    }, [name, email, username, password])


    const handleChange = (event) => {
        if(event.target.placeholder === "Name"){
            setName(event.target.value);
        } else if(event.target.placeholder === "Username"){
            setUsername(event.target.value)
        } else if(event.target.placeholder === "Email") {
            setEmail(event.target.value)
        } else {
            setPassword(event.target.value)
        }
    }


    const handleClick = () => {

        setLoading(true)
        const req_body = {
            "name": name,
            "username": username,
            "email": email,
            "password": password
        }

        let endpoint;
        if(register) {
            endpoint = "https://s6j0yldn31.execute-api.us-east-1.amazonaws.com/Prod/auth/register"
        } else {
            endpoint = "https://s6j0yldn31.execute-api.us-east-1.amazonaws.com/Prod/auth/login"
        }
        axios.post(endpoint, req_body).then(response => {
            // add jwt to state
            console.log(response)
            let jwt = response.data.jwt
            dispatch(setUser({
                "jwt": jwt,
                "username": username
            }))
            navigate("/")
            setLoading(false)
        })
        .catch(error => {
            let errorType = error.response.data.error
            console.log(errorType)
            if (errorType === "UserNotFoundError"){
                navigate('/auth/register')
            } else if (errorType === "UserExistsError"){
                navigate("/auth/login")
            } else if (errorType === "Unauthorized") {
                setErrorMessage("Incorrect Password")
            } else {
            }
            setLoading(false)

        })
        //need to catch errors
        //also need to edit responses to contain actual information


    }

    return (
        <div className='auth'>
            <div className='other__login' onClick={() => navigate(`/auth/${register ? "login" : 'register'}`)}>
                {register && <p>Login Instead</p>}
                {!register && <p>Register Instead</p>}
            </div>
            <div className="auth__box ">
                <p className='auth__box__header'>{headerName}</p>
                {register && <input className='auth__input' type='text' placeholder='Name' onChange={handleChange}/>} 
                <input className='auth__input' type='text' placeholder='Username' onChange={handleChange}/> 
                {register && <input className='auth__input' type='text' placeholder='Email' onChange={handleChange}/>} 
                <input className='auth__input' type='password' placeholder='Password' onChange={handleChange}/> 
                <button type='submit' className={`submit ${buttonFill}`} disabled={buttonFill === 'unfilled'} onClick={handleClick}>
                    {loading && "Loading..."}
                    {!loading && "Submit"}
                </button>
                {errorMessage && <p className='error__message'>{errorMessage}</p>}
            </div>
            <p className='error__message'>{loading}</p>
            
        </div>
    )
}

export default Auth