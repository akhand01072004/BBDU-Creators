import { useEffect, useState } from "react"

export default function ManageUser() {
  
  const [Data, setData] = useState([]);

  const fetchData = async() => {
    const res = await fetch('http://localhost:3000/user/getall')
    console.log(res)
    if(res.status === 200){
        const data = await res.json();
        console.log(data);
        setData(data);
    }
  }

  useEffect(() => {
    fetchData();
  },[])

  const displayData = () => {
    return(
        Data.map((user,idx) => {
            <tr key={idx}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td><button className="bg-red">Delete</button></td>
            </tr>
        })
    )
  }

  return (
    <div>
      <header className='bg-danger text-white'>
      <div className='container py-5'>
        <h1>Manage User</h1>
      </div>
      </header>
      <div className='container mt-5'>
      <table className='table table-dark'>
      <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {displayData()}
      </tbody>
      </table></div>
    </div>
  )
}
