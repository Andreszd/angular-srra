import React,{ useReducer } from 'react'
import { USER_AUTHENTICATE,
        ERROR_AUTHENTICATE_USER,
        ERROR_SIGN_IN_USER,
        SIGN_IN_USER } from '../../utils/types'

import AuthContext from './authContext'
import AuthReducer from './authReducer'
import clientAxios from '../../config/axios'
import defineHeaders from '../../config/token'

const AuthState = ({ children }) => {
    const initialState = {
        user: null,
        authenticate: false,
        rol: null,
        messageError:null
    }
    const [state, dispatch] = useReducer(AuthReducer, initialState)
    const { authenticate, messageError, rol } = state

    const signIn = async (user) =>{
        try {
            const response = await clientAxios.post('api/users/authenticate', user)
            console.log(response.data)
            dispatch({
                type: SIGN_IN_USER, 
                payload: response.data
            })
            //authenticateUser()
        } catch (error) {
            if(!error.response) return console.log(error.response)
            let alertMessage = ""

            if ( error.response.data.errors ) alertMessage = "Check the Fields"

            if( error.response.data.error ) alertMessage = error.response.data.error.message
            dispatch({
                type: ERROR_SIGN_IN_USER,
                payload: alertMessage 
            }) 
        }
    }
    const authenticateUser = async ()=>{
        const token = localStorage.getItem('token')
        if(token){
            defineHeaders(token)
        }
        try {
            const response  = await clientAxios.get('api/info-user') 
            dispatch({
                type: USER_AUTHENTICATE,
                payload: response.data.user
            })
        } catch (error) {
            if(!error.response) return null
            dispatch({
                type: ERROR_AUTHENTICATE_USER
            })
           console.log(error)       
        }
    }
    return ( 
        <AuthContext.Provider
            value={{
                rol,
                authenticate,
                messageError,
                signIn,
                authenticateUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
export default AuthState;