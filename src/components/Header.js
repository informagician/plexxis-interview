import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';

const Header = props => {

    const handleHamburger = () => {
        props.setMenu(!props.menu)
    }

    return(
        <header>
            <div className="hamburger" onClick={handleHamburger}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            <div className="logo">
                <img src="/logo.png" alt="Plexxis Logo" />
            </div>
            <FontAwesomeIcon icon={faSignOutAlt} className="signout" />
        </header>
    )
}

export default Header