import { useState, useEffect } from 'react';
import Image from '../assets/Edit.jpg'
import { enqueueSnackbar } from 'notistack';

// Mapping from schools to courses
const schoolCoursesMap = {
    "SCHOOL OF ENGINEERING": ["B.TECH (CSE)", "B.TECH (CSE-AI)", "B.TECH (CSE-CCML)", "B.TECH (CSE-IOTBC)", "M. TECH (COMPUTER NETWORK)", "M. TECH (SOFTWARE ENGINEERING)", "PH.D (CSE)"],
    "SCHOOL OF MANAGEMENT": ["B.COM. (HONS.)", "BBA", "BBA (LOGISTICS AND SUPPLY CHAIN MANAGEMENT)", "BBA - BUSINESS ANALYTICS (IN COLLABORATION WITH IBM)", "MBA", "PH.D", "IMBA"],
    "SCHOOL OF COMPUTER APPLICATIONS": ["BCA", "MCA", "PH.D", "BCA IN DATA SCIENCE & ARTIFICIAL INTELLIGENCE", "BCA IN CYBER SECURITY & FORENSICS", "MCA IN DATA SCIENCE & ARTIFICIAL INTELLIGENCE"],
    "SCHOOL OF PHARMACY": ["Bachelor of Pharmacy", "Ph.D. Pharmacy"],
    "SCHOOL OF ARCHITECTURE AND PLANNING": ["BACHELOR OF ARCHITECTURE", "MASTERS OF PLANNING (URBAN PLANNING)", "Bachelor of Interior Design"],
    "SCHOOL OF HOTEL MANAGEMENT": ["BACHELOR OF HMCT"],
    "SCHOOL OF LEGAL STUDIES": ["BBA+LL.B (INTEGRATED)", "BA+LL.B (INTEGRATED)", "LLM", "PH.D"],
    "SCHOOL OF BASIC SCIENCES": ["B.SC. (HONS.)", "M.SC.", "PH. D"],
    "SCHOOL OF HUMANITIES & SOCIAL SCIENCES": ["PH. D"],
    "SCHOOL OF EDUCATION": ["PH. D"],
    "BABU BANARASI DAS COLLEGE OF DENTAL SCIENCES": ["DDS", "Ph.D. Dental Sciences"]
};



const EditUser = () => {
    const [imageurl,setImageurl] = useState('');
    const [useremail, setUserEmail] = useState('');
    const [formData, SetformData] = useState({
        name : '',
        about : '',
        email : '',
        school : '',
        course : '',
        duration : ''
    })
    const UserDetail = async () => {
        try {
            const resp = await fetch('https://bbdu-backend-2.onrender.com/users/validatetoken', {
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const userdata = await resp.json();
            setImageurl(userdata?.userimage);
            setUserEmail(userdata?.email);
            SetformData(userdata);
            console.log(userdata);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        UserDetail();
    }, [])


    const handleChange = (e) => {
        SetformData({ ...formData,
            [e.target.name]: e.target.value,
            [e.target.about]: e.target.value,
            [e.target.email]: e.target.value,
            [e.target.school]: e.target.value,
            [e.target.course]: e.target.value,
            [e.target.duration]: e.target.value
        });
      };


    // const handleFileChange = (e) => {
    //     setFormData(prevState => ({
    //         ...prevState,
    //         image: e.target.files[0]
    //     }));
    // };

    const updateImage = async() => {
        const formdata = {
            email: useremail,
            userimage: imageurl
        }
        console.log(formdata)
        try {
            console.log(formData)
            const resp = await fetch('https://bbdu-backend-2.onrender.com/users/updateImage', {
                method : "PUT",
                credentials: "include",
                body : JSON.stringify(formdata),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(resp.status == '202'){
                enqueueSnackbar('User Profile Image Updated', { variant: 'success' });
            }
        } catch (error) {
            console.log(error);
        }
    }
   
    const UploadImage = async (event) => {
        const file = event.target.files[0];
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "ml_default");
        data.append("cloud_name", "dl81ig8l5");
        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dl81ig8l5/image/upload', {
                method: "POST",
                body: data
            });
            const resp = await response.json();
            setImageurl(resp.url);
            console.log(resp.url);
        } catch (error) {
            console.log("failed to upload");
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            console.log(formData)
            const resp = await fetch('http://localhost:3000/users/updateprofile', {
                method : "PUT",
                credentials: "include",
                body : JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            updateImage();
            if(resp.status == '202'){
                enqueueSnackbar('User Profile Updated', { variant: 'success' });
            }
        } catch (error) {
            console.log(error);
        }
        // Validation to ensure all fields are filled
        console.log('Form Data Submitted', formData);

        // Add actual submission logic here
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 upb'>
            <div className="bg-white shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] rounded-lg p-8 max-w-5xl w-full m-4 flex gap-6 m-16 md:m-20">
                <div className="hidden md:block w-2/5">
                        <img src={Image} alt="" className=" object-cover h-full" />
                </div>

                
                <div>
                    <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-700 mb-6">Edit User Details</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block">
                                <span className="text-black text-lg">Name</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full rounded-md border-2 border-black shadow-sm"
                                    required
                                />
                            </label>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block">
                                <span className="text-black text-lg">About</span>
                                <textarea
                                    name="about"
                                    value={formData.about}
                                    onChange={handleChange}
                                    className="mt-1 p-1  w-full rounded-md border-2 border-black shadow-sm "
                                    required
                                />
                            </label>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block">
                                <span className="text-black text-lg">Email</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 w-full p-2 rounded-md border-2 border-black shadow-sm"
                                    required
                                />
                            </label>
                        </div>
                        <div className="md:col-span-1">
                            <label className="block">
                                <span className="text-black text-lg">School</span>
                                <select
                                    name="school"
                                    value={formData.school}
                                    onChange={handleChange}
                                    className=" mt-1 p-2 w-full rounded-md border-2 border-black shadow-sm"
                                    required
                                >
                                    <option value="">Select School</option>
                                    {Object.keys(schoolCoursesMap).map(school => (
                                        <option key={school} value={school}>{school}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="md:col-span-1">
                            <label className="block">
                                <span className="text-black text-lg">Course</span>
                                <select
                                    name="course"
                                    value={formData.course}
                                    onChange={handleChange}
                                    className="  mt-1 p-2 w-full rounded-md border-2 border-black shadow-sm"
                                    required
                                    disabled={!formData.school}
                                >
                                    <option value="">Select Course</option>
                                    {formData.school && schoolCoursesMap[formData.school].map(course => (
                                        <option key={course} value={course}>{course}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block">
                                <span className="text-black text-lg">Duration</span>
                                <input
                                    type="text"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    className="mt-1 w-full p-2 rounded-md border-2 border-black shadow-sm"
                                    required
                                />
                            </label>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block">
                                <span className="text-black text-lg">Profile Image</span>
                                <input
                                    type="file"
                                    accept="image/*" onChange={UploadImage}
                                    value={formData.imageurl}
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
            </div>
        </div>
    );
};

export default EditUser;
