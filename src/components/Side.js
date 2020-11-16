import React from 'react';
import {Link} from 'react-router-dom';

const Side = () => {

    return(
        <div className="side">
            <nav>
                <Link to="/">Dashboard</Link>
                <Link to="/employees">Employees</Link>
                <Link to="/react-table">Employees <small>(React Table)</small></Link>
                <Link to="/branches">Branches</Link>
            </nav>
        </div>
    )
}

export default Side