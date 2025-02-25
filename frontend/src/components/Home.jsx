import React, { useEffect, useState } from "react";
import { getFamily } from "../api/genealogy/family";
import { getRelationship } from "../api/genealogy/relationship";
import { getPerson } from "../api/genealogy/person";
import { getEvent } from "../api/genealogy/event";
import Dashboard from "./Dashboard";
import DataContainer from "./datashow/DataContainer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [familyData, setFamilyData] = useState([]);
  const [relationshipData, setRelationshipData] = useState([]);
  const [personData, setPersonData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const family = await getFamily();
        const relationship = await getRelationship();
        const person = await getPerson();
        const event = await getEvent();
        
        setPersonData(person.data);
        
        setFamilyData(family.data);

        console.log(relationship);

        relationship.data.forEach((rel) => {

          // Set the person1_name and person2_name for each relationship
          const person1 = person.data.find((p) => p.id === rel.person1_id);
          const person2 = person.data.find((p) => p.id === rel.person2_id);
          person1 ? rel.person1_name = person1.name : rel.person1_name = "N/A";
          person2 ? rel.person2_name = person2.name : rel.person2_name = "N/A";
        });
        
        setRelationshipData(relationship.data);
        
        eventData.data.forEach((event) => {
          const person = personData.find((p) => p.id === event.associated_person_id);
          event.person_name = person.name;
          
          const family = familyData.find((f) => f.id === event.associated_family_id);
          family ? event.name = family.name : event.name = "N/A";

        }
        );
        setEventData(event.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="mt-24 flex flex-col items-center bg-[#F9F1E7] w-screen p-10">
      <div className="grid grid-cols-2 gap-8 w-11/12">
        {/* Left Column */}
        <div className="border-1 flex flex-col items-center border-[#E6B89C] bg-[#F3D5B5] p-6 px-6 rounded-lg shadow-lg">
          <div className="bg-[#E6B891] p-5 w-full rounded-lg space-y-10">
            <div className="flex flex-col items-start space-y-2">
              <div className="font-semibold text-[#4A4A4A] text-4xl">
                Explore and Manage Data Lineage
              </div>
              <p className="mt-5 text-xl text-[#7C5E4C] rounded-lg">
                Trace the journey of your data with our interactive genealogy visualizer, 
                exploring how data evolves, transforms, and connects across systems to ensure 
                accuracy and integrity. Gain deeper insights into data dependencies, uncover 
                potential bottlenecks, and make informed decisions based on a clear lineage structure. 
                Easily contribute new data to the system while maintaining structured lineage tracking, 
                keeping records organized, transparent, and up-to-date. Ensure seamless integration with 
                existing datasets and maintain a comprehensive history of changes for auditability and 
                better data governance.
              </p>
            </div>
          </div>

          {/* Buttons arranged vertically */}
          <div className="text-lg text-black flex flex-col items-center gap-4 mt-16 space-y-5">
            <button
              onClick={() => navigate("/visualizer/select")}
              className="px-3 py-3 text-white w-[20rem] rounded-2xl bg-[#A78B71] font-semibold text-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Visualize Now
            </button>
            <button
              onClick={() => navigate("/add")}
              className="px-3 py-3 text-white w-[20rem] rounded-2xl bg-[#A78B71] font-semibold text-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Add Data
            </button>
          </div>
        </div>

        {/* Dashboard Component */}
        <Dashboard
          familyData={familyData}
          relationshipData={relationshipData}
          personData={personData}
          eventData={eventData}
        />


        {/* Data Containers */}
          <div className="grid grid-cols-2 col-span-2 gap-8 mt-8">
          <DataContainer data={personData} name="Person" />
          <DataContainer data={relationshipData} name="Relationship" />
          <DataContainer data={eventData} name="Event" />
          <DataContainer data={familyData} name="Family" />
        </div>

        {/* Learn More Section */}
        <div className="col-span-2 border-1 flex flex-col items-center border-[#E6B89C] bg-[#F3D5B5] p-6 px-28 rounded-lg shadow-lg">
          <div className="text-lg text-black flex flex-col items-center space-y-4 w-9/12">
            <p className="text-xl text-[#4A4A4A]">
              Learn more about our project by visiting our About page.
            </p>
            <button
              onClick={() => navigate("/about")}
              className="px-3 py-3 text-white w-[20rem] rounded-2xl bg-[#A78B71] font-semibold text-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              About Us
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
