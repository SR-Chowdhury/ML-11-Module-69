import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import Banner from '../Shared/Banner/Banner';
import BookingRow from './BookingRow';

const Bookings = () => {

    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/bookings?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setBookings(data))
            .catch(err => console.log(err.message))
    }, []);

    return (
        <div className='mb-16'>
            <Banner>Cart Details</Banner>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <tbody>
                        {
                            bookings.map((booking, index) => <BookingRow key={index} booking={booking}/>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bookings;