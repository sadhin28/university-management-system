import { useLoaderData } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';
import WelcomeCard from '../components/WelcomeCard';
import DashboardCards from '../components/DashboardCards';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const data = useLoaderData()
    const [resentStudent,setresentStudent]=useState([])
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_API}/resent-student`)
        .then(res=>res.json()
        .then(data=>setresentStudent(data))
    )
    },[])
    return (
        <div>
            <WelcomeCard />
            <div className="px-6  py-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6 ">
                {data.map((item, index) => (
                    <DashboardCard
                        key={index}
                        title={item.title}
                        value={item.value}
                        change={item.change}
                        icon={item.icon}
                    />
                ))}
            </div>
           <div className='px-4'>
               <DashboardCards resentStudent={resentStudent} key={resentStudent._id}/>
           </div>
        </div>
    );
};

export default Dashboard;