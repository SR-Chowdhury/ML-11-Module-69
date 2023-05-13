import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Navigate } from 'react-router-dom';
import Loading from '../Components/Loading/Loading';

const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext);

    if (loading) {
        return <Loading/>
    }

    if (user?.email) {
        return children;
    }

    return <Navigate to={'/login'} replace/>
};

export default PrivateRoute;