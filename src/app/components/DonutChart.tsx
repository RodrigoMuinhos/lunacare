import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface DonutChartProps {
  value: number;
  color: string;
  label: string;
  icon?: React.ReactNode;
}

export const DonutChart = ({ value, color, label, icon }: DonutChartProps) => {
  const data = [
    { name: 'completed', value: value },
    { name: 'remaining', value: 100 - value },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="font-medium text-gray-700">{label}</h3>
      </div>
      <div className="relative w-full h-32">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={50}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              strokeWidth={0}
            >
              <Cell fill={color} />
              <Cell fill="#F3F4F6" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-semibold text-gray-800">{value}%</span>
        </div>
      </div>
    </div>
  );
};
