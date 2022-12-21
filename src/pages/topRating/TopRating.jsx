import './topRating.css'
import Movies from '../../components/movies/Movies'
import ScrollToTop from '../../components/scrollToTop.jsx/ScrollToTop'
import Loading from '../../components/loading/Loading'
import LoadMore from '../../components/loadMore/LoadMore'

import { useState, useEffect } from 'react'
import axios from 'axios'

export default function TopRating() {
    const [movies, setMovies] = useState([])
    const [numPage, setNumPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadMore, setIsLoadMore] = useState(false)
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        let source = axios.CancelToken.source();

        const fetchMovies = async () => {
            try {
                const res = await axios.get(`/movies/top-rating?page=${numPage}`, {cancelToken: source.token})
                
                const dataFilter = res.data.filter(movie => movie.poster_path)
                setMovies(curr => [...curr, ...dataFilter])
    
                // Loading movies completed in first render
                numPage === 1 && setIsLoading(false)
    
                // Check if we can load more movies when click btn or not
                setHasMore(res.data.length === 20)
    
                // Load more completed
                setIsLoadMore(false)

                // Scroll to Top in the first render
                numPage === 1 && window.scrollTo(0, 0)
            } catch (err) {

            }
        }

        fetchMovies()

        return () => {
            source.cancel()
        }
    }, [numPage])

    const handleLoadMore = () => {
        setIsLoadMore(true)
        setNumPage(curr => curr + 1)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            {isLoading ? <Loading/> : 
                <div className="top-rating">
                    { movies && (
                        <Movies 
                            movies={movies}
                            title="Top Rating"
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
