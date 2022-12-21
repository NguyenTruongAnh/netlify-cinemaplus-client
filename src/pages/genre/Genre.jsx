import './genre.css'
import Movies from '../../components/movies/Movies'
import ScrollToTop from '../../components/scrollToTop.jsx/ScrollToTop'
import Loading from '../../components/loading/Loading'
import LoadMore from '../../components/loadMore/LoadMore'

import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import axios from 'axios'

export default function Genre() {
    const [movies, setMovies] = useState([])
    const [numPage, setNumPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadMore, setIsLoadMore] = useState(false)
    const [hasMore, setHasMore] = useState(true)

    const location = useLocation()
    const genreName = location.search.split("&")[0].slice(6)
    const genreId = location.search.split("&")[1].slice(3)
    
    useEffect(() => {
        const fetchMovies = async () => {
            const res = await axios.get(`/movies/genre?genreId=${genreId}&page=${numPage}`)

            const dataFilter = res.data.filter(movie => movie.poster_path)
            setMovies(curr => [...curr, ...dataFilter])

            // Check if we can load more movies when click btn or not
            setHasMore(res.data.length === 20)

            // Load more completed
            setIsLoadMore(false)
        }

        numPage > 1 && fetchMovies()

    }, [genreId, numPage])

    useEffect(() => {
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(true)

            const fetchMovies = async () => {
                const res = await axios.get(`/movies/genre?genreId=${genreId}&page=1`)
    
                const dataFilter = res.data.filter(movie => movie.poster_path)
                setMovies([...dataFilter])
    
                // Loading movies completed in first render
                setIsLoading(false)
    
                // Check if we can load more movies when click btn or not
                setHasMore(res.data.length === 20)
    
                setNumPage(1)
    
                window.scrollTo(0, 0)
            }
    
            fetchMovies()
        }, 2000)

    }, [genreId])

    const handleLoadMore = () => {
        setIsLoadMore(true)
        setNumPage(curr => curr + 1)
    }

    return (
        <>
            {isLoading ? <Loading/> :
                <div key={genreId} className="genre">
                    { movies && (
                        <Movies 
                            movies={movies}
                            title={genreName}
                        />
                    ) }

                    {hasMore && 
                        <div className="loading-wrapper">
                            {isLoadMore ? <LoadMore /> :
                                <button 
                                    className="btn-loading"
                                    onClick={handleLoadMore}
                                >More</button>
                            }
                        </div>
                    }

                    <ScrollToTop />
                </div>
            }
        </>
    )
}
