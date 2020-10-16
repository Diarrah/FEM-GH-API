import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const JobThumbnail = ({ logo, date, lengthTerm, company, jobTitle, location, id }) => {
    const colors = ['#8d47ff', '#235cdf', '#daa278', '#68ab97', '#bb4643', '#e7de63'];
    const [color] = useState(colors[Math.floor(Math.random() * colors.length)]);

    return (
        <Link to={`/${id}`}>
            <div className="job__board__thumbnail">
                <div className="thumbnail__image__container">
                    { logo && (<img src={logo} alt={`${company} company logo`} />) }
                    { !logo && ( <div className="no-logo" style={{backgroundColor: color}}>n / a</div> )}
                </div>
                <p className="thumbnail__time-type">
                    <span className="thumbnail__time">{date}</span> 
                    <span style={{margin: "0 10px"}}>•</span>
                    <span className="thumbnail__type">{lengthTerm}</span>
                </p>
                <ResponsiveEllipsis
                    className="thumbnail__title"
                    text={jobTitle}
                    component="h3" 
                    maxLine={2}
                />
                <p className="thumbnail__company">{company}</p>
                <ResponsiveEllipsis
                    className="thumbnail__location"
                    text={location}
                    component="small"
                />
            </div>
        </Link>
    )
}

export default JobThumbnail