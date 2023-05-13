import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import Banner from '../Shared/Banner/Banner';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';

const BookService = () => {

    const service = useLoaderData();
    const {user} = useContext(AuthContext);

    const handleBookService = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const phone = form.phone.value;
        const email = user?.email;
        const message = form.message.value;
        const orderData = {customerName: name, serviceName : service.title, image : service.img, date, phone, email, price : service.price, message, serviceId : service._id};
        console.log(orderData);

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json',
            },
            body: JSON.stringify(orderData),
        })
            .then(res => res.json())
            .then(data => {
                if(data.insertedId) {
                    Swal.fire({
                        title: 'Successfully Inserted!',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    })
                    form.reset();
                }
                console.log(data)
            })
            .catch(err => console.log(err.message))
    }

    return (

        <div>
            <Banner>Check Out</Banner>

            <div className='checkOutContainer mb-12 max-w-3xl mx-auto px-16 py-5 bg-[#F3F3F3]'>
                <h1 className='text-3xl font-bold text-center'>Book Service: {service.title}</h1>
                <form onSubmit={handleBookService} >
                    <div className="space-y-12">
                        <div className="">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                                    <div className="mt-2">
                                        <input type="text" name="name" defaultValue={user?.displayName} className="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1" />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Date</label>
                                    <div className="mt-2">
                                        <input type="date" name="date" className="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1" />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                                    <div className="mt-2">
                                        <input type="number" name="phone" id="phone" className="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1" />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Email <code>(Default)</code> </label>
                                    <div className="mt-2">
                                        <input type="email" name="email" readOnly defaultValue={user?.email} className="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1" />
                                    </div>
                                </div>
                                <div className="col-span-full">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Message <code>(optional)</code></label>
                                    <div className="mt-2">
                                        <textarea name="message" className='block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1' cols="30" rows="10"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="my-6">
                        <button type="submit" className="btn w-full">Order Confirm</button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default BookService;