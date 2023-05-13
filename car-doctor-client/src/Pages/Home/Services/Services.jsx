
import { React, useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {

    const [services, setServices] = useState([]);

    useEffect(() => {

        fetch('/services.json')
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(err => console.log(err.message))

    }, []);

    return (
        <div className='mb-20'>

            <div className='text-center'>
                <h3 className='text-orange-400 font-bold'>Services</h3>
                <h1 className='text-4xl font-bold mb-3'>Our Service Area</h1>
                <p className='w-1/2 mx-auto mb-5'>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-9'>
                {
                    services.map(service => <ServiceCard key={service._id} service={service} />)
                }
            </div>

            <div className='text-center mt-9'>
            <button className="btn btn-outline btn-warning">More Services</button>
            </div>

        </div>
    );
};

export default Services;