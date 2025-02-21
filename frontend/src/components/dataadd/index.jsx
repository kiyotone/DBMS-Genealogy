import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { addEvent } from "../../api/genealogy/event";
import { addPersonMember } from "../../api/genealogy/person";
import { addRelationshipMember } from "../../api/genealogy/relationship";
import { addFamilyMember } from "../../api/genealogy/family";

const DataAdder = () => {
  const [selectedType, setSelectedType] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState([]);

  const handleTypeSelection = (type) => {
    setSelectedType(type);
    reset();
  };

  const onSubmit = (formData) => {
    setData([formData]);


    if (selectedType === "Person") {
        addPersonMember(formData);
    }
    if (selectedType === "Event") {
        addEvent(formData);
    }
    if (selectedType === "Relationship") {
        addRelationshipMember(formData);
    }
    if (selectedType === "Family") {
        addFamilyMember(formData);
    }
    

  };

  const renderForm = () => {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 flex flex-col gap-2 w-full max-w-md text-black text-lg"
      >
        {selectedType === "Person" && (
          <>
            <div className="flex flex-col">
              <label className="font-medium">First Name</label>
              <input
                {...register("FirstName")}
                placeholder="First Name"
                className="p-1 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Last Name</label>
              <input
                {...register("LastName")}
                placeholder="Last Name"
                className="p-1 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Gender</label>
              <input
                {...register("Gender")}
                placeholder="Gender"
                className="p-1 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Date of Birth</label>
              <input
                {...register("DateOfBirth")}
                type="date"
                className="p-1 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Date of Death</label>
              <input
                {...register("DateOfDeath")}
                type="date"
                className="p-1 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Occupation</label>
              <input
                {...register("Occupation")}
                placeholder="Occupation"
                className="p-1 border rounded"
              />
            </div>
          </>
        )}
        {selectedType === "Event" && (
          <>
            <div className="flex flex-col">
              <label className="font-medium">Event Type</label>
              <input
                {...register("EventType")}
                placeholder="Event Type"
                className="p-1 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Date</label>
              <input
                {...register("Date")}
                type="date"
                className="p-1 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Location</label>
              <input
                {...register("Location")}
                placeholder="Location"
                className="p-1 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Description</label>
              <input
                {...register("Description")}
                placeholder="Description"
                className="p-1 border rounded"
              />
            </div>
          </>
        )}
        {selectedType === "Relationship" && (
          <>
            <div className="flex flex-col">
              <label className="font-medium">Person 1 ID</label>
              <input
                {...register("Person1ID")}
                placeholder="Person 1 ID"
                className="p-1 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Person 2 ID</label>
              <input
                {...register("Person2ID")}
                placeholder="Person 2 ID"
                className="p-1 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Relationship Type</label>
              <input
                {...register("RelationshipType")}
                placeholder="Relationship Type"
                className="p-1 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Status</label>
              <input
                {...register("Status")}
                placeholder="Status"
                className="p-1 border rounded"
              />
            </div>
          </>
        )}
        {selectedType === "Family" && (
          <>
            <div className="flex flex-col">
              <label className="font-medium">Family Name</label>
              <input
                {...register("FamilyName")}
                placeholder="Family Name"
                className="p-1 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Description</label>
              <input
                {...register("Description")}
                placeholder="Description"
                className="p-1 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Origin Country</label>
              <input
                {...register("OriginCountry")}
                placeholder="Origin Country"
                className="p-1 border rounded"
              />
            </div>
          </>
        )}
        <button type="submit" className="p-2 bg-green-500 text-white rounded">
          Add
        </button>
      </form>
    );
  };

  return (
    <div className="w-screen text-black text-lg h-screen flex flex-col items-center justify-center bg-[#f4d5b5] rounded-lg border-[#a78b71] border shadow-lg overflow-y-scroll scrollbar-hide">
      <div className="p-4">
        <h1 className="text-xl font-semibold text-black">Data Adder</h1>
      </div>
      {!selectedType ? (
        <div className="flex flex-col gap-2 p-4">
          {["Person", "Event", "Relationship", "Family"].map((type) => (
            <button
              key={type}
              onClick={() => handleTypeSelection(type)}
              className="p-2 bg-blue-500 text-white rounded"
            >
              {type}
            </button>
          ))}
        </div>
      ) : (
        <>{renderForm()}</>
      )}
    </div>
  );
};

export default DataAdder;
