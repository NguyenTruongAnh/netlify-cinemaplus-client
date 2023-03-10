import './homeSlider.css';
import './homeSliderResponsive.css';

import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import HomeSliderItem from '../homeSliderItem/HomeSliderItem'
import { useEffect, useState } from 'react'
import axios from 'axios'

function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
        <div
            className={className}
            onClick={onClick}
        >
            <i className="fa-solid fa-chevron-left"></i>
        </div>
    );
}

function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
        <div
            className={className}
            onClick={onClick}
        >
            <i className="fa-solid fa-chevron-right"></i>
        </div>
    );
}

export default function HomeSlider() {
    const settings = {
        dots: true,
        infinite: true,
        arrows: true,
        fade: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    arrows: false,
                }
            },
        ]
    }

    const [movies, setMovies] = useState([])

    useEffect(() => {
        const source = axios.CancelToken.source()

        const fetchMovies = async () => {
            try {
                const res = await axios.get('/movies/now-playing', { cancelToken: source.token })

                setMovies(res.data.slice(0, 6))
            }
            catch (err) {

            }
        }

        fetchMovies()

        return () => {
            source.cancel()
        }
    }, [])

    return (
        <div className="home-slider">
            <Slider
                className="home-slider__list"
                {...settings}
            >
                {movies.map(movie => (
                    <HomeSliderItem key={movie.id} {...movie} />
                ))}
            </Slider>
        </div>
    )
}
