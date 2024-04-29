import React from 'react';
import aboutImage from '../assets/about-div-bg.jpg'; // Ensure the image path is correct

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white bg-head bg-cover bg-center">
      <div className="container mx-auto p-4 flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Image container */}
        <div className=" flex justify-center mb-6 md:mb-0 bg-white">
          <img src={aboutImage} alt="About Us" className=" max-w-full md:max-w-md lg:max-w-lg" />
        </div>

        {/* Text content container */}
        <div className="flex-1 flex flex-col items-center text-center justify-center px-4 md:max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
          <p className="text-sm md:text-lg lg:text-base">
            In the heart of a vibrant academic institution lies a thriving community of visionaries and innovators – the BBDU Creators. This dynamic collective is the embodiment of Babu Banarasi Das University's unwavering commitment to fostering an environment where creativity knows no bounds, and every idea is nurtured to its fullest potential. At BBDU Creators, we believe that innovation is the key to shaping the future, and it is our mission to empower students and faculty alike to explore, create, and inspire.
            <br /><br />
            The genesis of BBDU Creators was inspired by a simple yet powerful realization: within every individual lies a creative force waiting to be unleashed. With this in mind, we set out to build a platform that not only encourages artistic and scientific exploration but also promotes collaborative efforts that transcend traditional disciplinary boundaries. Our diverse community includes budding engineers, aspiring artists, tech enthusiasts, and everyone in between, all united by a common passion for creation and innovation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
