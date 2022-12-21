import './movieSimilar.css'
import './movieSimilarResponsive.css'
import Movie from '../movie/Movie'

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { useState, useEffect } from 'react'
import axios from 'axios'

export default function MovieSimilar({ id }) {
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
        let source = axios.CancelToken.source();

        const fetchMovies = async () => {
            try {
                const randomPage = Math.floor(Math.random() * (10 - 1) + 1)
                const res = await axios.get(`/movies/similar/${id}?page=${randomPage}`, {cancelToken: source.token})
                const filterData = res.data.filter(movie => movie.id !== id)
                setMovies(filterData)
            } catch(err) {

            }
            
        }

        fetchMovies()

        return () => {
            source.cancel()
        }
    }, [id])

    return (
        <div className="movie-similar">
            <div className="movie-similar__title">
                <span className="movie-similar__title-category">Similar</span>
            </div>
            <Slider 
                key={movies.length}
                className="movie-similar__list" 
                {...settings}
            >
                { movies.length > 0 && movies.map(movie => (
                    <Movie 
                        key={movie.id}
                        {...movie}
                    />
                )) }
            </Slider>
        </div>
    )
}
