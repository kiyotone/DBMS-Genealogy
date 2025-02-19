import React from "react";

const PersonBar = ({ data, index }) => {
  if (index === -1) {
    return (
      <div className="grid grid-cols-4 text-black p-4 bg-gray-400 font-bold border-b border-gray-600">
        <div className="text-left">First Name</div>
        <div className="text-left">Last Name</div>
        <div className="text-left">Gender</div>
        <div className="text-left">Age</div>
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
      className={`grid grid-cols-4 text-black p-4 border-b border-gray-300 ${
        odd ? "bg-yellow-200" : "bg-yellow-300"
      }`}
    >
      <div className="text-left">{data.firstname}</div>
      <div className="text-left">{data.lastname}</div>
      <div className="text-left">{data.gender}</div>
      <div className="text-left">{age}</div>
    </div>
  );
};

export default PersonBar;

