import React, { useContext } from 'react';
import { JobsContext } from '../App';
import glassLight from '../images/Magnify-1.2s-200px.svg';
import glassDark from '../images/Magnify-1.2s-200px--dark.svg';

const MagnifyingGlass = ({ initialSearch }) => {
    const { lightTheme } = useContext(JobsContext);
    
    return (
        <div className={`spinner--magnify ${initialSearch ? 'big' : 'small'}`}>
            <img src={`${lightTheme ? glassLight : glassDark}`} alt="Magnifying glass" />
        </div>
    )
}

export default MagnifyingGlass