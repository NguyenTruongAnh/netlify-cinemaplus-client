import './movieSlider.css'
import './movieSliderResponsive.css'
import Movie from '../movie/Movie'
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function MovieSlider({ id, title, path }) {
    const settings = {
        dots: false,
        infinite: false,
        arrows: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            }
        ]
    };

    const [movies, setMovies] = useState([])

    useEffect(() => {
        const source = axios.CancelToken.source()
        let url = ""

        if (id === 1) {
            url = `/movies/popular`
        } else if (id === 2) {
            url = `/movies/top-rating`
        } else {
            url = `/movies/genre?genreId=${id}`
        }

        const fetchMovies = async () => {
            try {
                const res = await axios.get(url, { cancelToken: source.token })

                setMovies(res.data.slice(0, 18))
            }
            catch (err) {

            }
        }

        fetchMovies()

        return () => {
            source.cancel()
        }
    }, [id])

    return (
        <div className="movie-slider">
            <div className="movie-slider__title">
                <Link className="link" to={path}>
                    <span className="movie-slider__title-category">{title}</span>
                </Link>
                <Link className="link" to={path}>
                    <span className="movie-slider__title-more">
                        More
                        <i className="movie-slider__title-icon fas fa-angle-double-right"></i>
                    </span>
                </Link>
            </div>
            <Slider
                key={movies.length}
                className="movie-slider__list"
                {...settings}
            >
                {movies.length > 0 && movies.map(movie => (
                    <Movie
                        key={movie.id}
                        {...movie}
                    />
                ))}
            </Slider>
        </div>
    )
}
