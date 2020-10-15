import React, { useContext } from 'react';
import { JobsContext } from '../App';

const JobBoard = ({ children }) => {
    const { mobileFilter } = useContext(JobsContext);
    
    return (
        <section className={`job__board ${mobileFilter ? 'blur' : ''}`}>{ children }</section>
    )
}

export default JobBoard