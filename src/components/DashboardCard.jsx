import React from 'react';

const DashboardCard = ({ title, value, change, icon }) => {
  const isPositive = change.includes('+');
  const isZero = change === '0%';

  const changeColor = isZero ? 'text-gray-500' : isPositive ? 'text-green-600' : 'text-red-600';

  return (
    <div className="hover:border-[#097C7DFF] flex mx-auto  items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 w-full border">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">
          {value} <span className={`text-sm font-medium ${changeColor}`}>{change}</span>
        </p>
      </div>
      <div className="p-2 bg-gray-100 rounded-full">
        <span className="text-xl">{icon}</span>
      </div>
    </div>
  );
};

export default DashboardCard;
