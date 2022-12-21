import './homeSliderItem.css'
import './homeSliderItemResponsive.css'
import { Link } from 'react-router-dom';


import { MOVIE_BACKDROP_API } from '../../assets/api/movie_api.jsx'

export default function HomeSliderItem({ id, backdrop_path, title }) {
    return (
        <div className="home-slider-item">
            <Link className="link" to={"/movies/" + id}>
                <div className="home-slider-item__title">{title}</div>
                <div className="home-slider-item__wrapper">
                    <img 
                        src={MOVIE_BACKDROP_API + backdrop_path}
                        alt="Img" 
                        className="home-slider-item__img"
                    />
                </div>
            </Link>
        </div>
    )
}
