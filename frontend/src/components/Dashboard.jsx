import React from "react";
import Chart from "./Chart"; // Ensure Chart is correctly implemented

const Dashboard = ({ familyData, relationshipData, personData, eventData }) => {
  // Count the number of males and females
  const genderCount = personData.reduce(
    (acc, { gender }) => {
      if (gender === "Male") acc.males += 1;
      else if (gender === "Female") acc.females += 1;
      return acc;
    },
    { males: 0, females: 0 }
  );

  // Determine the most common family origin country
  const originCountryCount = familyData.reduce((acc, { origin_country }) => {
    acc[origin_country] = (acc[origin_country] || 0) + 1;
    return acc;
  }, {});

  const [mostCommonCountry, mostCommonCount] = Object.entries(originCountryCount).reduce(
    (prev, current) => (current[1] > prev[1] ? current : prev),
    ["Unknown", 0]
  );

  const totalDataCount = familyData.length + relationshipData.length + personData.length + eventData.length;

  return (
    <div className="col-span-1 bg-[#F3D5B5] border-[#A78B71] border p-6 rounded-xl shadow-lg h-[40rem]">
      {/* Total Data Section */}
      <div className="flex items-center justify-between bg-[#E6B89C] p-4 rounded-2xl text-2xl font-semibold text-black">
        <div>
          <p>Total Data:</p>
          <p>{totalDataCount}</p>
        </div>
        <div className="text-lg">
          <p>Males: {genderCount.males}</p>
          <p>Females: {genderCount.females}</p>
        </div>
      </div>

      {/* Most Common Family Origin Country */}
      <div className="flex items-center text-black justify-between bg-[#E6B89C] p-4 rounded-2xl mt-4">
        <p className="text-xl">
          Most Families From: <strong>{mostCommonCountry}</strong> ({mostCommonCount} families)
        </p>
      </div>

      {/* Chart Section */}
      <div className="flex justify-center ">
        <div className="relative w-full max-w-[100%] h-[30rem] overflow-hidden">
          <Chart
            familyData={familyData}
            relationshipData={relationshipData}
            personData={personData}
            eventData={eventData}
          />
        </div>
      </div>
      </div>
  );
};

export default Dashboard;
