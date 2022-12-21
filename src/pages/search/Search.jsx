import './search.css'
import Movies from '../../components/movies/Movies'
import ScrollToTop from '../../components/scrollToTop.jsx/ScrollToTop'

import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import axios from 'axios'

import Loading from '../../components/loading/Loading'
import LoadMore from '../../components/loadMore/LoadMore'


export default function Search() {
    const [movies, setMovies] = useState([])
    const [numPage, setNumPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [loadMore, setLoadMore] = useState(false)
    const [hasMore, setHasMore] = useState(false)

    const location = useLocation()
    const path = location.pathname.split('/')[3]

    useEffect(() => {
        setLoading(true)
        
        const fetchMovies = async () => {
            const res = await axios.get(`/movies/search?keyword=${path}&page=1`)

            if (res.data.length === 20) {
                setHasMore(true)
            }

            const dataFilter = res.data.filter(movie => movie.poster_path)
            setMovies(dataFilter)
            setLoading(false)
            setNumPage(1)
        }

        fetchMovies()

        window.scrollTo(0, 0)
    }, [path])

    useEffect(() => {
        if (numPage > 1) {
            const fetchMovies = async () => {
                const res = await axios.get(`/movies/search?keyword=${path}&page=${numPage}`)

                if (res.data.length < 20) {
                    setHasMore(false)
                }

                const dataFilter = res.data.filter(movie => movie.poster_path)
                setMovies(curr => [...curr, ...dataFilter])
                setLoading(false)
                setLoadMore(false)
            }

            fetchMovies()
        }
    }, [numPage, path])

    const handleLoadMore = () => {
        setLoadMore(true)
        setNumPage(curr => curr + 1)
    }

    return (
        <>
            {loading ? <Loading /> :
                <div 
                    key={path}
                    className="search">
                    <Movies 
                        movies={movies}
                        title={"Result searching for " + path}
                    />

                    {hasMore && 
                        <div className="loading-wrapper">
                            {loadMore ? <LoadMore /> :
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
