import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import { enqueueSnackbar } from 'notistack';

export default function ProjectDetail() {
  const [project, setProjects] = useState([]);
  const {id} = useParams();

  const fetchdata = async() => {
    try {
        const response = await fetch(`http://localhost:3000/user/api/projects/${id}`);
        const data = await response.json();
        setProjects(data);
        if(response.status === 200){
            enqueueSnackbar('Project Fetch Successfully', {variant: 'success'})
        }else{
            enqueueSnackbar('Facing error while fetching', {variant: 'error'})
        }
    } catch (error) {
        console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchdata();
  },[])

  console.log(project)

  return (
    <div className='border 2px bg-blue-500 text-white'>
      <h1>Project Detail</h1>
      <h1>Name : {project.name}</h1>
      <h2>Email : {project.email}</h2>
      <h2>Department : {project.department}</h2>
      <p>ProjectName : {project.projectName}</p>
    </div>
  )
}
