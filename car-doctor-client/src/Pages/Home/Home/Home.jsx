import React from 'react';
import Slider from '../Slider/Slider';
import About from '../About/About';
import Services from '../Services/Services';

const Home = () => {
    return (
        <div>
            <Slider/>
            <About/>
            <Services/>
        </div>
    );
};

export default Home;