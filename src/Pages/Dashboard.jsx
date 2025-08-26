import { useLoaderData } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';
import WelcomeCard from '../components/WelcomeCard';

const Dashboard = () => {
    const data = useLoaderData()

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
        </div>
    );
};

export default Dashboard;