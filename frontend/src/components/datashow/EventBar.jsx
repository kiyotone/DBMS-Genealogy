import React from "react";

const EventBar = ({ data, index }) => {
  if (index === -1) {
    return (
      <div className="grid grid-cols-3 text-black p-4 bg-gray-400 font-bold border-b border-gray-600">
        <div className="text-left">Event Tyoe</div>
        <div className="text-left">Associated Person</div>
        <div className="text-left">Associated Family</div>
      </div>
    );
  }

  if (!data) return null;
  const odd = index % 2 === 0;

  return (
    <div
      className={`grid grid-cols-3 text-black p-4 border-b border-gray-300 ${
        odd ? "bg-yellow-200" : "bg-yellow-300"
      }`}
    >
      <div className="text-left">{data.type}</div>
      <div className="text-left">{data.associated_person_id}</div>
      <div className="text-left">{data.associated_family_id}</div>
    </div>
  );
};

export default EventBar;
