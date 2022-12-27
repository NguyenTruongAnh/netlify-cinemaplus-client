import { useState, useEffect, useCallback } from 'react'
import { formatTimeAgo } from '../../ultils/format'
import Subcomment from '../subcomment/Subcomment'
import AlertDialog from '../alertDialog/AlertDialog'
import axios from 'axios'

import './comment.css'
import './commentResponsive.css'

export default function Comment({ data, user, movieId, handleOpenDialog, setDeleteCommentId, handleReloadComment }) {
    const [openInput, setOpenInput] = useState(false)
    const [inputContent, setInputContent] = useState('')
    const [isFetching, setIsFetching] = useState(false)
    const [showSubcomment, setShowSubcomment] = useState(false)
    const [countSubcomments, setCountSubcomments] = useState(0)
    const [subcomments, setSubcomments] = useState([])
    const [page, setPage] = useState(1)
    const itemPerGet = 3

    const [openCommentDialog, setOpenCommentDialog] = useState(false)
    const [deleteSubcommentId, setDeleteSubcommentId] = useState(null)
    const [isFetchingDialog, setIsFetchingDialog] = useState(false)

    // Function get number of subcomment
    const getCountSubcomments = useCallback(async () => {
        try {
            const res = await axios.get(`/comments/count-subcomments/${data._id}`)

            setCountSubcomments(res.data)
        } catch (err) {
            // if (err.response) {
            //     console.log(err.response.data)
            // } else {
            //     console.log("Get count subcomments failure")
            // }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Get number of subcomments in first mounted
    useEffect(() => {
        getCountSubcomments()

        return () => setCountSubcomments(0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Function get subcomment
    const getSubcomments = useCallback(async (page) => {
        try {
            const res = await axios.get(`/comments/subcomments/${data._id}?page=${page}&maxItem=${itemPerGet}`)

            setSubcomments(res.data)
        } catch (err) {
            // if (err.response) {
            //     console.log(err.response.data)
            // } else {
            //     console.log("Get subcomments failure")
            // }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Get subcomments in first mounted
    useEffect(() => {
        getSubcomments(page)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleLoadMore = () => {
        setPage(page + 1)
        getSubcomments(page + 1)
    }

    const handleSelectDelete = (id) => {
        handleOpenDialog()
        setDeleteCommentId(id)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsFetching(true)

        if (inputContent) {
            try {
                const comment = {
                    userId: user._id,
                    parentId: data._id,
                    movieId: movieId,
                    content: inputContent,
                }

                await axios.post(`/comments/${user._id}`, comment)

                getCountSubcomments()
                getSubcomments(page)
            } catch (err) {
                if (err.response) {
                    if (err.response.status === 401) {
                        handleReloadComment()
                    }
                    // console.log(err.response.data)
                } else {
                    // console.log("Comment failure")
                }
            }
        } else {
            alert('Please enter your comment before submitting')
        }
        setInputContent("")
        setIsFetching(false)
    }

    const handleOpenCommentDialog = () => {
        setOpenCommentDialog(true)
    }

    const handleCloseCommentDialog = () => {
        setOpenCommentDialog(false)
    }

    const handleDeleteSubcomment = async () => {
        setIsFetchingDialog(true)
        try {
            const data = {
                userId: user._id,
                commentId: deleteSubcommentId
            }

            await axios.delete(`/comments/delete/${user._id}`, { data: data })
        } catch (err) {
            // if (err.response) {
            //     console.log(err.response.data)
            // } else {
            //     console.log("Delete comment failure")
            // }
        }
        getSubcomments(page)
        getCountSubcomments()
        setIsFetchingDialog(false)
        setOpenCommentDialog(false)
        setDeleteSubcommentId(null)
    }

    return (
        <div className="comment">
            <div className="comment__avatar">
                <img src={data.userId.profilePicture} alt="Avatar" />
            </div>
            <div className="comment__content">
                <div className="comment__info">
                    <span className="comment__name">{data.userId.displayName}</span>
                    <span className="comment__time"> - {formatTimeAgo(new Date(data.createdAt))}</span>
                </div>
                <p className="comment__text">
                    {data.content}
                </p>
                <div className="comment__controls">
                    {user && (
                        <div
                            className="comment__control"
                            onClick={() => setOpenInput(true)}
                        >
                            <i className="fa-solid fa-reply"></i>
                            <span>Reply</span>
                        </div>
                    )}
                    {user && user._id === data.userId._id && (
                        <div
                            className="comment__control"
                            onClick={() => handleSelectDelete(data._id)}
                        >
                            <i className="fa-solid fa-trash"></i>
                            <span>Delete</span>
                        </div>
                    )}
                </div>
                <form className={openInput ? "comment__form active" : "comment__form"} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="comment__input"
                        placeholder="Enter your comment..."
                        value={inputContent}
                        onChange={(e) => setInputContent(e.target.value)}
                    />
                    <div className="comment__btns">
                        <button type="button" className="comment__btn comment__cancel" onClick={() => setOpenInput(false)}>
                            <span>Cancel</span>
                        </button>
                        <button type="submit" className="comment__btn comment__submit" disabled={isFetching}>
                            <span>Send</span>
                            <i className="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>
                </form>
                {countSubcomments > 0 && (
                    <div className="comment__show">
                        {showSubcomment ? (
                            <div onClick={() => setShowSubcomment(false)}>
                                <span>Hide {countSubcomments} comments</span>
                                <i className="fa-solid fa-chevron-up"></i>
                            </div>
                        ) : (
                            <div onClick={() => setShowSubcomment(true)}>
                                <span>Show {countSubcomments} comments</span>
                                <i className="fa-solid fa-chevron-down"></i>
                            </div>
                        )}
                    </div>
                )}
                {showSubcomment && (
                    <div className="comment__list">
                        {countSubcomments > 0 && (
                            subcomments.map((subcomment) => (
                                <Subcomment
                                    data={subcomment}
                                    key={subcomment._id}
                                    handleOpenDialog={handleOpenCommentDialog}
                                    setDeleteSubcommentId={setDeleteSubcommentId}
                                    user={user}
                                />
                            ))
                        )}
                        {countSubcomments > subcomments.length && (
                            <div className="comment__more" onClick={handleLoadMore}>
                                <span>Load more</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <AlertDialog
                title="Delete subcomment"
                message="Do you want to delete this subcomment?"
                openDialog={openCommentDialog}
                handleCloseDialog={handleCloseCommentDialog}
                handleDelete={handleDeleteSubcomment}
                isFetching={isFetchingDialog}
            />
        </div>
    )
}
