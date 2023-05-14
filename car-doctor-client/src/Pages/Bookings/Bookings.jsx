import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import Banner from '../Shared/Banner/Banner';
import BookingRow from './BookingRow';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Bookings = () => {

    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/bookings?email=${user?.email}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('car-doctor-access-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setBookings(data)
                }
                else {
                    Swal.fire(
                        'Session Time Out!',
                        'success'
                    )
                    navigate('/');
                }
            })
            .catch(err => console.log(err.message))
    }, []);

    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/bookings/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            const remaining = bookings.filter(booking => booking._id !== id);
                            setBookings(remaining);
                        }
                        console.log(data);
                    })
                    .catch(err => console.log(err.message))
            }
        })
    }

    const handleBookingConfirm = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, confirm!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/bookings/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({ status: 'confirm' })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount > 0) {
                            Swal.fire(
                                'Confirmed!',
                                'Confirmed successfully.',
                                'success'
                            )
                            const remaining = bookings.filter(booking => booking._id !== id);
                            const update = bookings.find(booking => booking._id === id);
                            update.status = 'confirm';
                            const newBookings = [update, ...remaining];
                            setBookings(newBookings);
                        }
                        console.log(data);
                    })
                    .catch(err => console.log(err.message))
            }
        })
    }

    return (
        <div className='mb-16'>
            <Banner>Cart Details</Banner>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Action</th>
                            <th>Service Image</th>
                            <th>Service Name</th>
                            <th>Customer Email</th>
                            <th>Service Price</th>
                            <th>Service Date</th>
                            <th>Service Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((booking, index) =>
                                <BookingRow
                                    key={index}
                                    booking={booking}
                                    handleDelete={handleDelete}
                                    handleBookingConfirm={handleBookingConfirm}
                                />)
                        }
                    </tbody>
                </table>
                {
                    bookings.length < 1 ? <div className='text-center my-12'><h1 className=''>No Order Yet!</h1></div> : ''
                }
            </div>
        </div>
    );
};

export default Bookings;