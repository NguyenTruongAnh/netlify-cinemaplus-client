import './header.css'
import './headerResponsive.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../context/Context'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'

export default function Header() {
    const { user } = useContext(Context);

    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const [isOpenSubNavCat, setIsOpenSubNavCat] = useState(false);

    const [genres, setGenres] = useState([])

    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const fetchGenres = async () => {
            const res = await axios.get("/genres")
            setGenres(res.data);
        }

        fetchGenres()
    }, [])

    const handleClick = () => {
        setIsOpenMenu(false)
        setIsOpenSubNavCat(false)
    }

    const navigate = useNavigate();

    const handleOnSubmit = (e) => {
        e.preventDefault()
        
        if (searchTerm) {
            navigate(`/movies/search/` + searchTerm)
            setIsOpenSearch(false)
            setSearchTerm('')
        }
    }

    const handleOnChange = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        <div className="header">
            <div className="row no-gutters">
                <div className="col c-2 m-1 l-0">
                    <div className="header-menu">
                        <div 
                            onClick={() => setIsOpenMenu(!isOpenMenu)}
                            className={isOpenMenu ? "header-menu__btn active" : "header-menu__btn"}
                        >
                            <span className="header-menu__btn-bar"></span>
                        </div>
                    </div>

                    <div 
                        className={isOpenMenu ? "header-mobile__overlay active" : "header-mobile__overlay"}
                        onClick={() => setIsOpenMenu(!isOpenMenu)}    
                    ></div>
                    
                    <div className={isOpenMenu ? "header-mobile-nav active" : "header-mobile-nav"}>
                        <div className="header-mobile-nav__heading">
                            <div 
                                className="header-mobile-nav__logo"
                                onClick={handleClick}    
                            >
                                <i className="fas fa-film"></i>
                                <span>CinemaPlus</span>
                            </div>
                        </div>
                        <div className="header-mobile-nav__info">
                            { user ? (
                                // Đã đăng nhập
                                <>
                                    <Link 
                                        className="link" to="/profile"
                                        onClick={handleClick}    
                                    >
                                        <div className="header-mobile-nav__info-wrapper">
                                            <img 
                                                src={user.profilePicture}
                                                alt="Avatar" 
                                                className="header-mobile-nav__avatar" 
                                            />
                                            <span className="header-mobile-nav__name">{user.displayName}</span>
                                        </div>
                                    </Link>
                                </>
                            ) : (
                                // Chưa đăng nhập
                                <Link 
                                    className="link" to="/login"
                                    onClick={handleClick}
                                >
                                    <div className="header-mobile-nav__info-wrapper">
                                        <i className="header-mobile-nav__icon far fa-user-circle"></i>
                                        <span className="header-mobile-nav__name">Login</span>
                                    </div>
                                </Link>
                            ) }
                        </div>
                        
                        <ul className="header-mobile-nav__list">
                            {/* Trang chủ */}
                            <li 
                                className="header-mobile-nav__item"
                                onClick={handleClick}
                            >
                                <Link 
                                    className="link" 
                                    to="/"
                                >
                                    <div className="header-mobile-nav__item-title">HOME</div>
                                </Link>
                            </li>

                            {/* Thể loại */}
                            <li className="header-mobile-nav__item">
                                <div 
                                    className={isOpenSubNavCat ? "header-mobile-nav__item-title active" : "header-mobile-nav__item-title"}
                                    onClick={() => setIsOpenSubNavCat(!isOpenSubNavCat)}
                                >
                                        Genre
                                    <i className="fas fa-angle-right"></i>
                                </div>
                                <ul className="header-mobile-sub-nav__list">
                                    { genres.map(genre => (
                                        <li 
                                            key={genre.id}
                                            className="header-mobile-sub-nav__item"
                                            onClick={handleClick}
                                        >
                                            <Link 
                                                className="link" 
                                                to={"/movies/genre?name=" + genre.name + "&id=" + genre.id}
                                                key={genre.id}
                                            >
                                                {genre.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            {/* Popular */}
                            <li 
                                className="header-mobile-nav__item"
                                onClick={handleClick}
                            >
                                <Link 
                                    className="link" 
                                    to={"/movies/popular/"}
                                >
                                    <div className="header-mobile-nav__item-title">Popular</div>
                                </Link>
                            </li>

                            {/* Top Rating */}
                            <li 
                                className="header-mobile-nav__item"
                                onClick={handleClick}
                            >
                                <Link 
                                    className="link" 
                                    to={"/movies/top-rating/"}
                                >
                                    <div className="header-mobile-nav__item-title">Top Rating</div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Left */}
                <div className="col c-8 m-10 l-3">
                    <Link className="link" to="/">
                        <div className="header-left">
                            <div className="header-logo">
                                <i className="fas fa-film"></i>
                                <span>CinemaPlus</span>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Center */}
                <div className="col c-0 m-0 l-6">
                    <div className="header-center">
                        <ul className="header-navbar__list">
                            <li className="header-navbar__item">
                                <Link className="link" to="/">
                                    <span>HOME</span>  
                                </Link>
                            </li>
                            <li className="header-navbar__item header-navbar__item-list">
                                <span>Genre</span>
                                <i className="fas fa-caret-down"></i>
                                <ul className="header-sub-navbar__list">
                                    { genres.map(genre => (
                                        <li 
                                            key={genre.id}
                                            className="header-sub-navbar__item">
                                            <Link 
                                                className="link" 
                                                to={"/movies/genre?name=" + genre.name + "&id=" + genre.id}
                                                key={genre.id}
                                            >
                                                {genre.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="header-navbar__item">
                                <Link 
                                    className="link" 
                                    to={"/movies/popular/"}
                                >
                                    <span>
                                        Popular
                                    </span>
                                </Link>
                            </li>
                            <li className="header-navbar__item">
                                <Link 
                                    className="link" 
                                    to={"/movies/top-rating/"}
                                >
                                    <span>
                                        Top Rating
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right */}
                <div className="col c-2 m-1 l-3">
                    <div className="header-right">
                        <i 
                            onClick={() => setIsOpenSearch(!isOpenSearch)}
                            className="header-search__icon fas fa-search"
                        ></i>

                        { user ? (
                            <Link className="link hide-on-mobile-tablet" to="/profile">
                                <img 
                                    className="header-avatar" 
                                    src={user.profilePicture}
                                    alt="Img"
                                />
                            </Link>
                        ) : (
                            <Link className="link hide-on-mobile-tablet" to="/login">
                                <p className="header-login">Login</p>
                            </Link>
                        ) }
                    </div>
                </div>
            </div>

            <div className={isOpenSearch ? "header-search active" : "header-search"}>
                <form onSubmit={handleOnSubmit}>
                    <input 
                        type="text" 
                        className="header-search__input" 
                        placeholder="Enter movie's name..."
                        name="searchTerm"
                        value={searchTerm}
                        onChange={handleOnChange}
                    />
                    <button className="header-search__btn">
                        <i className="fas fa-search"></i>
                    </button>
                </form>
            </div>
        </div>

        
    )
}

