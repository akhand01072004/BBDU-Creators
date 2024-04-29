import React from 'react'
import "./Sign.css"

const Section2 = () => {
    return (
        <>
        
            <div className="container mx-auto  h-full flex flex-col items-center justify-center mt-20 px-4 mb-10 sec2">
                <div className='mb-20 text-center'>
                    <h1 className='text-5xl fs text-center mb-5'>Our Features</h1>
                    <p className='text-center'>Place where you get Recognize. </p>
                    <p className='text-center'> Create. Innovate. Showcase.</p>
                </div>
                <div className='flex flex-wrap justify-center items-stretch gap-10 '>
                    <div className="flex flex-col  md:flex-row items-center   ">
                        <div className="relative flex items-center  m-10 md:mr-65  "> {/* Container for positioning the circle */}
                            <div className=" hidden md:block absolute h-16 w-16 md:h-20 md:w-20 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] rounded-full bg-yellow-500 -left-8 md:-left-12 transform -translate-y-1/2 top-1/2 m1"></div> {/* Circle */}
                            <div className="w-80  h-36 md:w-96 md:h-40 bg-white shadow-[rgba(0,_0,_0,_0.4)_0px_30px_30px] rounded-md pl-12">
                                <h2 className='text-xl md:text-2xl font-bold mt-2 mb-2'>Feedback and Review Sessions</h2>
                                <p className='text-xs md:text-sm'>
                                    Provides structured feedback sessions where students can receive constructive critiques from experienced creators and educators to refine their projects.                                </p>
                            </div> {/* Card with padding to accommodate circle */}
                        </div>
                        <div className="relative flex items-center "> {/* Container for positioning the circle */}
                            <div className="hidden md:block absolute h-16 w-16 md:h-20 md:w-20 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] rounded-full bg-green-500 md:-left-10 -left-8 transform -translate-y-1/2 top-1/2 m2"></div> {/* Circle */}
                            <div className="w-80 h-36 md:w-96 md:h-40 bg-green-200 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_30px] rounded-md pl-12">
                                <h2 className='text-xl md:text-2xl font-bold mt-2 mb-2'>Project Showcasing Events</h2>
                                <p className='text-xs md:text-sm'> Organizes regular events, both online and on-campus, where students can present their projects to a live audience, enhancing their presentation skills and gaining visibility.
                                </p>
                            </div> {/* Card with padding to accommodate circle */}
                        </div>

                    </div>
                    <div className="flex flex-col  md:flex-row items-center ">
                        <div className="relative flex items-center  m-10 md:mr-65"> {/* Container for positioning the circle */}
                            <div className="hidden md:block absolute h-16 w-16 md:h-20 md:w-20 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] rounded-full bg-purple-600 -left-8 md:-left-10 transform -translate-y-1/2 top-1/2 m3"></div> {/* Circle */}
                            <div className="w-80 h-36 md:w-96 md:h-40 bg-purple-200 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_30px] rounded-md pl-12">
                                <h2 className='text-xl md:text-2xl font-bold mt-2 mb-2'>Technical Support Services</h2>
                                <p className='text-xs md:text-sm'> Offers technical assistance for students working on complex projects, including access to advanced software tools, coding help, and troubleshooting.
                                </p>
                            </div> {/* Card with padding to accommodate circle */}
                        </div>
                        <div className="relative flex items-center "> {/* Container for positioning the circle */}
                            <div className="hidden md:block absolute h-16 w-16 md:h-20 md:w-20 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] rounded-full bg-pink-600 md:-left-10 -left-8 transform -translate-y-1/2 top-1/2 m4"></div> {/* Circle */}
                            <div className=" w-80 h-36 md:w-96 md:h-40 bg-pink-200 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_30px] rounded-md pl-12">
                                <h2 className='text-xl md:text-2xl font-bold mt-2 mb-2'>Networking Opportunities</h2>
                                <p className='text-xs md:text-sm'>Facilitates networking events with industry professionals who can provide career guidance, internship opportunities, and insights into industry trends related to students' projects.
                                </p>
                            </div> {/* Card with padding to accommodate circle */}
                        </div>

                    </div>

                    <div className="flex flex-col  md:flex-row items-center ">
                        <div className="relative flex items-center  m-10 md:mr-65"> {/* Container for positioning the circle */}
                            <div className="hidden md:block absolute h-16 w-16 md:h-20 md:w-20 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] rounded-full bg-red-600 -left-8 md:-left-10 transform -translate-y-1/2 top-1/2 m5"></div> {/* Circle */}
                            <div className="w-80 md:w-96 h-36 md:h-40 bg-red-200 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_30px] rounded-md pl-12">
                                <h2 className='text-xl md:text-2xl font-bold mt-2 mb-2'> Awards and Recognition Programs </h2>
                                <p className='text-xs md:text-sm'>
                                    Runs competitions and award programs that recognize outstanding student projects, providing incentives for innovation and excellence.
                                </p>
                            </div> {/* Card with padding to accommodate circle */}
                        </div>
                        <div className="relative flex items-center "> {/* Container for positioning the circle */}
                            <div className="hidden md:block absolute h-16 w-16 md:h-20 md:w-20 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] rounded-full bg-blue-800 -left-8 md:-left-10 transform -translate-y-1/2 top-1/2 m6"></div> {/* Circle */}
                            <div className="w-80 md:w-96 h-36 md:h-40 bg-blue-200 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_30px] rounded-md pl-12">
                                <h2 className='text-xl md:text-2xl font-bold mt-2 mb-2'> Online Portfolio Hosting </h2>
                                <p className='text-xs md:text-sm'>
                                    Offers a platform for students to create and maintain an online portfolio where they can showcase their projects to peers, professors, and potential employers.            </p>
                            </div> {/* Card with padding to accommodate circle */}
                        </div>

                    </div>


                </div>
            </div>

        </>
    )
}

export default Section2