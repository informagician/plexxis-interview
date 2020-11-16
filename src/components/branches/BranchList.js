import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const BranchList = () => {

    const history = useHistory();

    const [ branches, setBranches ] = useState([])
    const [ newBranch, setNewBranch ] = useState("")

    console.log(process.env.REACT_APP_URL + 'branches')

    useEffect(() => {
        axios.get(process.env.REACT_APP_URL + 'branches')
            .then(res => {
                setBranches(res.data)
            })
            .catch(err => console.log(err))
    },[])

    const handleChange = e => {
        setNewBranch({
            ...newBranch,
            branch_name: e.target.value
        })
    }

    const handleSaveBranch = () => {
        axios.post(process.env.REACT_APP_URL + 'branches', newBranch)
            .then(res => {
                history.go('/branches')
            })
            .catch(err => console.log(err))
    }

    return(
        <div className="container">
            <div className="table-action">
                <h1>List of Branches</h1>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {branches.length > 0 ? (
                        // eslint-disable-next-line
                        branches.map(branch => (
                            <tr key={branch.branch_id}>
                                <td>{branch.branch_id}</td>
                                <td>{branch.branch_name}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>
                                No results found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <section>
                <h2>Add new Branch</h2>
                <div className="form-group">
                    <input type="text" placeholder="Name" name="branch" onChange={e => handleChange(e)} />
                    <div className="form-error">{newBranch.branch_name === "" && "Branch name should be at least 1 character long"}</div>
                </div>
                <div className="button-group">
                    <input type="button" value="Save" onClick={() => handleSaveBranch()} disabled={newBranch.branch_name === "" || newBranch.length === 0}/>
                </div>
            </section>
        </div>
    )
}

export default BranchList;