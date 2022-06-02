import React, {useEffect, useState} from 'react'
import "./Auth.css"

const Auth = ({register}) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


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

    return (
        <div className='auth'>
            <div className="auth__box ">
                <p className='auth__box__header'>{headerName}</p>
                {register && <input className='auth__input' type='text' placeholder='Name' onChange={handleChange}/>} 
                <input className='auth__input' type='text' placeholder='Username' onChange={handleChange}/> 
                {register && <input className='auth__input' type='text' placeholder='Email' onChange={handleChange}/>} 
                <input className='auth__input' type='text' placeholder='Password' onChange={handleChange}/> 
                <button className={`submit ${buttonFill}`}>
                    Submit
                </button>
            </div>
            
        </div>
    )
}

export default Auth