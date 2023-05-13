import React from 'react';
import img from '../../assets/images/login/login.svg';
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Register = () => {

    const handleRegister = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
    }


    return (
        <div className="hero min-h-screen mb-16">
            <div className="hero-content flex-col gap-14 lg:flex-row">
                <div className="w-1/2">
                    <img src={img} alt="Login Image" className='w-full' />
                </div>
                <div className="card w-1/2 max-w-sm shadow-2xl">
                    <h1 className="text-4xl mt-3 text-center font-bold">Sign Up</h1>
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="name" className="input input-bordered" />
                        </div>
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
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Login" />
                        </div>
                        <div className='text-center'>
                            <p>Or Sign up with</p>
                            <div className='my-3 flex justify-center gap-4 text-2xl'>
                                <Link><FaGoogle/></Link>
                                <Link><FaGithub/></Link>
                                <Link><FaFacebookF/></Link>
                            </div>
                            <p>Already Have Account? <Link className='text-orange-500' to={'/login'}>Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;