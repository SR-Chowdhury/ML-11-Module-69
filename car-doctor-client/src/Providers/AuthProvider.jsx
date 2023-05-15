import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../Firebase/Firebase.config';

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const singIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect( () => {

        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('Current User in Auth Provider', currentUser);
            setUser(currentUser);

            const loggeUser = {
                email: currentUser?.email
            }

            if (currentUser && currentUser.email) {
                console.log('I im ain jwt state');
                fetch('https://car-doctor-server-one-kappa.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type' : 'application/json'
                    },
                    body: JSON.stringify(loggeUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data)
                        localStorage.setItem('car-doctor-access-token', data.token);
                    })
                    .catch(err => console.log(err.message))
            }
            else {
                console.log('hello i am logout');
                localStorage.removeItem('car-doctor-access-token'); 
            }

            setLoading(false);
        });

        return () => unSubscribe();

    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        singIn,
        googleSignIn,
        logOut,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}        
        </AuthContext.Provider>
    );
};

export default AuthProvider;