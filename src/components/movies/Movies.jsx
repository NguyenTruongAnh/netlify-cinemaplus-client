import './movies.css'
import Movie from '../movie/Movie'

export default function Movies({ movies, title }) {

    return (
        <div className="movies">
            <div className="grid wide">
                <div className="row">
                    <div className="col c-12">
                        <h1 className="movies__category">{ title }</h1>
                    </div>

                    { movies.map(movie => (
                        <div 
                            className="col c-6 m-4 l-2-4"
                            key={movie.id}
                        >
                            <Movie 
                                {...movie}
                            />
                        </div>
                    )) }
                </div>
            </div>
        </div>
    )
}
