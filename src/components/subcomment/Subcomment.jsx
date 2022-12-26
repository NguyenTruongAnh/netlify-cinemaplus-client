import './subcomment.css';
import { formatTimeAgo } from '../../ultils/format'

export default function Subcomment({ data, user, handleOpenDialog, setDeleteSubcommentId }) {
    const handleSelectDelete = (subcommentId) => {
        handleOpenDialog()
        setDeleteSubcommentId(subcommentId)
    }

    return (
        <div className="subcomment">
            <div className="subcomment__avatar">
                <img src={data.userId.profilePicture} alt="Avatar" />
            </div>
            <div className="subcomment__content">
                <div className="subcomment__info">
                    <span className="subcomment__name">{data.userId.displayName}</span>
                    <span className="subcomment__time"> - {formatTimeAgo(new Date(data.createdAt))}</span>
                </div>
                <p className="subcomment__text">
                    {data.content}
                </p>
                <div className="subcomment__controls">
                    {user && user._id === data.userId._id && (
                        <div className="subcomment__control" onClick={() => handleSelectDelete(data._id)}>
                            <i className="fa-solid fa-trash"></i>
                            <span>Delete</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}