import React, { useContext } from 'react';
import { JobsContext } from '../App';
import spinner_black from '../images/github-black.svg';
import spinner_purple from '../images/github-purple.svg';

const GHSpinner = ({ withinJobBoard }) => {
    const { lightTheme } = useContext(JobsContext);
    return (
        <div className={`spinner--gh ${withinJobBoard ? 'resize' : ''}`}>
            <img src={`${lightTheme ? spinner_black : spinner_purple}`} alt="Github logo as loading spinner" />
        </div>
    )
}

export default GHSpinner