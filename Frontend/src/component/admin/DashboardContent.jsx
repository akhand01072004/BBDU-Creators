import { useEffect} from 'react';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Total Projects Submission',
    },
  },
};

export const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Total User Registered',
    },
  },
};

const labels = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];

export const data = {
  labels,
  datasets: [
    {
      label: 'TotalNumber of Projects Submitted',
      data: [20,15,23,20,25,40,80],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};

export const data2 = {
  labels,
  datasets: [
    {
      label: 'TotalNumber of User Registered',
      data: [10,35,40,50,80,90,105],
      borderColor: 'rba(244,63,94',
      backgroundColor: 'rgba(244, 63,94)',
    }
  ],
};



export default function DashboardContent() {

    // const [totalUser, SetTotalUser] = useState('');
    // const [totalProjects, SetTotalProjects] = useState('');

    Chart.register(
      CategoryScale,
      LinearScale,
      BarElement,
      LineElement,
      PointElement,
      Title,
      Tooltip,
      Legend
    );

    

    // const FindTotalUser = async() =>{
    //   const res = await fetch('http://localhost:3000/users/totalUser');
    //   const number = await res.json();
    //   //SetTotalUser(number?.totalUser);
    // }

    // const FindTotalProjects = async() =>{
    //   const res = await fetch('http://localhost:3000/project/totalProjects');
    //   const number = await res.json();
    //  // SetTotalProjects(number?.totalProject);
    // }
  
    // useEffect(() => {
    //   FindTotalUser();
    //   FindTotalProjects();
    // },[])
  return (
    <div className='mt-1 ml-1 bg-white min-h-screen'>
        <h1 className='text-6xl ml-[38%] mb-2 my-1 text-blue-500'>DashBoard</h1>
        <div className="w-[50%] ml-[25%] mt-4 cursor-pointer">
        <Bar options={options} data={data} />
        <Line options={options2} data={data2} />
        </div>
        </div>
  )
}
