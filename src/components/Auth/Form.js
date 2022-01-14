import axios from "axios";
import React, { useState, useContext } from "react";

import style from './Form.module.css';
import AuthContext from './../../store/authContext';

const Form = () => {
    const ctx = useContext(AuthContext);
    const [isSuccess, setSuccess] = useState(false);
    const [isError, setError] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [switchForm, setSwitchForm] = useState(false);

    const handleSwitch = () => {
        setSwitchForm(!switchForm);
    }

    const inputHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData((prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    const submitForm = async (e) => {
        e.preventDefault();
        let to = "";
        if (switchForm)
            to = "register";
        else
            to = "login";

        try {
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/v1/user/${to}`, formData);
            if (to === 'register') {
                console.log(data.data.statusCode, data.statusCode)
                setSwitchForm(!switchForm);
            }

            if (data.status === 'success' && to === 'login') {
                ctx.handleLogin(data.data.token, data.data.user._id);

            }
        } catch (err) {
            console.log(err);
        }


    }

    return <>
        <div className={style.container}>
            <form className={style.form} >
                <h2 className={style["form-heading"]}
                >{switchForm ? 'Register' : 'Login'}</h2>
                <hr />
                {switchForm && <div className={`${style["input-container"]} ${style[`${isSuccess ? 'success' : ''}`]} ${style[`${isError ? 'error' : ''}`]}`}>
                    <label htmlFor="name">Username</label>
                    <input onChange={inputHandler} type="text" name="name" id="name" placeholder="Enter Username" />
                    <small>Error Message</small>
                </div>
                }

                <div className={style["input-container"]}>
                    <label htmlFor="email">Email</label>
                    <input onChange={inputHandler} type="text" name="email" id="email" placeholder="Enter email" />
                    <small>Error Message</small>
                </div>

                <div className={style["input-container"]}>
                    <label htmlFor="password">Password</label>
                    <input onChange={inputHandler} type="text" name="password" id="password" placeholder="Enter Password" />
                    <small>Error Message</small>
                </div>
                <div className={style["input-container"]}>
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="text" name="password2" id="password2" placeholder="Confirm Password" />
                    <small>Error Message</small>
                </div>
                <button onClick={submitForm} className={style.submit}>Submit</button>
            </form>
            <div className={style.register}>
                {switchForm ? 'Already Registered?' : 'Dont have an account?'}
                <button onClick={handleSwitch}>{switchForm ? 'Login?' : 'Signup?'}</button>
            </div>
        </div>
    </>
}

export default Form;