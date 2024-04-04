import React from 'react'
import "./Design.css"

const About = () => {
  return (
    <div className="flex justify-center items-center h-full sec3"> {/* Parent div covering full height and centering children */}
      <div className="flex gap-4 items-center" style={{maxWidth: '1200px'}}> {/* Adjusted: Container for the two divs with spacing and vertical centering, with a maximum width */}
        <div className="same bg-transparent image1"></div> {/* First child div */}
        <div className="same bg-transparent flex flex-col justify-start text-start p-4" style={{flex: 1}}> {/* Adjusted: Flex container for left-aligned content */}
          <h1 className='text-6xl fs mb-5 fw'>About Us</h1>
          <p className='mb-5'> In the heart of a vibrant academic institution lies a thriving community of visionaries and innovators – the BBDU Creators. This dynamic collective is the embodiment of Babu Banarasi Das University's unwavering commitment to fostering an environment where creativity knows no bounds, and every idea is nurtured to its fullest potential. At BBDU Creators, we believe that innovation is the key to shaping the future, and it is our mission to empower students and faculty alike to explore, create, and inspire.

The genesis of BBDU Creators was inspired by a simple yet powerful realization: within every individual lies a creative force waiting to be unleashed. With this in mind, we set out to build a platform that not only encourages artistic and scientific exploration but also promotes collaborative efforts that transcend traditional disciplinary boundaries. Our diverse community includes budding engineers, aspiring artists, tech enthusiasts, and everyone in between, all united by a common passion for creation and innovation. </p>
        </div> {/* Second child div */}
      </div>
    </div>
  )
}

export default About