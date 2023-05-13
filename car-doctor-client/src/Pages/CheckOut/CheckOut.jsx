import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Banner from '../Shared/Banner/Banner';

const CheckOut = () => {

    const service = useLoaderData();


    return (
        <div>
            <Banner>Check Out</Banner>

            <div className='checkOutContainer mb-12 max-w-3xl mx-auto px-16 py-5 bg-[#F3F3F3]'>
                <form >
                    <div className="space-y-12">
                        <div className="">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                                    <div className="mt-2">
                                        <input type="text" name="firstName" id="firstName" className="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1" />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                                    <div className="mt-2">
                                        <input type="text" name="lastName" id="lastName" className="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1" />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                                    <div className="mt-2">
                                        <input type="number" name="phone" id="phone" className="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1" />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                                    <div className="mt-2">
                                        <input type="email" name="email" id="email" className="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1" />
                                    </div>
                                </div>
                                <div className="col-span-full">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Message</label>
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

export default CheckOut;