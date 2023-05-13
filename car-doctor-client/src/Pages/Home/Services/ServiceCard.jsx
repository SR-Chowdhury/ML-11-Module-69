import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {

    const { service_id, title, img, price, description } = service;

    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className='flex justify-between text-orange-600 font-bold'>
                    <p>Price: ${price}</p>
                    <Link><FaArrowRight /></Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;