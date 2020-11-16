import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form/dist/index.ie11';

const Add = () => {

    const history = useHistory();

    const { handleSubmit, register, errors } = useForm();
    const [ color, setColor ] = useState();
    const [ code, setCode ] = useState();
    const [ branches, setBranches ] = useState([]);
    const [ codeError, setCodeError ] = useState(false);
    const onSubmit = values => {
        axios.post(process.env.REACT_APP_URL + 'employees/add', values)
            .then(res => {
                history.push('/employees')
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if(code) {
            axios.post(process.env.REACT_APP_URL + 'employees/by/code', {code:code})
                .then(res => {
                    if(res.data.length !== 0){
                        setCodeError(true)
                    } else {
                        setCodeError(false)
                    }
                })
                .catch(err => console.log(err))
        }
    },[code]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_URL + 'branches')
            .then(res => {
                setBranches(res.data)
            })
            .catch(err => console.log(err))
    },[])

    const handleColorPicker = e => {
        setColor(e.target.value.toUpperCase())
    }

    const handleCode = e => {
        setCode(e.target.value)
    }

    return(
        <div className="container">
            <h1>Add New Employee</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" name="name" id="fullname" ref={register({ required: true })} />
                    <div className="form-error">{errors.name && "Name is Required!"}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="code">Code</label>
                    <input type="text" name="code" id="code" ref={register({ required: true })} onChange={e => handleCode(e)} />
                    <div className="form-error">
                        {codeError && "Code must be unique!"}
                        {errors.code && "Code is Required!"}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="profession">Profession</label>
                    <input type="text" name="profession" id="profession" ref={register({ required: true })} />
                    <div className="form-error">{errors.profession && "Profession is Required!"}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="color">Color</label>
                    <div className="color-picker">
                        <input type="text" name="color" id="color" defaultValue={color} ref={register({ required: true })} />
                        <input type="color" onChange={e => handleColorPicker(e)} />
                    </div>
                    <div className="form-error">{errors.color && "Color is Required!"}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input type="text" name="city" id="city" ref={register({ required: true })} />
                    <div className="form-error">{errors.city && "Profession is Required!"}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="branch">Branch</label>
                    <select name="branch_id" id="branch" ref={register({ required: true })}>
                        {branches.length > 0 && branches.map(branch => (
                            <option value={branch.branch_id} key={branch.branch_id}>{branch.branch_name}</option>
                        ))}
                    </select>
                    <div className="form-error"></div>
                </div>
                <div className="form-group">
                    <label>Assigned?</label>
                    <label htmlFor="isassigned-true" className="form-radio">
                        <input type="radio" name="assigned" id="isassigned-true" value={true} ref={register({ required: true })} defaultChecked/>
                        Yes
                    </label>
                    <label htmlFor="isassigned-false" className="form-radio">
                        <input type="radio" name="assigned" id="isassigned-false" value={false} ref={register({ required: true })} />
                        No
                    </label>
                    <div className="form-error"></div>
                </div>
                <div className="button-group">
                    <button type="submit">Submit</button>
                    <button type="reset">Reset</button>
                </div>
            </form>
        </div>
    )
}

export default Add