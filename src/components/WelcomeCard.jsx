import React from 'react';

const WelcomeCard = () => {
    return (
        <div className='bg-gradient-to-b from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] text-white px-5 py-16 m-5 rounded-2xl'>
            <h1 className='text-3xl font-bold mb-3'>Welcome back, Admin!</h1>
            <p className='text-xl'>Here's what's happening at your university today. You have 42 new student enrollments this week.</p>
        </div>
    );
};

export default WelcomeCard;