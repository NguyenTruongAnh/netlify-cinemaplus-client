import './savedMovies.css'
import SavedMovie from '../savedMovie/SavedMovie'
import axios from 'axios'
import userSlice from '../../redux/userSlice'

export default function SavedMovies({ user, dispatch }) {
    const handleDeleteMovie = async (id) => {
        dispatch(userSlice.actions.updateStart())

        const newSavedMovies = [...user.savedMovies]
        const index = newSavedMovies.indexOf(id);
        newSavedMovies.splice(index, 1);

        const updatedUser = {
            userId: user._id,
            savedMovies: newSavedMovies
        }

        try {
            const res = await axios.put("/users/" + user._id, updatedUser)
            if (res.status === 200) {
                dispatch(userSlice.actions.updateSuccess(res.data))
            } else {
                dispatch(userSlice.actions.updateFailure(res.data))
            }
        } catch (err) {
            dispatch(userSlice.actions.updateFailure("Update error, please try again."))
        }
    }

    return (
        <div className="saved-movies">
            <h1 className="saved-movies__title">Saved movies</h1>
            {user.savedMovies.length > 0 ? (
                user.savedMovies.map(movieId => (
                    <SavedMovie
                        key={movieId}
                        movieId={movieId}
                        handleDeleteMovie={handleDeleteMovie}
                    />
                ))
            ) : (
                <div className="saved-movies__empty">
                    <h2>You haven't saved any movies yet</h2>
                    <h2>Let find some movies <a href="/">hear</a></h2>
                </div>
            )}
        </div>
    )
}
