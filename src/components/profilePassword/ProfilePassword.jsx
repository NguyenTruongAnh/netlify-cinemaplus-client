import './profilePassword.css'
import { useState } from 'react'
import axios from 'axios'

export default function ProfilePassword({ user }) {
    const [currPassword, setCurrPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [errorMess, setErrorMess] = useState("")
    const [successMess, setSuccessMess] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSuccessMess("")
        setErrorMess("")

        if (currPassword && newPassword && repeatPassword) {
            if (newPassword === repeatPassword) {
                const updatedUser = {
                    userId: user._id,
                    oldPassword: currPassword,
                    newPassword: newPassword,
                }

                try {
                    const res = await axios.put("/users/change-password/" + user._id, updatedUser)

                    if (res.status === 200) {
                        setErrorMess("")
                        setSuccessMess("Change password successfully")
                        setCurrPassword("")
                        setNewPassword("")
                        setRepeatPassword("")
                    } else {
                        setErrorMess("Change password failure, please try again")
                    }
                } catch(err) {
                    setErrorMess("Your old password is incorrect")
                }
            } else {
                setErrorMess("Retype password is incorrect!")
            }
        } else {
            setErrorMess("Missing input value!")
        }
    }

    return (
        <div className="profile-password">
            <h1 className="profile-password__title">Change Password</h1>
            <form className="profile-password__form" onSubmit={handleSubmit}>
                <ul className="profile-password__list">
                    <li className="profile-password__item">
                        <div className="grid">
                            <div className="row">
                                <div className="col c-o-1 c-10 m-o-0 m-5 l-5">
                                    <label htmlFor="profile-password__old">Current password</label>
                                </div>
                                <div className="col c-o-1 c-10 m-o-0 m-7 l-7">
                                    <input 
                                        id="profile-password__old"
                                        type="password" 
                                        placeholder="********"
                                        value={currPassword}
                                        onChange={(e) => setCurrPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </li>
                    <div className="profile-password__item">
                        <div className="grid">
                            <div className="row">
                                <div className="col c-o-1 c-10 m-o-0 m-5 l-5">
                                    <label htmlFor="profile-password__new">New password</label>
                                </div>
                                <div className="col c-o-1 c-10 m-o-0 m-7 l-7">
                                    <input 
                                        id="profile-password__new"
                                        type="password" 
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-password__item">
                        <div className="grid">
                            <div className="row">
                                <div className="col c-o-1 c-10 m-o-0 m-5 l-5">
                                    <label htmlFor="profile-password__repeat">Retype new password</label>
                                </div>
                                <div className="col c-o-1 c-10 m-o-0 m-7 l-7">
                                    <input 
                                        id="profile-password__repeat"
                                        type="password" 
                                        placeholder="Retype new password"
                                        value={repeatPassword}
                                        onChange={(e) => setRepeatPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </ul>
                { errorMess && (
                    <span
                        style={
                            {
                                width:"100%",
                                textAlign:"center",
                                marginBottom:"14px",
                                fontSize:"1.4rem",
                                color:"red",
                                fontWeight:"600"
                            }
                        }
                    >
                        {errorMess}
                    </span>
                ) }

                { successMess && (
                    <span
                        style={
                            {
                                width:"100%",
                                textAlign:"center",
                                marginBottom:"14px",
                                fontSize:"1.4rem",
                                color:"green",
                                fontWeight:"600"
                            }
                        }
                    >
                        {successMess}
                    </span>
                ) }
                <button className="profile-password__btn" type="submit">Save</button>
            </form>

        </div>
    )
}
