import React from 'react';

const ProfilePage = () => {
  // Placeholder for user data and skills
 
  return (
    <>
     <div className="bg-blue-300 py-20 h-full">
      <div className="flex justify-center items-center h-full">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-black flex items-end justify-start text-white h-48 p-4">
            <div className="flex flex-col items-center mr-3">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                alt="Profile" className="rounded-full border-4 border-white shadow-sm w-24 h-24 mb-2" />
              <button className="text-sm py-1 px-3 border border-gray-700 rounded hover:bg-gray-700 hover:text-white transition duration-150">
                Edit profile
              </button>
            </div>
            <div className="ml-3">
              <h5 className="text-lg">Andy Horwitz</h5>
              <p className="text-base">New York</p>
            </div>
          </div>
          <div className="p-4 bg-gray-100">
            <div className="flex justify-around text-center py-1">
              <div>
                <p className="text-lg">253</p>
                <p className="text-sm text-gray-600">Photos</p>
              </div>
              <div>
                <p className="text-lg">1026</p>
                <p className="text-sm text-gray-600">Followers</p>
              </div>
              <div>
                <p className="text-lg">478</p>
                <p className="text-sm text-gray-600">Following</p>
              </div>
            </div>
          </div>
          <div className="text-black p-4">
            <div className="mb-5">
              <p className="text-lg font-normal mb-1">About</p>
              <div className="p-4 bg-gray-100">
                <p className="italic mb-1">Web Developer</p>
                <p className="italic mb-1">Lives in New York</p>
                <p className="italic mb-0">Photographer</p>
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="font-normal mb-0">Recent photos</p>
              <p className="text-sm text-gray-600 cursor-pointer">Show all</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                alt="Gallery Image" className="w-full md:w-1/2 rounded-lg" />
              <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                alt="Gallery Image" className="w-full md:w-1/2 rounded-lg" />
              <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                alt="Gallery Image" className="w-full md:w-1/2 rounded-lg" />
              <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                alt="Gallery Image" className="w-full md:w-1/2 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default ProfilePage;
