import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { JobsContext } from '../App';
import logo from '../images/desktop/logo.svg';
import sun from '../images/desktop/icon-sun.svg';
import moon from '../images/desktop/icon-moon.svg';

const Header = () => {
    const { BASE_URL, fetchGithubAPI, lightTheme, setLightTheme, setSearchInput, setLocationInput, setFullTime, setSearchURL, mobileFilter } = useContext(JobsContext);
    const htmlTag = document.body.parentElement;
    const background = 'bg-pattern-header.svg';

    useEffect(() => {
        if (!localStorage.getItem('theme')) {
            setLightTheme(true)
            localStorage.setItem('theme', 'light')
            htmlTag.setAttribute('data-theme', 'light')
        } else {
            htmlTag.setAttribute('data-theme', localStorage.getItem('theme'))
        }
    }, [])

    const switchTheme = () => {
        if (!lightTheme) {
            localStorage.setItem('theme', 'light')
            htmlTag.setAttribute('data-theme', localStorage.getItem('theme'))
            setLightTheme(true)
        } else {
            localStorage.setItem('theme', 'dark')
            htmlTag.setAttribute('data-theme', localStorage.getItem('theme'))
            setLightTheme(false)
        }
    }
    
    const resetSearchBar = () => {
        fetchGithubAPI(`${BASE_URL}.json`)
        setSearchURL('')
        setSearchInput('')
        setLocationInput('')
        setFullTime(false)
        sessionStorage.setItem('search URL', '')
    }

    return (
        <div className={`header ${mobileFilter ? 'blur' : ''}`}>
            <div className="header__backgrounds">
                <img className="background__desktop" src={require(`../images/desktop/` + background)} alt="" />
                <img className="background__mobile" src={require(`../images/mobile/` + background)} alt="" />
            </div>
            <div className="header__inner">
                <Link to="/" onClick={() => resetSearchBar()}>
                    <img className="header__logo" src={logo} alt="DevJobs company logo" />
                </Link>
                <div className="header__toggle">
                    <span>
                        <img src={sun} alt="Sun illustration" />
                    </span>
                    <button
                       className={`header__toggle__btn ${!lightTheme ? 'active' : ''}`}
                        aria-label="Set page theme to either light or dark"
                        onClick={() => switchTheme()}
                    >
                        <span className="slider" />
                    </button>
                    <span>
                        <img src={moon} alt="Moon illustration" />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Header