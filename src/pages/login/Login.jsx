import './login.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from '../../redux/selectors'
import userSlice from '../../redux/userSlice'

export default function Login() {
    const { error, isFetching } = useSelector(userSelector)
    const dispatch = useDispatch()
    const [isFill, setIsFill] = useState(true)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (username && password) {
            dispatch(userSlice.actions.loginStart())
            try {
                const res = await axios.post("/auth/login", {
                    username: username,
                    password: password
                })

                if (res.status === 200) {
                    dispatch(userSlice.actions.loginSuccess(res.data))
                } else {
                    dispatch(userSlice.actions.loginFailure(res.data))
                }
            } catch (err) {
                dispatch(userSlice.actions.loginFailure("Login error, please try again."))
            }
        } else {
            setIsFill(false)
            setTimeout(() => {
                setIsFill(true)
            }, 2000)
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
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        className="login-input"
                        placeholder="Enter password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {!isFill &&
                        <span
                            style={
                                {
                                    display: "block",
                                    width: "100%",
                                    textAlign: 'center',
                                    fontSize: "1.6rem",
                                    color: "red",
                                    marginBottom: "12px",
                                }}
                        >
                            Please fill in all the infomation
                        </span>
                    }

                    <button className="login-btn" type="submit" disabled={isFetching}>Login</button>
                    {/* <span className="login-forgot-password">Forgot password?</span> */}
                </form>

                {error &&
                    <span
                        style={
                            {
                                width: "100%",
                                display: "block",
                                textAlign: "center",
                                fontSize: "1.2rem",
                                color: "red"
                            }
                        }
                    >
                        {/* Username or password is not true */}
                        {error}
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
