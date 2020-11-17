import React, { useMemo, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTable, useSortBy } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

const ReactTable = props => {

    let history = useHistory()

    const [ data, setData ] = useState([])

    useEffect(() => {
        axios.get(process.env.REACT_APP_URL + 'employees')
            .then(res => {
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

    useEffect(() => {
        setData(
            props.employees.map(employee => ({
                col1: employee.id,
                col2: employee.name,
                col3: employee.code,
                col4: employee.profession,
                col5: employee.color,
                col6: employee.branch_name,
                col7: employee.city,
                col8: employee.assigned === 1 ? 'Yes' : 'No',
                col9: <FontAwesomeIcon 
                    icon={faEdit}
                    className="icon" 
                    onClick={() => handleUpdateEmployee(employee.id)} 
                />,
                col10: <FontAwesomeIcon 
                    icon={faTrashAlt}
                    className="icon" 
                    onClick={() => handleDeleteEmployee(employee.id)} 
                />
            }))
        )
    }, [props.employees])

    
    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'col1'
            },
            {
                Header: 'Name',
                accessor: 'col2'
            },
            {
                Header: 'Code',
                accessor: 'col3'
            },
            {
                Header: 'Profession',
                accessor: 'col4'
            },
            {
                Header: 'Color',
                accessor: 'col5'
            },
            {
                Header: 'Branch',
                accessor: 'col6'
            },
            {
                Header: 'City',
                accessor: 'col7'
            },
            {
                Header: 'Assigned',
                accessor: 'col8',
                className: 'center'
            },
            {
                Header: 'Update',
                accessor: 'col9',
                disableFilters: true,
                disableSortBy: true,
                className: 'center'
            },
            {
                Header: 'Delete',
                accessor: 'col10',
                disableFilters: true,
                disableSortBy: true,
                className: 'center'
            }
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        { columns, data }, 
        useSortBy
    )
    
    return (
        <div className="container">
            <div className="table-action">
                <h1>React Table Employee List</h1>
                <input type="button" value="New" onClick={handleNewEmployee}/>
            </div>
            <div className="table-wrapper">
                {data.length > 0 ? (
                    <table {...getTableProps()}>
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {column.render('Header')}
                                            <span>
                                                {column.isSorted
                                                ? column.isSortedDesc
                                                    ? <FontAwesomeIcon icon={faSortDown} />
                                                    : <FontAwesomeIcon icon={faSortUp} />
                                                : ''}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map(row => {
                            prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            return (
                                                <td {...cell.getCellProps([{
                                                    className: cell.column.className
                                                }])}>
                                                    {cell.render('Cell')}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            
        </div>
    )
}

export default ReactTable;