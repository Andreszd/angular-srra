import { USER_AUTHENTICATE,
        ERROR_AUTHENTICATE_USER,
        ERROR_SIGN_IN_USER, 
        SIGN_IN_USER  } from '../../utils/types'

const AuthReducer = (state, action) =>{
    switch(action.type){
        case USER_AUTHENTICATE:
            return {
                ...state,
                user: action.payload.iduser,
                authenticate: true,
                rol: action.payload.rol
            }
            case ERROR_AUTHENTICATE_USER :
            case ERROR_SIGN_IN_USER:
            const token = localStorage.getItem('token')
            if (token) localStorage.removeItem('token')
            return {
                ...state,
                messageError: action.payload
            }
        case SIGN_IN_USER:
            localStorage.setItem('token', action.payload.Token)
            return {
                ...state,
                user: action.payload,
                authenticate: true,
            }
        default : return state
    }
}
export default AuthReducer