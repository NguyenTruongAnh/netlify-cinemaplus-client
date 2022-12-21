import './register.css'

import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Login() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(false)
        try {
            const res = await axios.post("/auth/register", {
                username,
                email,
                phone,
                password,
            })

            res.data && window.location.replace("/login")
        } catch(err) {
            setError(true)
        }
    }

    return (
        <div className="register">
            <h2 className="register-title">
                Register
            </h2>
            <div className="register-wrapper">
                <form action="#" className="register-form" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        className="register-input" 
                        placeholder="Enter username..." 
                        onChange={(e)=>setUsername(e.target.value)}
                    />

                    <input 
                        type="email" 
                        className="register-input" 
                        placeholder="Enter email..." 
                        autoComplete="off"
                        onChange={(e)=>setEmail(e.target.value)}
                    />

                    <input 
                        type="text" 
                        className="register-input" 
                        placeholder="Enter phone..." 
                        autoComplete="off"
                        onChange={(e)=>setPhone(e.target.value)}
                    />

                    <input 
                        type="password" 
                        className="register-input" 
                        placeholder="Enter password..." 
                        onChange={(e)=>setPassword(e.target.value)}
                    />

                    <button className="register-btn">Register</button>

                    {error && <span style={{color:'red', fontSize:'1.2rem'}}>Username or Email or Phone has been used</span>}
                </form>

                {/* <p className="register-divide">
                    <span>or</span>
                </p>

                <button className="facebook-btn">Facebook</button>
                <button className="google-btn">Google</button> */}
            </div>
        </div>
    )
}
