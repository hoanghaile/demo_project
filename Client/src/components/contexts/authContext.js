import { createContext, useReducer, useEffect } from 'react';

import axios from 'axios';

import { authReducer } from '../reducers/authReducer'
import { LOCAL_STORAGE_TOKEN_NAME } from './constants';
import SetAuthToken from '../Utils/setAuthToken';
import { apiURL } from '../../api/constants'


export const AuthContext = createContext()
 
// export const getIdAdmin = () => {
//     const res = axios.get(`${apiURL}/auth`)
//     console.log(res.data);
// }

const AuthContextProvider = ({ children }) => {

    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })

    useEffect(() => {loadUser() },[])

    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            SetAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try {
            const response = await axios.get(`${apiURL}/auth`)
            console.log(response,666);
            if (response.data.success)
                dispatch({
                    type: 'SET_AUTH',
                    payload: { isAuthenticated: true, user: response.data.user }
                })
        } catch (err) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            SetAuthToken(null)
            dispatch({
                type: 'SET_AUTH',
                payload: { isAuthenticated: false, user: null }
            })
        }
    }

    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiURL}/auth/login`, userForm)
            if (response.data.success)
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            
            await loadUser()
            // console.log(response.data);
            return response.data
        } catch (err) {
            if (err.response.data)
                return err.response.data
            else return {
                success: false,
                message: err.message
            }
        }
    }

    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        dispatch({
            type: 'SET_AUTH',
            payload: {isAuthenticated: false, user: null}
        })
    }

    const authContextData = { loginUser, logoutUser, authState }
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;