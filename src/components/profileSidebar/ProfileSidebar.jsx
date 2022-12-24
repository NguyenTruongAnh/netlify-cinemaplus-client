import './profileSidebar.css'
import './profileSidebarResponsive.css'
import { Link } from 'react-router-dom';

import userSlice from '../../redux/userSlice';

export default function ProfileSidebar({ infoView, setInfoView, dispatch }) {


    const handleLogout = () => {
        dispatch(userSlice.actions.logout())
    }

    return (
        <div className="profile-sidebar">
            <div className="grid">
                <div className="row">
                    <div className="col c-6 m-12 l-12">
                        <div 
                            className={infoView === 0 ? "profile-sidebar__item active" : "profile-sidebar__item"}
                            onClick={() => {
                                if (infoView !== 0) {
                                    setInfoView(0)
                                }
                            }}
                        >
                            <i className="hide-on-mobile fas fa-user-circle"></i>
                            Account
                        </div>
                    </div>

                    <div className="col c-6 m-12 l-12">
                        <div 
                            className={infoView === 1 ? "profile-sidebar__item active" : "profile-sidebar__item"}
                            onClick={() => {
                                if (infoView !== 1) {
                                    setInfoView(1)
                                }
                            }}
                        >
                            <i className="hide-on-mobile fas fa-lock"></i>
                            Change password
                        </div>
                    </div>

                    <div className="col c-6 m-12 l-12">
                        <div 
                            className={infoView === 2 ? "profile-sidebar__item active" : "profile-sidebar__item"}
                            onClick={() => {
                                if (infoView !== 2) {
                                    setInfoView(2)
                                }
                            }}
                        >
                            <i className="hide-on-mobile fas fa-photo-video"></i>
                            Saved movies
                        </div>
                    </div>

                    <div className="col c-6 m-12 l-12">
                        <Link className="link" to="/login">
                            <div className="profile-sidebar__item" onClick={handleLogout}>
                                <i className="hide-on-mobile fas fa-sign-out-alt"></i>
                                Logout
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
