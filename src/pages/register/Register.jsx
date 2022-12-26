import './register.css'

import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Login() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (error) {
                setError("")
            }

            if (success) {
                setSuccess("")
            }
        }, 3000)

        return () => clearTimeout(timeout)
    }, [error, success])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (username && email && phone && password) {
            try {
                const res = await axios.post("/auth/register", {
                    username,
                    email,
                    phone,
                    password,
                })

                if (res.status === 200) {
                    // res.data && window.location.replace("/login")
                    setUsername("")
                    setEmail("")
                    setPhone("")
                    setPassword("")
                    setSuccess(res.data)
                } else {
                    setError(res.data)
                }
            } catch (err) {
                setError(err.response.data)
            }
        } else {
            setError("Please fill in all the infomation")
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
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="email"
                        className="register-input"
                        placeholder="Enter email..."
                        autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="text"
                        className="register-input"
                        placeholder="Enter phone..."
                        autoComplete="off"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <input
                        type="password"
                        className="register-input"
                        placeholder="Enter password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && (
                        <span
                            style={
                                {
                                    display: "block",
                                    width: "260px",
                                    textAlign: 'center',
                                    fontSize: "1.6rem",
                                    marginBottom: "12px",
                                    color: "red",
                                }}
                        >
                            {error}
                        </span>
                    )}

                    {success && (
                        <span
                            style={
                                {
                                    display: "block",
                                    width: "260px",
                                    textAlign: 'center',
                                    fontSize: "1.6rem",
                                    marginBottom: "12px",
                                    color: "green",
                                }}
                        >
                            {success}
                        </span>
                    )}

                    <button className="register-btn">Register</button>
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
