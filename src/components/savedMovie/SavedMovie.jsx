import './savedMovie.css'
import LoadMore from '../loadMore/LoadMore'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function SavedMovie({ movieId, handleDeleteMovie }) {
    const [movie, setMovie] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let source = axios.CancelToken.source();
        
        const fetchMovie = async () => {
            try {
                const res = await axios.get(`/movies/${movieId}`, {cancelToken: source.token})
                setMovie(res.data)
                setIsLoading(false)
            } catch(err) {

            }
        }

        fetchMovie()

        return () => {
            source.cancel()
        }
    }, [movieId])

    return (
        <div className="saved-movie">
            { isLoading ? <LoadMore /> : (
                <div className="saved-movie__wrapper">
                    <div className="saved-movie__info">
                        <Link 
                            className="link" 
                            to={"/movies/" + movieId}
                            target='_blank'
                        >
                            <img 
                                src={movie.poster_path && `http://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                                alt="Movie" 
                                className="saved-movie__img" 
                            />
                            <p className="saved-movie__title">{ movie.title }</p>
                        </Link>
                    </div>
                    <div className="saved-movie__btns">
                        <Link 
                            className="link" 
                            to={"/movies/" + movieId}
                            target='_blank'
                        >
                            <button className="saved-movie__view">View</button>
                        </Link>
                        <button className="saved-movie__delete" onClick={() => handleDeleteMovie(movieId)}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    )
}
