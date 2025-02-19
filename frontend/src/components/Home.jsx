import React, { useEffect, useState } from "react";
import { getFamily } from "../api/genealogy/family";
import { getRelationship } from "../api/genealogy/relationship";
import { getPerson } from "../api/genealogy/person";
import { getEvent } from "../api/genealogy/event";
import familyImage from "../assets/family.jpg";
import Dashboard from "./Dashboard";
import DataContainer from "./datashow/DataContainer";

const Home = () => {
  const [familyData, setFamilyData] = useState([]);
  const [relationshipData, setRelationshipData] = useState([]);
  const [personData, setPersonData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const family = await getFamily();
        const relationship = await getRelationship();
        const person = await getPerson();
        const event = await getEvent();

        setFamilyData(family);
        setRelationshipData(relationship);
        setPersonData(person);
        setEventData(event);
        setLoading(false);
        console.log("Family Data:", family);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center bg-pink-50 pt-40 w-screen min-h-screen p-10">
      <div className="grid grid-cols-5 gap-8 w-11/12">
        {/* Small Column (1 fraction) */}

        <div
          className="col-span-1 bg-cover bg-center bg-no-repeat p-6 rounded-2xl shadow-lg h-96 flex flex-col items-center pt-12 text-center "
          style={{ backgroundImage: `url(${familyImage})` }}
        >
          <div className="bg-white/70  p-4 rounded-lg space-y-10">
            <div className="flex flex-col items-start space-y-4 ">
              <h2 className="text-3xl text-black font-semibold">
                Ready to Join?
              </h2>
              <p className="text-sm text-yellow-900  p-6 rounded-2xl">
                Log in to access all features and start managing your family
                records effortlessly.
              </p>
            </div>
            <button className="ml-10 px-3 py-2 text-purple-700 font-semibold text-2xl rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out">
              Login Now
            </button>
          </div>
        </div>

        {/* Big Column (2 fractions) */}
        <Dashboard
          familyData={familyData}
          relationshipData={relationshipData}
          personData={personData}
          eventData={eventData}
        />

        {/* Big Column (2 fractions) */}
        <div className="col-span-2 bg-[#f5f5dc] p-6 rounded-2xl shadow-lg h-64">
          {" "}
          HERE LIES THE PATH TO THE VISUALIZER
        </div>

        {/* Big Column (2 fractions) */}
        <DataContainer data={personData} name="Person" />

        <DataContainer data={relationshipData} name="Relationship" />
        <DataContainer data={eventData} name="Event" />

        <DataContainer data={familyData} name="Family" />
      </div>
    </div>
  );
};

export default Home;
