import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { AuthContext } from '../../../Providers/AuthProvider';

const SocialLogin = () => {

    const {user, googleSignIn} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                console.log('Social Login user: ', user);
                navigate(from, {replace: true});
            })
            .catch(err => console.log(err.message))
    }


    return (
        <div className='text-center'>
            <p>Or Sign in with</p>
            <div className='my-3 flex justify-center gap-4 text-2xl'>
                <Link onClick={handleGoogleSignIn}><FaGoogle /></Link>
                <Link><FaGithub /></Link>
                <Link><FaFacebookF /></Link>
            </div>
        </div>
    );
};

export default SocialLogin;