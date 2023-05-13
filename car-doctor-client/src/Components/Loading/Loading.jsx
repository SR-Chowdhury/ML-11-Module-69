import React from 'react';

const Loading = () => {
    return (
        <div className='w-screen mx-auto p-8 text-center'>
            <progress className="progress w-56"></progress>
        </div>
    );
};

export default Loading;