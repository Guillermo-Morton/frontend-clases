import React from 'react';
import { Navigate } from 'react-router-dom';
const PrivateRoute = ({Component, adminPrivate = false, noUser = false}) => {
    const role = JSON.parse(localStorage.getItem('user'))?.role 
    const hasAccess = noUser ? (!role) : (adminPrivate ? (role === 'ADMIN_ROLE') : (role))
    return hasAccess ? <Component/> : <Navigate to={'/'}/>
};

export default PrivateRoute;