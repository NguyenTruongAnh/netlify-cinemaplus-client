import './login.css'
import { Link } from 'react-router-dom'
import { useEffect, useRef, useContext, useState } from 'react'
import { Context } from '../../context/Context'
import axios from 'axios'

export default function Login() {
    const userRef = useRef()
    const passwordRef = useRef()
    const { dispatch } = useContext(Context)
    const [error, setError] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch({type:"LOGIN_START"})
        try {
            const res = await axios.post("/auth/login", {
                username: userRef.current.value, 
                password: passwordRef.current.value
            })

            dispatch({type:"LOGIN_SUCCESS", payload: res.data})
        } catch(err) {
            dispatch({type:"LOGIN_FAILURE"})

            setError(true)
        }
    }

    return (
        <div className="login">
            <h2 className="login-title">
                Login
            </h2>
            <div className="login-wrapper">
                <form action="#" className="login-form" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        className="login-input" 
                        placeholder="Enter username..." 
                        ref={userRef}
                    />

                    <input 
                        type="password" 
                        className="login-input" 
                        placeholder="Enter password..." 
                        ref={passwordRef}
                    />

                    <button className="login-btn" type="submit">Login</button>
                    {/* <span className="login-forgot-password">Forgot password?</span> */}
                </form>

                {error && 
                    <span
                        style={
                            { 
                                width:"100%",
                                display:"block",
                                textAlign:"center",
                                fontSize:"1.2rem",
                                color:"red"
                            }
                        }
                    >
                        Username or password is not true
                    </span>
                }

                {/* <p className="login-divide">
                    <span>or</span>
                </p>

                <button className="facebook-btn">Facebook</button>
                <button className="google-btn">Google</button> */}

                <div className="login-register">
                    No account?
                    <Link className="link" to='/register'>
                        <span>Register now</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
