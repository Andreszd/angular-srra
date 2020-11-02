import React,{ useContext } from 'react'
import useForm from '../../hooks/useForm'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'

import alertContext from '../../context/Alert/AlertContext'
import authContext from '../../context/Auth/authContext'

import { Link } from 'react-router-dom'
import '../../scss/blocks/Form.scss'
const FormLogin = ({ setForm }) => {
    const [ handleInputChange, inputsErrors, inputs ] = useForm({
        username:'',
        password:''
    })

    const { showAlert } = useContext(alertContext)
    const { signIn } = useContext(authContext)
    
    const handleSubmit = e =>{
        e.preventDefault()
        const errors = inputsErrors()
        if( errors ) return showAlert(errors, false)
        const user = {
            ...inputs,
            firstName: inputs.username,
            lastName: inputs.username,
            confirmPassword: inputs.password
        }
        signIn(user)
    }

    return (
        <form action="" className="form" onSubmit={ handleSubmit }>
            <div className="form__header">
                <h2 className="form__title">Welcome</h2>
                <p className="form__text">Sign into your account here</p>
            </div>
            <div className="form-input">
                <input type="text" placeholder="username" 
                name="username"
                className="form-input__item" 
                onChange ={handleInputChange}/>
                <i className="form-input__icon">
                    <FontAwesomeIcon icon={faEnvelope} />
                </i>
            </div>
            <div className="form-input">
                <input type="password" placeholder="Password" autoComplete="on"
                onChange ={handleInputChange}
                className="form-input__item" name="password"/>
                <i className="form-input__icon">
                    <FontAwesomeIcon icon={faLock} />
                </i>
            </div>
            <div className="form-input">
                <input type="submit" value="Sign in" className="form-input__submit"/>
            </div>
            <section className="form__footer">
                <p className="form-footer__text">Forgot password ?
                     <Link to="" className="text-link">Reset</Link>
                </p>
                <p className="form-footer__text">Dont have an account 
                    <a className="text-link" onClick={()=> setForm(false)}>Sign up</a>
                </p>
            </section>
        </form>
    );
}
 
export default FormLogin;