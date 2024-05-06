import React, { useState } from 'react';
import Image from '../assets/Admin-edit.jpg'

const EditAdmin = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        aboutMe: '',
        experience: '',
        image: null
    });

    // Handle input changes for text fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle image file changes
    const handleImageChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            image: e.target.files[0]
        }));
    };

    // Form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation to ensure all fields are filled
        for (let key in formData) {
            if (!formData[key] && key !== 'image') {
                alert(`Please fill in the ${key}`);
                return;
            }
            if (key === 'image' && formData[key] === null) {
                alert(`Please upload an image`);
                return;
            }
        }
        console.log('Form Data Submitted', formData);
        // Add actual submission logic here (e.g., sending data to a server)
    };

    return (
        <div className='min-h-screen flex items-center justify-center upb'>
            <div className="bg-white shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] rounded-lg p-8 max-w-4xl w-full m-4 flex gap-6 m-16 md:m-20">
                
                <div>
                    <h2 className="text-2xl md:text-4xl font-semibold text-center text-gray-700 mb-6">Edit Admin Profile</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-lg text-black">
                                Name
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your name"
                                    className="mt-1 w-full p-2 rounded-md border-2 border-black shadow-sm"
                                    required
                                />
                            </label>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-lg text-black">
                                Description
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Enter a brief description"
                                    className="mt-1 w-full p-2 rounded-md border-2 border-black shadow-sm"
                                    required
                                />
                            </label>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-lg text-black">
                                About Me
                                <textarea
                                    name="aboutMe"
                                    value={formData.aboutMe}
                                    onChange={handleInputChange}
                                    placeholder="Describe yourself"
                                    className="mt-1 w-full p-2 rounded-md border-2 border-black shadow-sm"
                                    required
                                />
                            </label>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-lg  text-black">
                                Experience
                                <textarea
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleInputChange}
                                    placeholder="Detail your experience"
                                    className="mt-1 w-full p-2 rounded-md border-2 border-black shadow-sm"
                                    required
                                />
                            </label>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-lg text-black">
                                Upload Image
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    className="mt-1 w-full p-2 rounded-md border-2 border-black shadow-sm"
                                    required
                                />
                            </label>
                        </div>
                        <div className="md:col-span-2">
                            <button type="submit" className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
                <div className="hidden md:block w-2/5">
                        <img src={Image} alt="" className=" object-cover h-full" />
                </div>
            </div>
        </div>
    );
};

export default EditAdmin;
