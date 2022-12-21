import './profileInfo.css'
import './profileInfoResponsive.css'

export default function ProfileInfo({ edit, setEdit, user }) {
    return (
        <>
            {user && 
                <div className="profile-info">
                    <h1 className="profile-info__title">Account Information</h1>
                    <img 
                        className="profile-info__avatar"
                        src={user.profilePicture}
                        alt="Avatar"
                    />
        
                    <div className="profile-info__name">{user.displayName}</div>
        
                    <div className="profile-info__list">
                        <div className="grid">
                            <div className="row">
                                <div className="col c-o-1 c-10 m-o-0 m-6 l-6">
                                    <div className="profile-info__item">
                                        <div className="profile-info__item-wrapper">
                                            <i className="fas fa-user-alt"></i>
                                            <div className="profile-info__item-content">
                                                <label>Phone</label>
                                                <p>{user.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
        
                                <div className="col c-o-1 c-10 m-o-0 m-6 l-6">
                                    <div className="profile-info__item">
                                        <div className="profile-info__item-wrapper">
                                            <i className="fas fa-id-card"></i>
                                            <div className="profile-info__item-content">
                                                <label>ID</label>
                                                <p>User Id</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
        
                                <div className="col c-o-1 c-10 m-o-0 m-6 l-6">
                                    <div className="profile-info__item">
                                        <div className="profile-info__item-wrapper">
                                            <i className="fas fa-envelope"></i>
                                            <div className="profile-info__item-content">
                                                <label>Email</label>
                                                <p>{user.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
        
                                <div className="col c-o-1 c-10 m-o-0 m-6 l-6">
                                    <div className="profile-info__item">
                                        <div className="profile-info__item-wrapper">
                                            <i className="fas fa-calendar-week"></i>
                                            <div className="profile-info__item-content">
                                                <label>Birthdate</label>
                                                <p>{new Date(user.birthDate).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
        
                                <div className="col c-o-1 c-10 m-o-0 m-6 l-6">
                                    <div className="profile-info__item">
                                        <div className="profile-info__item-wrapper">
                                            <i className="fas fa-venus-mars"></i>
                                            <div className="profile-info__item-content">
                                                <label>Gender</label>
                                                <p>{user.gender}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
        
                                <div className="col c-o-1 c-10 m-o-0 m-6 l-6">
                                    <div className="profile-info__item">
                                        <div className="profile-info__item-wrapper">
                                            <i className="fas fa-map-marker-alt"></i>
                                            <div className="profile-info__item-content">
                                                <label>Region</label>
                                                <p>{user.region}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        
                    <button 
                        className="profile-info__btn"
                        onClick={() => setEdit(!edit)}
                    >
                        <i className="fas fa-edit"></i>
                        Edit
                    </button>
                </div>
            }
        </>
    )
}
