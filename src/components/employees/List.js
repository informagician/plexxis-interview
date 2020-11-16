import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

const List = props => {

    let history = useHistory()

    useEffect(() => {
        axios.get(process.env.REACT_APP_URL + 'employees')
            .then(res => {
                console.log(res.data)
                props.setEmployees(res.data)
            })
            .catch(err => console.log(err))
    },[])

    const handleNewEmployee = () => {
        history.push('/employees/add')
    }

    const handleDeleteEmployee = id => {
        axios.delete(process.env.REACT_APP_URL + 'employees/' + id)
            .then(res => {
                history.go(0)
            })
            .catch(err => console.log(err))
    }

    const handleUpdateEmployee = id => {
        history.push('/employees/' + id)
    }

    return(
        <div className="container">
            <div className="table-action">
                <h1>List of Employees</h1>
                <input type="button" value="New" onClick={handleNewEmployee}/>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Profession</th>
                        <th>Color</th>
                        <th>Branch</th>
                        <th>City</th>
                        <th>Assigned</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {props.employees.length > 0 ? (
                        // eslint-disable-next-line
                        props.employees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.id}{employee.index}</td>
                                <td>{employee.name}</td>
                                <td>{employee.code}</td>
                                <td>{employee.profession}</td>
                                <td>{employee.color}</td>
                                <td>{employee.branch_name}</td>
                                <td>{employee.city}</td>
                                <td className="center">{employee.assigned ? "Yes" : "No"}</td>
                                <td className="center">
                                    <FontAwesomeIcon 
                                        icon={faEdit}
                                        className="icon" 
                                        onClick={() => handleUpdateEmployee(employee.id)} 
                                    />
                                </td>
                                <td className="center">
                                    <FontAwesomeIcon 
                                        icon={faTrashAlt}
                                        className="icon" 
                                        onClick={() => handleDeleteEmployee(employee.id)} 
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>
                            <p>No Employees Found.</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default List