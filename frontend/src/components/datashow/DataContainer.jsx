import React from "react";
import PersonBar from "./PersonBar";
import EventBar from "./EventBar";
import RelationshipBar from "./RelationshipBar";
import FamilyBar from "./FamilyBar";

const DataContainer = ({ data, name }) => {
  if (name === "Person") {
    return (
      <div className="col-span-1 bg-[#f4d5b5] rounded-lg border-[#a78b71] border-1 shadow-lg overflow-y-scroll h-96 scrollbar-hide">
        <div className="flex items-center justify-between p-4 bg-[#f4d5b5]">
          <h1 className="text-xl font-semibold text-black">{name} Table</h1>
          <h1 className="text-xl font-semibold text-black">ADD</h1>
          </div>

        <PersonBar index={-1} />
        {data.map((person, index) => (
          <PersonBar key={index} data={person} index={index} />
        ))}
      </div>
    );
  }

  if (name === "Event") {
    return (
      <div className="col-span-1 bg-[#f4d5b5] rounded-lg border-[#a78b71] border-1 shadow-lg overflow-y-scroll h-96 scrollbar-hide">
        <div className="flex items-center justify-between p-4 bg-[#f4d5b5]">
          <h1 className="text-xl font-semibold text-black">{name} Table</h1>
        </div>

        <EventBar index={-1} />
        {data.map((event, index) => (
          <EventBar key={index} data={event} index={index} />
        ))}
      </div>
    );
  }

  if (name === "Relationship") {
    return (
      <div className="col-span-1 bg-[#f4d5b5] rounded-lg border-[#a78b71] border-1 shadow-lg overflow-y-scroll h-96 scrollbar-hide">
        <div className="flex items-center justify-between p-4 bg-[#f4d5b5]">
          <h1 className="text-xl font-semibold text-black">{name} Table</h1>
        </div>

        <RelationshipBar index={-1} />
        {data.map((relationship, index) => (
          <RelationshipBar key={index} data={relationship} index={index} />
        ))}
      </div>
    );
  }

  if (name === "Family") {
    return (
      <div className="col-span-1 bg-[#f4d5b5] rounded-lg border-[#a78b71] border-1 shadow-lg overflow-y-scroll h-96 scrollbar-hide">
        <div className="flex items-center justify-between p-4 bg-[#f4d5b5]">
          <h1 className="text-xl font-semibold text-black">{name} Table</h1>
        </div>
        <FamilyBar index={-1} />
        {data.map((family, index) => (
          <FamilyBar key={index} data={family} index={index} />
        ))}
      </div>
    );
  }

  return null;
};

export default DataContainer;
