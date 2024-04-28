import React from 'react';
import Aim from '../assets/Aimm.jpg';
import './Sign.css';

const Section1 = () => {
  return (
    <>
      {/* Add responsive flex direction change */}
      <div className="flex flex-col md:flex-row justify-center items-center p-10 bg-gray-100 sec1">
        <div className="flex flex-col items-center mb-10 md:mb-0">
          <h1 className="text-5xl font-bold mb-2">Our Aim</h1>
          <img src={Aim} alt="Aim" className="w-full md:w-600" />  {/* Ensure the image resizes appropriately */}
        </div>
        <div className="flex flex-col justify-start items-start">
          <ul className="space-y-2">
            <li> <span className="text-3xl font-bold text-blue-500">Foster Creativity:</span></li>
            <li className="text-xl">Encourage and nurture creative expression across a wide range of disciplines.</li>
            <li> <span className="text-3xl font-bold text-blue-500">Promote Collaboration:</span></li>
            <li className="text-xl">Build a collaborative platform for sharing ideas and resources among creators.</li>
            <li> <span className="text-3xl font-bold text-blue-500">Enhance Skills:</span></li>
            <li className="text-xl">Provide educational opportunities and resources to help creators refine and advance their skills.</li>
            <li> <span className="text-3xl font-bold text-blue-500">Support Innovation:</span></li>
            <li className="text-xl">Support innovative projects and ideas that push the boundaries of traditional creativity.</li>
            <li> <span className="text-3xl font-bold text-blue-500">Expand Networks:</span></li>
            <li className="text-xl">Create networking opportunities that allow creators to connect, partner, and grow professionally.</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Section1;
