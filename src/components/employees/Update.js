import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form/dist/index.ie11';

const Update = () => {

    const [ employee, setEmployee ] = useState();
    const [ color, setColor ] = useState();
    const [ branches, setBranches ] = useState([]);
    let { id } = useParams()
    const history = useHistory();

    const { handleSubmit, register, errors } = useForm();

    useEffect(() => {
        axios.get(process.env.REACT_APP_URL + 'employees/' + id)
            .then(res => {
                setEmployee(res.data)
                setColor(res.data.color)
            })
            .catch(err => console.log(err))

        axios.get(process.env.REACT_APP_URL + 'branches')
            .then(res => {
                setBranches(res.data)
            })
            .catch(err => console.log(err))
    },[])

    const handleColorPicker = e => {
        setColor(e.target.value.toUpperCase())
    }

    const onSubmit = values => {
        axios.put(process.env.REACT_APP_URL + 'employees/' + id, values)
            .then(res => {
                history.push('/employees')
            })
            .catch(err => console.log(err))
    }

    const handleCancel = () => {
        history.push('/employees')
    }

    return(
        employee !== undefined && branches.length > 0 ? (
            <div className="container">
            <h1>Update Employee</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" name="name" id="fullname" defaultValue={employee.name} ref={register({ required: true })} />
                    <div className="form-error">{errors.name && "Name is Required!"}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="code">Code</label>
                    <input type="text" name="code" id="code" defaultValue={employee.code} ref={register({ required: true })} disabled />
                    <div className="form-error"></div>
                </div>
                <div className="form-group">
                    <label htmlFor="profession">Profession</label>
                    <input type="text" name="profession" id="profession" defaultValue={employee.profession} ref={register({ required: true })} />
                    <div className="form-error">{errors.profession && "Profession is Required!"}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="color">Color</label>
                    <div className="color-picker">
                        <input type="text" name="color" id="color" defaultValue={color} ref={register({ required: true })} />
                        <input type="color" defaultValue={color} onChange={e => handleColorPicker(e)} />
                    </div>
                    <div className="form-error">{errors.color && "Color is Required!"}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input type="text" name="city" id="city" defaultValue={employee.city} ref={register({ required: true })} />
                    <div className="form-error">{errors.city && "Profession is Required!"}</div>
                </div>
                <div className="form-group">
                <label htmlFor="branch">Branch</label>
                    <select name="branch_id" id="branch" defaultValue={employee.branch_id} ref={register({ required: true })}>
                        {branches.map(branch => (
                            <option value={branch.branch_id} key={branch.branch_id}>{branch.branch_name}</option>
                        ))}
                    </select>
                    <div className="form-error"></div>
                </div>
                <div className="form-group">
                    <label>Assigned?</label>
                    <label htmlFor="isassigned-true" className="form-radio">
                        <input type="radio" name="assigned" id="isassigned-true" value={true} defaultChecked={employee.assigned === 1 && true} ref={register({ required: true })}/>
                        Yes
                    </label>
                    <label htmlFor="isassigned-false" className="form-radio">
                        <input type="radio" name="assigned" id="isassigned-false" value={false} defaultChecked={employee.assigned === 0 && true} ref={register({ required: true })}/>
                        No
                    </label>
                    <div className="form-error"></div>
                </div>
                <div className="button-group">
                    <button type="submit">Update</button>
                    <input type="button" value="Cancel" onClick={handleCancel} />
                </div>
            </form>
        </div>
        ) : (
            <div className="container">
                Loading...
            </div>
        )
        
    )
}

export default Update