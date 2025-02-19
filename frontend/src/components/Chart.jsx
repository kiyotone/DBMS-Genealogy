// src/components/Chart.js
import React, { useState } from "react";

const Chart = ({ familyData, relationshipData, personData, eventData }) => {
  // Ensure the data arrays are valid
  const safeFamilyData = familyData || [];
  const safeRelationshipData = relationshipData || [];
  const safePersonData = personData || [];
  const safeEventData = eventData || [];

  // Normalize the data to set the height
  const maxDataValue = Math.max(
    safeFamilyData.length,
    safeRelationshipData.length,
    safePersonData.length,
    safeEventData.length
  );

  const normalizeHeight = (value) => {
    return (value / maxDataValue) * 100; // Normalize the value to a percentage
  };

  // State to hold which bar is being hovered
  const [hoveredBar, setHoveredBar] = useState(null);

  // Function to handle mouse enter and set the hovered bar
  const handleMouseEnter = (bar) => {
    setHoveredBar(bar);
  };

  // Function to handle mouse leave and reset the hovered bar
  const handleMouseLeave = () => {
    setHoveredBar(null);
  };

  return (
    <div className="flex justify-around h-60 w-[20rem] items-end ">
      {/* Family Bar */}
      <div
        className="h-full w-1/8 flex flex-col items-center justify-end relative"
        onMouseEnter={() => handleMouseEnter("family")}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="w-4/5 bg-blue-500 rounded-3xl flex items-center justify-center"
          style={{
            height: `${normalizeHeight(safeFamilyData.length)}%`,
          }}
        >
          {hoveredBar === "family" && (
            <div className="text-white text-sm font-bold">{safeFamilyData.length}</div>
          )}
        </div>
        <div className="text-black text-sm mt-1">Fam</div>
      </div>

      {/* Relationship Bar */}
      <div
        className="h-full w-1/8 flex flex-col items-center justify-end relative"
        onMouseEnter={() => handleMouseEnter("relationship")}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="w-4/5 bg-blue-500 rounded-3xl flex items-center justify-center"
          style={{
            height: `${normalizeHeight(safeRelationshipData.length)}%`,
          }}
        >
          {hoveredBar === "relationship" && (
            <div className="text-white text-sm font-bold">{safeRelationshipData.length}</div>
          )}
        </div>
        <div className="text-black text-sm mt-1">Rel</div>
      </div>

      {/* Person Bar */}
      <div
        className="h-full w-1/8 flex flex-col items-center justify-end relative"
        onMouseEnter={() => handleMouseEnter("person")}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="w-4/5 bg-blue-500 rounded-3xl flex items-center justify-center"
          style={{
            height: `${normalizeHeight(safePersonData.length)}%`,
          }}
        >
          {hoveredBar === "person" && (
            <div className="text-white text-sm font-bold">{safePersonData.length}</div>
          )}
        </div>
        <div className="text-black text-sm mt-1">Per</div>
      </div>

      {/* Event Bar */}
      <div
        className="h-full w-1/8 flex flex-col items-center justify-end relative"
        onMouseEnter={() => handleMouseEnter("event")}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="w-4/5 bg-blue-500 rounded-3xl flex items-center justify-center"
          style={{
            height: `${normalizeHeight(safeEventData.length)}%`,
          }}
        >
          {hoveredBar === "event" && (
            <div className="text-white text-sm font-bold">{safeEventData.length}</div>
          )}
        </div>
        <div className="text-black text-sm mt-1">Evt</div>
      </div>
    </div>
  );
};

export default Chart;
