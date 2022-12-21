import './home.css'
import MovieSlider from '../../components/movieSlider/MovieSlider'
import ScrollToTop from '../../components/scrollToTop.jsx/ScrollToTop'
import Loading from '../../components/loading/Loading'

import { useState, useEffect } from 'react'
import axios from 'axios'
import HomeSlider from '../../components/homeSlider/HomeSlider'


export default function Home() {
    const [genres, setGenres] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let source = axios.CancelToken.source();

        const fetchGenres = async () => {
            try {
                const res = await axios.get("/genres", { cancelToken: source.token })
                setGenres(res.data)
                setIsLoading(false)
            } catch (err) {

            }
        }
        fetchGenres()

        return () => {
            source.cancel()
        }
    }, [])

    // Scroll to top for first render
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            {isLoading ? <Loading /> :
                <div className="home">
                    <HomeSlider />
                    <div className="grid wide">
                        <div className="row">
                            <div
                                key={1}
                                className="col c-o-1 c-10 m-o-0 m-12 l-12">
                                <MovieSlider
                                    path="/movies/popular/"
                                    id={1}
                                    title="Popular"
                                />
                            </div>

                            <div
                                key={2}
                                className="col c-o-1 c-10 m-o-0 m-12 l-12">
                                <MovieSlider
                                    path="/movies/top-rating"
                                    id={2}
                                    title="Top Rating"
                                />
                            </div>

                            {genres && genres.map(genre => (
                                <div
                                    key={genre.id}
                                    className="col c-o-1 c-10 m-o-0 m-12 l-12">
                                    <MovieSlider
                                        path={"/movies/genre?name=" + genre.name + "&id=" + genre.id}
                                        id={genre.id}
                                        title={genre.name}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <ScrollToTop />
                </div>
            }
        </>
    )
}
