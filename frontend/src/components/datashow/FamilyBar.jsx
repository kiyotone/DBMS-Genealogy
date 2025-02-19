import React from "react";

const FamilyBar = ({ data, index }) => {
  if (index === -1) {
    return (
      <div className="grid grid-cols-2 text-black p-4 bg-gray-400 font-bold border-b border-gray-600">
        <div className="text-left">Family Name</div>
        <div className="text-left">Origin Country</div>
      </div>
    );
  }

  if (!data) return null;

  const birthYear = new Date(data.dateofbirth).getFullYear();
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  const odd = index % 2 === 0;

  return (
    <div
      className={`grid grid-cols-2 text-black p-4 border-b border-gray-300 ${
        odd ? "bg-yellow-200" : "bg-yellow-300"
      }`}
    >
      <div className="text-left">{data.name}</div>
      <div className="text-left">{data.origin_country}</div>
    </div>
  );
};

export default FamilyBar;
