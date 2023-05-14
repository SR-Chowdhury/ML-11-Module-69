import React, { useContext, useState } from 'react';
import img from '../../assets/images/login/login.svg';
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';

const Login = () => {

    const { singIn } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        if (password.length < 6) {
            setError('Password length at least 6 characters');
        }

        singIn(email, password)
            .then(result => {
                Swal.fire({
                    title: 'Successfully Loge-in!',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
                const loggedUser = result.user;
                setError('');
                form.reset();
                navigate(from, {replace: true});
            })
            .catch(err => setError(err.message))
    }


    return (
        <div className="hero min-h-screen mb-16">
            <div className="hero-content flex-col gap-14 lg:flex-row">
                <div className="w-1/2">
                    <img src={img} alt="Login Image" className='w-full' />
                </div>
                <div className="card w-1/2 max-w-sm shadow-2xl">
                    <h1 className="text-4xl mt-3 text-center font-bold">Login now!</h1>
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" name='password' className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        {
                            error && <p className='label-text-alt text-center text-red-600'>{error}</p>
                        }
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Login" />
                        </div>
                        <div className='text-center'>
                            <p>Or Sign in with</p>
                            <div className='my-3 flex justify-center gap-4 text-2xl'>
                                <Link><FaGoogle /></Link>
                                <Link><FaGithub /></Link>
                                <Link><FaFacebookF /></Link>
                            </div>
                            <p>New in this Website? <Link className='text-orange-500' to={'/register'}>Register</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;