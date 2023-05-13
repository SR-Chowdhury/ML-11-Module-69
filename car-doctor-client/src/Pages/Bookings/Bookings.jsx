import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';

const Bookings = () => {

    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    useEffect( () => {
        fetch(`http://localhost:5000/bookings?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setBookings(data))
            .catch(err => console.log(err.message))
    }, []);

    return (
        <div>
            <h1>Bookings ....</h1>
        </div>
    );
};

export default Bookings;