import React from "react";
import Chart from "./Chart"; // Assuming you have Chart in the same folder

const Dashboard = ({ familyData, relationshipData, personData, eventData }) => {
  // Count the number of males and females in the personData
  const genderCount = personData.reduce(
    (acc, person) => {
      if (person.gender === "Male") {
        acc.males += 1;
      } else if (person.gender === "Female") {
        acc.females += 1;
      }
      return acc;
    },
    { males: 0, females: 0 }
  );

  // Calculate the most common family origin country
  const originCountryCount = familyData.reduce((acc, family) => {
    const country = family.origin_country;
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {});

  const mostCommonCountry = Object.entries(originCountryCount).reduce(
    (prev, current) => (current[1] > prev[1] ? current : prev),
    ["", 0]
  );

  return (
    <div className="col-span-2 bg-[#f5f5dc] p-6 rounded-2xl shadow-lg h-[40rem]">
      {/* Total Data Header */}
      <div className="flex items-center justify-between bg-[#f5f5dc] p-4 rounded-2xl text-2xl font-semibold text-black">
        <div>
          <p>Total Data:</p>
          <p>{familyData.length + relationshipData.length + personData.length + eventData.length}</p>
        </div>
        <div className="text-lg">
          <p>Males: {genderCount.males}</p>
          <p>Females: {genderCount.females}</p>
        </div>
      </div>

      {/* Most Common Family Origin Country */}
      <div className="flex items-center text-black justify-between bg-[#f5f5dc] p-4 rounded-2xl mt-4">
        <p className="text-xl">
          Most Families From: <strong>{mostCommonCountry[0]}</strong> ({mostCommonCountry[1]} families)
        </p>
      </div>

      {/* Chart Section */}
      <div className="flex items-center justify-between ml-20 mt-20 p-4 rounded-2xl ">
        <Chart
          familyData={familyData}
          relationshipData={relationshipData}
          personData={personData}
          eventData={eventData}
        />
      </div>
    </div>
  );
};

export default Dashboard;
