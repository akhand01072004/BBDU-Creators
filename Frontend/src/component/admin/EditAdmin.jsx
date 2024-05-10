import  { useEffect, useState } from 'react';
import Image from '../../assets/Admin-edit.jpg';
import { enqueueSnackbar } from 'notistack';

const EditAdmin = () => {
    
    const [imageurl,setImageurl] = useState('');
    const [adminemail, setAdminEmail] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        about: '',
        experience: ''
    });
    const GetAdminData = async() => {
        const resp = await fetch('https://bbdu-backend-2.onrender.com/admin/validatetoken',{
            credentials : "include",
            headers : {
                'Content-Type' : 'application/json'
            }
        });
        const admindata = await resp.json();
        setImageurl(admindata?.imageurl);
        setAdminEmail(admindata?.email);
        setFormData(admindata);
    }


    const handleChange = (e) => {
        setFormData({ ...formData,
            [e.target.name]: e.target.value,
            [e.target.about]: e.target.value,
            [e.target.experience]: e.target.value
        });
      };

      const updateImage = async() => {
        const formdata = {
            email: adminemail,
            imageurl: imageurl
        }
        console.log(formdata)
        try {
            console.log(formData)
            const resp = await fetch('https://bbdu-backend-2.onrender.com/admin/updateImage', {
                method : "PUT",
                credentials: "include",
                body : JSON.stringify(formdata),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
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


    // Form submission handler
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            console.log(formData)
            const resp = await fetch('https://bbdu-backend-2.onrender.com/admin/updateprofile', {
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
    };

    useEffect(() => {
        GetAdminData();
    },[])

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
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="mt-1 w-full p-2 rounded-md border-2 border-black shadow-sm"
                                    required
                                />
                            </label>
                        </div>
                        {/* <div className="md:col-span-2">
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
                        </div> */}
                        <div className="md:col-span-2">
                            <label className="block text-lg text-black">
                                About Me
                                <textarea
                                    name="about"
                                    value={formData.about}
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={UploadImage}
                                    className="mt-1 w-full p-2 rounded-md border-2 border-black shadow-sm"
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
