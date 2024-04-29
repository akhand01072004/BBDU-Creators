import React from 'react';
import "./Sign.css";

const Section2 = () => {
    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 sec2 '>
            <div className="container mx-auto p-4 flex flex-col items-center justify-center mb-20">
                <div className='text-center mb-10'>
                    <h1 className='text-5xl md:text-4xl lg:text-5xl font-bold mb-5'>Our Features</h1>
                    <p className='text-lg text-black'>Place where you get Recognized.</p><p className='text-lg text-black'> Create. Innovate. Showcase.</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
                    {features.map((feature, index) => (
                        <div key={index} className={`relative flex flex-col md:flex-row items-center  rounded-lg shadow-md p-4 md:ml-65 mb-10 ${feature.color}`}>
                            <div className={`absolute md:-left-10 -left-4 top-1/2 transform -translate-y-1/2 h-16 w-16 md:h-20 md:w-20 rounded-full shadow-lg ${feature.bgColor} ${feature.img}`}></div>
                            <div className="ml-12  md:w-96 ">
                                <h2 className='text-xl md:text-2xl font-bold mb-2'>{feature.title}</h2>
                                <p className='text-sm md:text-base'>{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const features = [
    {
        title: "Feedback and Review Sessions",
        description: "Provides structured feedback sessions where students can receive constructive critiques from experienced creators and educators to refine their projects.",
        bgColor: "bg-yellow-500",
        img: "m1",
        color: "bg-yellow-300"
    },
    {
        title: "Project Showcasing Events",
        description: "Organizes regular events, both online and on-campus, where students can present their projects to a live audience, enhancing their presentation skills and gaining visibility.",
        bgColor: "bg-green-500",
        img: "m2",
        color: "bg-green-200"

    },
    {
        title: "Technical Support Services",
        description: "Offers technical assistance for students working on complex projects, including access to advanced software tools, coding help, and troubleshooting.",
        bgColor: "bg-purple-600",
        img: "m3",
        color:"bg-purple-200"
    },
    {
        title: "Networking Opportunities",
        description: "Facilitates networking events with industry professionals who can provide career guidance, internship opportunities, and insights into industry trends related to students' projects.",
        bgColor: "bg-pink-600",
        img: "m4",
        color:"bg-pink-200"
    },
    {
        title: "Awards and Recognition Programs",
        description: "Runs competitions and award programs that recognize outstanding student projects, providing incentives for innovation and excellence.",
        bgColor: "bg-red-600",
        img: "m5",
        color:"bg-red-200"
    },
    {
        title: "Online Portfolio Hosting",
        description: "Offers a platform for students to create and maintain an online portfolio where they can showcase their projects to peers, professors, and potential employers.",
        bgColor: "bg-blue-800",
        img: "m6",
        color:"bg-blue-200"
    }
];

export default Section2;
