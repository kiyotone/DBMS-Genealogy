import React from "react";
import Logo from "./navbar/Logo";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-[#FDF7F2] px-4 py-10">

      {/* Title */}
      <h1 className="text-3xl font-bold text-[#4A4A4A] mb-6">
        About Our Project
      </h1>

      {/* Project Description */}
      <div className="pt-10 w-full max-w-3xl text-center text-[#4A4A4A] text-lg">
        <p className="mb-6">
          This project is developed as part of our DBMS class at Thapathali Campus.
          We, Kirtan Kunwar, Lijan Shrestha, and Tayama Kirati, have created a Genealogy Management System
          to help visualize genealogies and manage family-related data efficiently.
        </p>

        <p className="mb-6">
          Our solution utilizes <span className="font-bold">FastAPI</span> for the backend,
          <span className="font-bold"> psycopg2</span> to interact with the PostgreSQL database,
          and <span className="font-bold">React</span> for the frontend to provide a smooth and interactive
          user experience.
        </p>

        <p className="mb-6">
          One of the core features of this project is the integration with <span className="font-bold">Unity</span> to visualize the family tree. 
          This allows users to visually explore relationships and see their family lineage in an engaging format.
        </p>
        
        <p>
        We believe this project will not only demonstrate the power of DBMS technologies, but also provide a meaningful and interactive way to explore one’s heritage.
        </p>
      </div>
    </div>
  );
};

export default About;
