import React from 'react'

const Profile = () => {
  return (
    <>
    <header className="bg-blue-800 text-white p-4">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-lg font-bold">LinkedIn</h1>
      <nav>
        <a href="#profile" className="px-4 hover:underline">Profile</a>
        <a href="#experience" className="px-4 hover:underline">Experience</a>
        <a href="#skills" className="px-4 hover:underline">Skills</a>
      </nav>
    </div>
    </header>
    <section id="profile" className="py-8 px-4">
    <div className="container mx-auto flex">
      <img src="https://via.placeholder.com/150" alt="Profile" className="rounded-full w-32 h-32 mr-8" />
      <div>
        <h2 className="text-2xl font-bold">John Doe</h2>
        <p>Software Engineer at Example Corp</p>
        <p className="mt-2 text-gray-600">Experienced Software Engineer with a demonstrated history of working in the information technology and services industry. Skilled in Full Stack Development, Management, and Software as a Service (SaaS).</p>
      </div>
    </div>
  </section>
  <section id="experience" className="py-8 px-4 bg-gray-100">
    <div className="container mx-auto">
      <h2 className="text-xl font-bold mb-4">Experience</h2>
      <div className="mb-4">
        <h3 className="text-lg font-bold">Software Engineer - Example Corp</h3>
        <p className="text-gray-600">Jan 2020 - Present</p>
        <ul className="list-disc list-inside text-gray-600">
          <li>Developed and maintained code for in-house and client websites primarily using HTML, CSS, Sass, JavaScript, and jQuery</li>
          <li>Managed front-end and back-end development for client projects</li>
        </ul>
      </div>
      {/* Repeat for other experiences */}
    </div>
  </section>
  <section id="skills" className="py-8 px-4">
    <div className="container mx-auto">
      <h2 className="text-xl font-bold mb-4">Skills</h2>
      <div className="flex flex-wrap">
        <span className="bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 m-1">JavaScript</span>
        <span className="bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 m-1">React</span>
        {/* Add more skills as needed */}
      </div>
    </div>
  </section>



    </>
  )
}

export default Profile