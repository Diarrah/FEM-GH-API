import React, { useContext } from 'react';
import { JobsContext } from '../App';
import github_red from '../images/github-red.svg';

const Error = ({ noJobs, apiError }) => {
    const { error } = useContext(JobsContext)
    const search = localStorage.getItem('search');
    const location = localStorage.getItem('location');
    const full = localStorage.getItem('full time');

    return (
        <div className="error">
            <img src={github_red} alt="Github logo for error" />
            <div className={`error__msg ${apiError ? 'visible' : 'hidden'}`}>
                <h3>{error.statusCode}</h3>
                <p>{error.statusText}</p>
            </div>
            <p className={`no__jobs ${noJobs ? 'visible' : 'hidden'}`}>
                No <strong>{full === 'true' ? 'full time' : ''}</strong> <strong>{search}</strong> jobs found {location ? 'in' : ''} <strong>{location}</strong>
            </p>
        </div>
    )
}

export default Error