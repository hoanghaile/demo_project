import React, {useContext} from 'react'
import { AuthContext } from '../contexts/authContext';
import { Redirect } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import LoginForm from '../../page/Login/Login';

const Auth = ({ authRoute }) => {
    const {
        authState: {authLoading, isAuthenticated }
    } = useContext(AuthContext)
    let body

    if (authLoading) {
        body = (
            <div className="d-flex justify-content-center">
                <Spinner animation='border' variant='info' />
            </div>
        )
    }
    else {
        if (isAuthenticated) return <Redirect to="/admin" />
         else 
            body = (
                <>
                    {authRoute === 'login' && <LoginForm/>}
                </>
            ) 
    }
    return (
        <div className='landing'>
            <div className='dark-overlay'>
                <div className='landing-inner'>
                    {body}
                </div>
            </div>
        </div>
    )
}
export default Auth;
