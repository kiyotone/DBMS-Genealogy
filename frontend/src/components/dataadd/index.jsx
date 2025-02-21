import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { addPersonMember } from "../../api/genealogy/person";
import { addEvent } from "../../api/genealogy/event";
import { addRelationshipMember } from "../../api/genealogy/relationship";
import { addFamilyMember } from "../../api/genealogy/family";
import { useNavigate } from "react-router-dom";
import { getPerson } from "../../api/genealogy/person";
import { getFamily } from "../../api/genealogy/family"; // Import family API function

const DataAdder = () => {
  const [selectedType, setSelectedType] = useState(null);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [allPersons, setAllPersons] = useState([]);
  const [allFamilies, setAllFamilies] = useState([]); // State for families
  const [relationshipOptions, setRelationshipOptions] = useState([
    "Father",
    "Mother",
    "Spouse",
  ]);
  const [statusOptions, setStatusOptions] = useState(["Alive", "Not Alive"]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching persons data
    const fetchPersonsData = async () => {
      try {
        const persons = await getPerson();
        setAllPersons(persons.data); // Updating state with fetched person data
      } catch (error) {
        console.error("Error fetching person data:", error);
      }
    };
    fetchPersonsData();

    // Fetching families data
    const fetchFamilyData = async () => {
      try {
        const families = await getFamily(); // Fetch family data
        setAllFamilies(families.data); // Update state with fetched family data
        console.log("Families Data:", families);
      } catch (error) {
        console.error("Error fetching family data:", error);
      }
    };
    fetchFamilyData();
  }, []);

  const handleTypeSelection = (type) => {
    setSelectedType(type);
    reset(); // Reset form when a new type is selected
  };

  const handleRelationshipTypeChange = (e) => {
    const selectedRelationship = e.target.value;
    // Avoid adding dual relationships like "son" or "daughter" if "father" or "Mother" is selected
    if (
      selectedRelationship === "Father" ||
      selectedRelationship === "Mother"
    ) {
      setRelationshipOptions(["Father", "Mother", "Spouse"]);
    } else if (selectedRelationship === "Spouse") {
      setRelationshipOptions(["Father", "Mother", "Spouse"]);
    }
  };

  const onSubmit = async (formData) => {
    console.log("Form data:", formData);

    try {
      let response;

      if (selectedType === "person") {
        response = await addPersonMember(formData);
      }
      if (selectedType === "event") {
        response = await addEvent(formData);
      }
      if (selectedType === "relationship") {
        response = await addRelationshipMember(formData);
      }
      if (selectedType === "family") {
        response = await addFamilyMember(formData);
      }

      if (response?.status === 200) {
        console.log("Data submitted successfully:", response);
        navigate("/home"); // Navigate to home page after successful submission
      } else {
        console.error("Failed to submit data:", response);
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  const renderForm = () => {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 flex flex-col gap-2 w-full max-w-md text-black text-lg"
      >
        {selectedType === "person" && (
          <>
            <div className="flex flex-col">
              <label className="font-medium">First Name</label>
              <input
                {...register("firstname")}
                placeholder="First Name"
                className="p-1 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Last Name</label>
              <input
                {...register("lastname")}
                placeholder="Last Name"
                className="p-1 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Gender</label>
              <input
                {...register("gender")}
                placeholder="Gender"
                className="p-1 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Date of Birth</label>
              <input
                {...register("dateofbirth")}
                type="date"
                className="p-1 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Date of Death</label>
              <input
                {...register("dateofdeath")}
                type="date"
                className="p-1 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Occupation</label>
              <input
                {...register("occupation")}
                placeholder="Occupation"
                className="p-1 border rounded"
              />
            </div>
          </>
        )}
        {selectedType === "event" && (
          <>
            <div className="flex flex-col">
              <label className="font-medium">Event Type</label>
              <select {...register("eventtype")} className="p-1 border rounded">
                <option value="">Select Event Type</option>
                <option value="Birth">Birth</option>
                <option value="Death">Death</option>
                <option value="Marriage">Marriage</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-medium">Date</label>
              <input
                {...register("date")}
                type="date"
                className="p-1 border rounded"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium">Location</label>
              <input
                {...register("location")}
                placeholder="Location"
                className="p-1 border rounded"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium">Description</label>
              <input
                {...register("description")}
                placeholder="Description"
                className="p-1 border rounded"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium">Associated Person</label>
              <select
                {...register("associatedPersonId")}
                className="p-1 border rounded"
              >
                <option value="">Select Person</option>
                {allPersons.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.firstname} {person.lastname}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-medium">Associated Family</label>
              <select
                {...register("associatedFamilyId")}
                className="p-1 border rounded"
              >
                <option value="">Select Family</option>
                {allFamilies.map((family) => (
                  <option key={family.id} value={family.id}>
                    {family.name}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {selectedType === "relationship" && (
          <>
            <div className="flex flex-col">
              <label className="font-medium">Person 1 ID</label>
              <select {...register("person1id")} className="p-1 border rounded">
                <option value="">Select Person 1</option>
                {allPersons.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.firstname} {person.lastname}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Person 2 ID</label>
              <select {...register("person2id")} className="p-1 border rounded">
                <option value="">Select Person 2</option>
                {allPersons.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.firstname} {person.lastname}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Relationship Type</label>
              <select
                {...register("relationshiptype")}
                className="p-1 border rounded"
                onChange={handleRelationshipTypeChange}
              >
                <option value="">Select Relationship</option>
                {relationshipOptions.map((option) => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Status</label>
              <select {...register("status")} className="p-1 border rounded">
                <option value="">Select Status</option>
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        {selectedType === "family" && (
          <>
            <div className="flex flex-col">
              <label className="font-medium">Family Name</label>
              <input
                {...register("familyname")}
                placeholder="Family Name"
                className="p-1 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Description</label>
              <input
                {...register("description")}
                placeholder="Description"
                className="p-1 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Origin Country</label>
              <input
                {...register("origincountry")}
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
          {["person", "event", "relationship", "family"].map((type) => (
            <button
              key={type}
              onClick={() => handleTypeSelection(type)}
              className="p-2 bg-blue-500 text-white rounded"
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
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
