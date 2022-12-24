import './assets/css/base.css';
import './assets/css/grid.css';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userInfoSelector } from './redux/selectors';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Single from './pages/single/Single';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Popular from './pages/popular/Popular';
import TopRating from './pages/topRating/TopRating';

import {
  BrowserRouter as Router,
  Routes ,
  Route
} from "react-router-dom";
import Search from './pages/search/Search';
import Genre from './pages/genre/Genre';

function App() {
  const user = useSelector(userInfoSelector);

  useEffect(() => {
    localStorage.setItem("userCinema", JSON.stringify(user));
  }, [user])

  return (
    <Router>
      <Header />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={user ? <Home /> : <Login />}
        />

        <Route
          path="/register"
          element={user ? <Home /> : <Register />}
        />

        <Route
          path="/profile"
          element={user ? <Profile /> : <Login />}
        />

        <Route
          path="/movies/genre"
          element={<Genre />}
        />

        <Route
          path="/movies/popular"
          element={<Popular />}
        />

        <Route
          path="/movies/top-rating"
          element={<TopRating />}
        />

        <Route
          path="/movies/:movieId"
          element={<Single />}
        />    

        <Route
          path="/movies/search/:movieTerm"
          element={<Search />}
        />    

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
