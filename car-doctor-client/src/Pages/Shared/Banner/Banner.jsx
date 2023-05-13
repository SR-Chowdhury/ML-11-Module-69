import React from 'react';
import banner from '../../../assets/images/checkout/checkout.png';

const Banner = ({children}) => {
    return (
        <div className='bannerContainer relative mb-20 rounded-lg'>
            <img src={banner} alt="Banner" className='w-full' />
            <div className='absolute flex items-center top-0 left-0 h-full rounded-lg w-full bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]'>
                <h1 className='text-white text-6xl ml-16'>{children}</h1>
            </div>
        </div>
    );
};

export default Banner;