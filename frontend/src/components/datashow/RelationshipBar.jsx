import React from "react";

const RelationshipBar = ({ data, index }) => {
  console.log(data);
  if (index === -1) {
    return (
      <div className="grid grid-cols-3 text-black p-4 bg-gray-400 font-bold border-b border-gray-600">
        <div className="text-left">Person 1</div>
        <div className="text-left">Person 2</div>
        <div className="text-left">Relationship Type</div>
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
      className={`grid grid-cols-3 text-black p-4 border-b border-gray-300 ${
        odd ? "bg-[#f4d5b5]" : "bg-[#e6b89c]"      }`}
    >
      <div className="text-left">{data.person1_id}</div>
      <div className="text-left">{data.person2_id}</div>
      <div className="text-left">{data.relationship_type}</div>
    </div>
  );
};

export default RelationshipBar;
