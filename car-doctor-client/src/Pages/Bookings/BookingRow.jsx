import React from 'react';

const BookingRow = ({ booking, handleDelete }) => {

    const { _id, date, image, price, email, serviceName } = booking;
    // console.log(booking.serviceName);

    return (
        <tr>
            <td>
                <button onClick={() => handleDelete(_id)} className="btn btn-square">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </td>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="w-24 rounded">
                            <img src={image} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                </div>
            </td>
            <td>{serviceName}</td>
            <td>{email}</td>
            <td>{price}</td>
            <td>{date}</td>
            <th>
                <button className="btn btn-ghost btn-xs">details</button>
            </th>
        </tr>
    );
};

export default BookingRow;