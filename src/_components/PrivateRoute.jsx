import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const validate = (props) => {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    if (user) {
        if (props.location.pathname === "/Users") {
            if (user.role === 'admin') {
                return true;
            }
        } else {
            return true;
        }
    }
    return false;
}
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        validate(props)
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)