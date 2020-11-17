import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-regular-svg-icons';

const Dashboard = () => {

    const history = useHistory();

    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    const today = new Date();
    const hh = today.getHours();
    let mm = today.getMinutes();
    const day = today.getDay();
    const month = today.getMonth();
    const date = today.getDate();
    const year = today.getFullYear();

    if (mm < 10) {
        mm = "0" + mm
    }


    return(
        <div className="container">
            <h1>Welcome to Plexxis Dashboard</h1>
            <section>
                <p>It is {hh + ':' + mm} on {days[day]} {months[month]} {date}, {year}.</p>
                <p>Choose between one of the following options.</p>
            </section>
            <section className="cards">
                <div className="card" onClick={() => history.push('/employees')}>
                    <FontAwesomeIcon icon={faUserTie} />
                    <h3>Manage Employees</h3>
                </div>
                <div className="card" onClick={() => history.push('/branches')}>
                    <FontAwesomeIcon icon={faBuilding} />
                    <h3>Manage Branches</h3>
                </div>
            </section>
        </div>
    )
}

export default Dashboard