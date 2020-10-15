import React from 'react'

const GHSpinner = ({ withinJobBoard }) => (
    <div className={`spinner--gh ${withinJobBoard ? 'resize' : ''}`}>
        <i className="fab fa-github" aria-hidden="true" />
    </div>
)

export default GHSpinner