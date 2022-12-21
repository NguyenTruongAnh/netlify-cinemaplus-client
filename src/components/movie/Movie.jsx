import './movie.css'
import { Link } from 'react-router-dom'

const MOVIE_IMAGE_API = "http://image.tmdb.org/t/p/w500"


export default function Movie({ title, poster_path, id }) {

    return (
        <Link 
            className="link" 
            to={"/movies/" + id}
        >
            <div className="movie">
                <div className="movie__wrapper">
                    <img 
                        src={MOVIE_IMAGE_API + poster_path}
                        alt="Movie img"
                        className="movie__img"
                    />
                    <i className="movie__icon far fa-play-circle"></i>
                </div>
                <h2 className="movie__title">
                    { title }
                </h2>
            </div>
        </Link>
    )
}
