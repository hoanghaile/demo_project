import React from 'react';
import { Redirect, Route } from 'react-router';
import Cookies from 'js-cookie'

const BackToPrivateRoute = ({ component: Component, ...rest }) => {
    const token = Cookies.get('_token')
    return (
        <Route {...rest} render={props => {
            if (token === undefined) {
                Cookies.remove('_token')
                window.location.href="/"
            }
            return <Redirect />
        }}
        />
    )
}

export default BackToPrivateRoute;