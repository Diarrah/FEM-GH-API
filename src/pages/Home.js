import React, { useState, useContext, useEffect } from 'react'
import { JobsContext } from '../App';
import { JobBoard, JobThumbnail, SearchBar, GHSpinner, MagnifyingGlass, Error } from '../components';
import { timeDifference } from '../helpers/timeDiffererence';
import arrow from '../images/up-arrow.svg';

const Home = () => {
    const { data: {jobs}, BASE_URL, loading, error, resultLength, searchURL, fetchGithubAPI, mobileFilter } = useContext(JobsContext);
    const [anotherPage, setAnotherPage] = useState(2);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [scroll, setScroll] = useState(window.pageYOffset);

    function useWindowSize() {
        useEffect(() => {
            function updateScrollHeight() {
                setWindowHeight(window.innerHeight)
                setScroll(window.pageYOffset)
            }
            window.addEventListener('scroll', updateScrollHeight)
            updateScrollHeight()
            return () => window.removeEventListener('scroll', updateScrollHeight)
        }, [windowHeight, scroll])

        return scroll, windowHeight
    }

    useEffect(() => {
        setAnotherPage(2)
    }, [resultLength < 50])

    const loadMore = () => {
        setAnotherPage(anotherPage + 1)

        const endpoint = searchURL 
            ? `${searchURL}&page=${anotherPage}`
            : `${BASE_URL}.json?page=${anotherPage}`

        fetchGithubAPI(endpoint)       
        sessionStorage.setItem('search URL', endpoint)
    }

    useWindowSize()

    return (
        <div className="home__page">
            <SearchBar />
            {loading && !searchURL && !mobileFilter && (<GHSpinner initialSearch />)}
            {loading && searchURL && !mobileFilter && (<MagnifyingGlass />)}
            {error.error && (<Error apiError />)}
            {!error.error && !loading && searchURL && jobs.length === 0 && (<Error noJobs />)}
            {jobs && !error.error && (
                <>
                <JobBoard>
                    {jobs.map(job => (
                        <JobThumbnail 
                            key={job.id}
                            id={job.id}
                            logo={job.company_logo}
                            date={timeDifference(Date.now(), Date.parse(job.created_at))}
                            lengthTerm={job.type}
                            company={job.company}
                            jobTitle={job.title}
                            location={job.location}
                        />
                    ))}
                    {anotherPage > 2 && !searchURL && loading && (<GHSpinner withinJobBoard />)}    
                    {anotherPage > 2 && searchURL && loading && (<MagnifyingGlass loadMoreSearch />)}        
                </JobBoard>

                {resultLength >= 50 && !mobileFilter && (
                    <button className="load__more__btn btn" onClick={loadMore}>Load More</button>
                )}

                {scroll >= (windowHeight * 2) && !mobileFilter && (
                    <button 
                        className="back-to-top"
                        aria-label="Button to scroll back to top of page"
                        onClick={() => window.scrollTo(0, 0)}>
                            <img src={arrow} alt="" />
                    </button>
                )}
                </>
            )}         
        </div>
    )
}

export default Home