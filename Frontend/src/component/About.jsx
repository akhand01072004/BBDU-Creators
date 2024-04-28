import React from 'react';
import aboutImage from '../assets/about-div-bg.jpg'; // Ensure the path is correct
import './Design.css';

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white-100 px-4">
    <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 p-5 bg-white ">
      {/* Image Container */}
      <div className="w-full md:w-1/2">
        <img src={aboutImage} alt="About Us" className=" w-full h-auto object-cover"/>
      </div>

      {/* Text Container */}
      <div className="w-full md:w-1/2 text-justify">
        <h1 className="text-5xl text-center font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-black-900 text-lg">
          In the heart of a vibrant academic institution lies a thriving community of visionaries and innovators – the BBDU Creators. This dynamic collective is the embodiment of Babu Banarasi Das University's unwavering commitment to fostering an environment where creativity knows no bounds, and every idea is nurtured to its fullest potential. At BBDU Creators, we believe that innovation is the key to shaping the future, and it is our mission to empower students and faculty alike to explore, create, and inspire.
        </p>
        <p className="text-black-900 text-lg mt-2">
          The genesis of BBDU Creators was inspired by a simple yet powerful realization: within every individual lies a creative force waiting to be unleashed. With this in mind, we set out to build a platform that not only encourages artistic and scientific exploration but also promotes collaborative efforts that transcend traditional disciplinary boundaries. Our diverse community includes budding engineers, aspiring artists, tech enthusiasts, and everyone in between, all united by a common passion for creation and innovation.
        </p>
      </div>
    </div>
  </div>
  );
};

export default About;
