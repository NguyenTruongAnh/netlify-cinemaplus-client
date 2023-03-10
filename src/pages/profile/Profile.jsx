import ProfileEdit from '../../components/profileEdit/ProfileEdit'
import ProfileInfo from '../../components/profileInfo/ProfileInfo'
import ProfileSidebar from '../../components/profileSidebar/ProfileSidebar'
import ProfilePassword from '../../components/profilePassword/ProfilePassword'
import ScrollToTop from '../../components/scrollToTop.jsx/ScrollToTop'

import './profile.css'
import { useState, useEffect } from 'react'
import SavedMovies from '../../components/savedMovies/SavedMovies'
import { useDispatch, useSelector } from 'react-redux'
import { userInfoSelector } from '../../redux/selectors'


export default function Profile() {
    const [edit, setEdit] = useState(false)
    const [infoView, setInfoView] = useState(0)
    const user = useSelector(userInfoSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="profile">
            <div className="grid wide">
                <div className="row">
                    <div className="col c-12 m-4 l-4">
                        <ProfileSidebar 
                            infoView = {infoView}
                            setInfoView = {setInfoView}
                            dispatch = {dispatch}
                        />
                    </div>

                    <div className="col c-12 m-8 l-8">
                        { infoView === 0 && (
                            <ProfileInfo 
                                edit = {edit}
                                setEdit = {setEdit}
                                user = {user}
                            />) 
                        }
                        { infoView === 1 && (
                            <ProfilePassword 
                                user = {user}
                            />)
                        }
                        { infoView === 2 && (
                            <SavedMovies
                                user = {user}
                                dispatch = {dispatch}
                            />)
                        }
                    </div>
                </div>
            </div>

            {edit && 
                <ProfileEdit 
                    edit = {edit}
                    setEdit = {setEdit}
                    user = {user}
                    dispatch = {dispatch}
                />
            }

            <ScrollToTop />
        </div>
    )
}
