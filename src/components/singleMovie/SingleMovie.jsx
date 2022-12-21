import './singleMovie.css'
import './singleMovieResponsive.css'
import MovieSimilar from '../movieSimilar/MovieSimilar'

import { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Loading from '../loading/Loading'
import { Context } from '../../context/Context'

export default function SingleMovie() {
    const { movieId } = useParams()
    const [movie, setMovie] = useState({})
    const [play, setPlay] = useState(false)
    const [isloading, setIsLoading] = useState(false)

    const { user, dispatch } = useContext(Context)

    useEffect(() => { 
        let source = axios.CancelToken.source();
        
        const fetchMovie = async () => {
            try {
                window.scrollTo(0, 0)
                setIsLoading(true)
                const res = await axios.get(`/movies/${movieId}`, {cancelToken: source.token})
                setMovie(res.data)

                setIsLoading(false)
                setPlay(false)
            } catch(err) {

            }
            
        }

        fetchMovie()

        return () => {
            source.cancel()
        }
    }, [movieId])


    const handlePlayMovie = () => {
        window.scrollTo(0, 0)
        setPlay(true)
    }

    const handleSaveMovie = async () => {
        dispatch({type:"UPDATE_START"})

        const newSavedMovies = user.savedMovies
        newSavedMovies.push(movieId.toString())

        const updatedUser = {
            userId: user._id,
            savedMovies: newSavedMovies
        }

        try {
            const res = await axios.put("/users/" + user._id, updatedUser)

            dispatch({type:"UPDATE_SUCCESS", payload: res.data })
        } catch(err) {
            dispatch({type:"UPDATE_FAILURE"})
        }
    }

    return (
        <>
            {isloading ? <Loading /> :
                <div 
                    key={movieId}
                    className="single-movie"
                >
                    <div 
                        className="single-movie__overlay"
                        style={{
                            backgroundImage: `url('http://image.tmdb.org/t/p/w1280/${movie.backdrop_path}')`
                        }}
                    >
                    </div>
                    <div className="row">
                        <div className="col c-o-1 c-10 m-o-0 m-12">
                                {!play ? '' : 
                                    <div className="single-movie__src">
                                        <iframe 
                                            id="iframe" 
                                            src={"https://2embed.org/embed/movie?tmdb=" + movieId} 
                                            title={movieId}
                                            width="100%" 
                                            height="100%" 
                                            frameborder="0"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                }
                        </div>

                        {/* Ảnh của movie */}
                        <div className="col c-o-2 c-8 m-o-0 m-4 l-4">
                            <img 
                                className="single-movie__img" 
                                src={movie.poster_path && `http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                alt="MovieImg"  
                            />
                        </div>

                        {/* Các nút thao tác */}
                        <div className="col c-o-1 c-10 m-o-0 m-8 l-8">
                            <div className="single-movie__main">
                                <div className="single-movie__heading">
                                    <i className="fas fa-crown"></i>
                                    <span>Free</span>
                                </div>
                                <p className="single-movie__title">
                                    { movie.title }
                                </p>
                                <p className="single-movie__sub-title">
                                    { movie.original_title }
                                </p>
                                <ul className="single-movie__actions">
                                    <li className="single-movie__action">
                                        <i className="fas fa-star"></i>
                                        <span>{ movie.vote_average }/10</span>
                                    </li>
                                    <li className="single-movie__action">
                                        <i className="fas fa-share-alt"></i>
                                        <span>Share</span>
                                    </li>
                                    <li className="single-movie__action single-movie__action--warn">
                                        <i className="fas fa-exclamation-triangle"></i>
                                        <span>Report</span>
                                    </li>
                                </ul>

                                <div className="single-movie__btns">
                                    {/* Play Movie Btn */}
                                    <button className="single-movie__btn single-movie__btn--play" onClick={handlePlayMovie}>
                                        <i className="fas fa-play"></i>
                                        Play
                                    </button>

                                    {/* Save Movie Btn */}
                                    { !user && (
                                        <Link className="link" to="/login" target='_blank'>
                                            <button className="single-movie__btn single-movie__btn--save">
                                                <i className="fas fa-save"></i>
                                                Save
                                            </button>
                                        </Link>
                                        ) 
                                    }

                                    { user && !user.savedMovies.includes(movieId) && (
                                        <button className="single-movie__btn single-movie__btn--save" onClick={handleSaveMovie}>
                                            <i className="fas fa-save"></i>
                                            Save
                                        </button>
                                    ) }

                                    

                                    {/* Has saved Movie Btn */}
                                    { user && user.savedMovies.includes(movieId) && 
                                        (<button className="single-movie__btn single-movie__btn--saved">
                                            <i className="fas fa-check"></i>
                                            Saved
                                        </button>)
                                    }
                                </div>

                                <div className="single-movie__info">
                                    <div className="row">
                                        <div className="col c-12 m-6 l-6">
                                            <ul className="single-movie__info-list">
                                                <li className="single-movie__info-item">
                                                    <span>Status: </span>
                                                    { movie.status }
                                                </li>
                                                <li className="single-movie__info-item">
                                                    <span>Duration: </span>
                                                    { movie.runtime } minutes
                                                </li>
                                                <li className="single-movie__info-item">
                                                    <span>Categories: </span>
                                                    { movie.genres && 
                                                        movie.genres.map(genre => genre.name).join(', ')
                                                    }
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col c-12 m-6 l-6">
                                            <ul className="single-movie__info-list">
                                                <li className="single-movie__info-item">
                                                    <span>Country: </span>
                                                    { movie.production_countries && 
                                                        (movie.production_countries.length > 0 ? movie.production_countries.at(-1).name : 'undefined')
                                                    }
                                                </li>
                                                <li className="single-movie__info-item">
                                                    <span>Release year: </span>
                                                    { movie.release_date && movie.release_date.substring(0, 4) }
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mô tả về phim */}
                        <div className="col c-12 m-12 l-12">
                            <div className="single-movie__desc">
                                <h1 className="single-movie__desc-title">
                                    Content
                                </h1>
                                <p className="single-movie__desc-content">
                                    {movie.overview}
                                </p>
                            </div>
                        </div>

                        <div className="col c-o-1 c-10 m-o-0 m-12">
                            <MovieSimilar id={ movieId }/>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
