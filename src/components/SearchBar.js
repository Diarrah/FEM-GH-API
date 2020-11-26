import React, { useContext } from 'react';
import { JobsContext } from '../App';
import check from '../images/desktop/icon-check.svg';
import close from '../images/mobile/close.svg';

const SearchBar = () => {
    const { BASE_URL, fetchGithubAPI, searchInput, setSearchInput, locationInput, setLocationInput, fullTime, setFullTime, setSearchURL, mobileFilter, setMobileFilter} = useContext(JobsContext);
    
    const handleSearch = (e) => {
        e.preventDefault();

        let search = searchInput.trim() !== ''
            ?   `description=${searchInput}`.replace(/ /g, '+')
            :   '';

        let location = locationInput.trim() !== ''
            ?  `location=${locationInput}`.replace(/ /g, '+')
            :   '';

        let full = fullTime ? `full_time=on` : ''

        let searchEndpoint = `${BASE_URL}.json?${[search, location, full].filter(Boolean).join('&')}`

        if (search || location || full) {
            setSearchURL(searchEndpoint)
            fetchGithubAPI(searchEndpoint)
            localStorage.setItem('search', searchInput.trim())
            localStorage.setItem('location', locationInput.trim())
            localStorage.setItem('full time', fullTime)
            sessionStorage.setItem('search URL', searchEndpoint)
        } else {
            fetchGithubAPI(`${BASE_URL}.json`)
            setSearchURL('')
            sessionStorage.setItem('search URL', '')
        }      
    }

    return (
        <form className={`search__bar ${mobileFilter ? 'blur' : ''}`} onSubmit={handleSearch}>
            <div className="search__bar__description form__control">
                <input
                    placeholder="Filter by title, expertise..."
                    aria-label="Enter company, title, or expertise here"
                    onChange={e => setSearchInput(e.target.value)}
                    value={searchInput}
                />
                <button 
                    className="mobile-search-bar-deploy"
                    aria-label="Button to deploy location & full time options"
                    onClick={() => setMobileFilter(!mobileFilter)}
                    type="button"
                >
                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.108 0H.86a.86.86 0 00-.764.455.833.833 0 00.068.884l6.685 9.202.007.01c.242.32.374.708.375 1.107v7.502a.825.825 0 00.248.594.865.865 0 00.942.18l3.756-1.4c.337-.1.56-.41.56-.784v-6.092c0-.399.132-.787.375-1.108l.007-.009 6.685-9.202c.19-.26.217-.6.068-.884A.86.86 0 0019.108 0z" fill="#6E8098" fillRule="nonzero"/>
                    </svg>
                </button>
            </div>
            <div className={`search__bar--inner ${mobileFilter ? 'visible' : ''}`}>
                <div className="search__bar__location form__control">
                    <input
                        placeholder="Filter by location..."
                        aria-label="Enter desired job location"
                        onChange={e => setLocationInput(e.target.value)}
                        value={locationInput}
                    />
                    <img 
                        src={close}
                        onClick={() => setMobileFilter(false)}
                        alt=""
                    />
                </div>
                <div className="search__bar__full-time form__control">
                    <span className={`checkbox ${fullTime ? 'checked' : ''}`} onClick={() => setFullTime(!fullTime)}>
                        <img src={check} alt="Checkmark" />
                    </span>
                    <small onClick={() => setFullTime(!fullTime)}>Full Time</small>
                </div>
                <button 
                    className="search__inner__btn btn" 
                    type="submit"
                    onClick={() => setMobileFilter(false)}>
                        <span>Search</span>
                </button>
            </div>
            <button className="search__bar__btn btn" type="submit"><span>Search</span></button>
        </form>
    )
}

export default SearchBar;