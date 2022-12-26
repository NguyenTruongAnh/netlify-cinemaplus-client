import './comments.css'

import { Link } from 'react-router-dom'
import Comment from '../comment/Comment'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useCallback } from 'react'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import AlertDialog from '../alertDialog/AlertDialog'

export default function Comments({ movieId, user }) {
    const [inputContent, setInputContent] = useState('')
    const [isFetching, setIsFetching] = useState(false)
    const [isFetchingDialog, setIsFetchingDialog] = useState(false)
    const [comments, setComments] = useState([])
    const [countComments, setCountComments] = useState(0)
    const [deleteCommentId, setDeleteCommentId] = useState(null)
    const [openDialog, setOpenDialog] = useState(false)
    const [page, setPage] = useState(1)
    const itemPerPage = 6

    // Function get number of comments
    const getCountComments = useCallback(async () => {
        try {
            const res = await axios.get(`/comments/count-comments/${movieId}`)

            setCountComments(res.data)
        } catch (err) {
            // console.log("Can not get count comments, please try again")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Get number of comments in first mounted
    useEffect(() => {
        getCountComments()

        return () => setCountComments(0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movieId])

    // Function get comments
    const getComments = useCallback(async (page) => {
        try {
            const res = await axios.get(`/comments/${movieId}?page=${page}&maxItem=${itemPerPage}`)

            setComments(res.data)
        } catch (err) {
            // if (err.response) {
            //     console.log(err.response.data)
            // } else {
            //     console.log("Get comments error, please try again")
            // }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movieId])

    // Get comments in first mounted
    useEffect(() => {
        getComments(page)

        return () => setComments([])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movieId])

    const handleDeleteComment = async () => {
        setIsFetchingDialog(true)
        try {
            const data = {
                userId: user._id,
                commentId: deleteCommentId
            }

            await axios.delete(`/comments/delete/${user._id}`, { data: data })
        } catch (err) {
            // if (err.response) {
            //     console.log(err.response.data)
            // } else {
            //     console.log("Delete comment failure")
            // }
        }
        handleReloadComment()
        setIsFetchingDialog(false)
        setDeleteCommentId(null)
        setOpenDialog(false)
    }

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
        setDeleteCommentId(null)
    }

    const handlePageChange = (e, value) => {
        setPage(value)
        getComments(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsFetching(true)

        if (inputContent) {
            try {
                const comment = {
                    userId: user._id,
                    movieId,
                    content: inputContent
                }

                await axios.post(`/comments/${user._id}`, comment)

                handleReloadComment()
            } catch (err) {
                // if (err.response) {
                //     console.log(err.response.data)
                // } else {
                //     console.log("Comment failure")
                // }
            }
        } else {
            alert("Please enter your commnet before submitting")
        }
        setInputContent("")
        setIsFetching(false)
    }

    const handleReloadComment = () => {
        getCountComments()
        getComments(page)
    }

    return (
        <div className="comments">
            <div className="comments__title">
                <span>Comments</span>
            </div>
            {user ? (
                <form className="comments__form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="comments__input"
                        placeholder="Enter your comment..."
                        value={inputContent}
                        onChange={(e) => setInputContent(e.target.value)}
                    />
                    <button className="comments__submit" disabled={isFetching}>
                        <span>Send</span>
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </form>
            ) : (
                <div className="commnets__login">
                    <Link to="/login" target="_blank">Login</Link> {" to comment..."}
                </div>
            )}
            <div className="comments__list">
                {countComments > 0 ? (
                    <>
                        {comments.map((comment) => (
                            <Comment
                                key={comment._id}
                                data={comment}
                                user={user}
                                movieId={movieId}
                                handleOpenDialog={handleOpenDialog}
                                setDeleteCommentId={setDeleteCommentId}
                                handleReloadComment={handleReloadComment}
                            />
                        ))}
                        <Stack spacing={2}>
                            <Pagination
                                count={Math.ceil(countComments / itemPerPage)}
                                page={page}
                                onChange={handlePageChange}
                            />
                        </Stack>
                    </>
                ) : (
                    <p className="comments__empty">
                        There are no comments yet.
                    </p>
                )}
            </div>
            <AlertDialog
                title="Delete comment"
                message="Do you want to delete this comment?"
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                handleDelete={handleDeleteComment}
                isFetching={isFetchingDialog}
            />
        </div>
    )
}