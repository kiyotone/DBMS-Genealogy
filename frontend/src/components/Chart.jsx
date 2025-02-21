// src/components/Chart.js
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Chart = ({ familyData, relationshipData, personData, eventData }) => {
  const data = [
    { name: "Families", count: familyData.length },
    { name: "Relationships", count: relationshipData.length },
    { name: "Persons", count: personData.length },
    { name: "Events", count: eventData.length },
  ];

  return (
    <div className="w-full h-[25rem] mt-10 bg-[#FDF7F2] p-4 rounded-xl shadow-md">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid stroke="#E6B89C" strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#4A4A4A" />
          <YAxis stroke="#4A4A4A" />
          <Tooltip
            contentStyle={{ backgroundColor: "#F3D5B5", border: "none", borderRadius: "10px" }}
            itemStyle={{ color: "#4A4A4A" }}
          />
          <Legend wrapperStyle={{ color: "#4A4A4A" }} />
          <Bar
            dataKey="count"
            fill="#7C5E4C"
            radius={[10, 10, 0, 0]}
            barSize={50}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
