import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Header = () => {

    return(
        <header>
            <div className="logo">
                <img src="/logo.png" alt="Plexxis Logo" />
            </div>
            <FontAwesomeIcon icon={faSignOutAlt} className="signout" />
        </header>
    )
}

export default Header