import React, { useEffect, useState } from "react";
import { getFamily } from "../api/genealogy/family";
import { getRelationship } from "../api/genealogy/relationship";
import { getPerson } from "../api/genealogy/person";
import { getEvent } from "../api/genealogy/event";
import familyImage from "../assets/family.jpg";
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

        setRelationshipData(relationship.data);
        
        setEventData(event.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="mt-24 flex flex-col items-center bg-[#FDF7F2] w-screen p-10">
      <div className="grid grid-cols-2 gap-8 w-11/12">
        {/* Left Column with Image and Call to Action */}
        <div
          className="col-span-1 bg-cover bg-center bg-no-repeat p-6 rounded-lg shadow-lg flex flex-col items-center pt-12 text-center"
          style={{ backgroundImage: `url(${familyImage})` }}
        >
          <div className="bg-white/70 mt-72 p-5 w-[22rem] rounded-lg space-y-10">
            <div className="flex flex-col items-start space-y-4">
              <h2 className="text-3xl text-[#4A4A4A] font-semibold">
                Ready to Join?
              </h2>
              <p className="text-sm text-[#7C5E4C] p-6 rounded-lg">
                Log in to access all features and start managing your family
                records effortlessly.
              </p>
            </div>
            <button
              onClick={() => navigate("/login")}
              className="ml-10 px-3 py-2 text-[#A78B71] font-semibold text-2xl rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Login Now
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

        {/* Visualize Your Data Section */}
        <div className="col-span-2 border-1 flex flex-col items-center border-[#E6B89C] bg-[#F3D5B5] p-6 px-28 rounded-lg shadow-lg">
          <div className="font-semibold text-[#4A4A4A] text-4xl">
            VISUALIZE YOUR DATA
          </div>
          <div className="text-lg text-[#4A4A4A] my-24 grid grid-cols-2 gap-4">
            <div className="col-span-1 bg-[#E6B89C] p-10 rounded-xl shadow-lg">
              <h3 className="text-2xl pb-6 font-semibold mb-2 text-[#4A4A4A]">
                Explore Data Lineage
              </h3>
              Trace the journey of your data with our interactive genealogy
              visualizer. See how data evolves, transforms, and connects across
              systems to ensure accuracy and integrity. Gain deeper insights
              into data dependencies, uncover potential bottlenecks, and make
              informed decisions based on a clear lineage structure.
            </div>
            <div className="col-span-1 bg-[#E6B89C] p-10 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-2 text-[#4A4A4A]">
                Add & Manage Data
              </h3>
              Easily contribute new data to the system while maintaining
              structured lineage tracking. Keep records organized, transparent,
              and up-to-date. Ensure seamless integration with existing data
              sets and maintain a comprehensive history of changes for
              auditability and better data governance.
            </div>
          </div>

          <div className="text-lg text-black flex justify-between w-9/12 gap-4 ">
            <button
              onClick={() => navigate("/visualizer/select")}
              className=" px-3 py-3 text-gray-800 w-[20rem] rounded-2xl bg-[#a78b71]  font-semibold text-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Visualize Now
            </button>
            <button
              onClick={() => navigate("/add")}
              className=" px-3 py-3 text-gray-800 w-[20rem] rounded-2xl bg-[#a78b71]  font-semibold text-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Add Data
            </button>
          </div>
        </div>

        {/* Data Containers */}
        <div className="grid grid-cols-2 col-span-2 gap-8">
          <DataContainer data={personData} name="Person" />
          <DataContainer data={relationshipData} name="Relationship" />
          <DataContainer data={eventData} name="Event" />
          <DataContainer data={familyData} name="Family" />
        </div>
      </div>
    </div>
  );
};

export default Home;
