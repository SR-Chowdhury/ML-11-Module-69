import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Components/Loading/Loading';

const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Loading/>
    }

    if (user?.email) {
        return children;
    }

    return <Navigate to={'/login'} state={{from: location}} replace/>
};

export default PrivateRoute;