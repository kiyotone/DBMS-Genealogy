import React, { useState, useEffect, useRef } from "react";
import {
  getDescendants,
  getHierarchyLevel,
  getPerson,
} from "../../api/genealogy/person";
import { setFamilyData, setPersonData } from "../../redux/visualizerSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const Selector = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allPersons, setAllPersons] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isPersonSelected, setIsPersonSelected] = useState(false);
  const [hierarchyUp, setHierarchyUp] = useState(null);
  const [hierarchyOptions, setHierarchyOptions] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [genData, setGenData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const lastFetchedPersonId = useRef(null); // Prevent unnecessary API calls

  useEffect(() => {
    const fetchData = async () => {
      try {
        const persons = await getPerson();
        console.log("Persons Data:", persons);
        setAllPersons(persons.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchHierarchy = async () => {
      if (!searchTerm.trim()) {
        setIsDisabled(true);
        setIsPersonSelected(false);
        return;
      }

      // Find the person that matches the search term
      const person = allPersons.find(
        (p) =>
          `${p.firstname} ${p.lastname}`.toLowerCase() ===
          searchTerm.toLowerCase()
      );

      if (!person) {
        setIsDisabled(true);
        setIsPersonSelected(false);
        return;
      }

      // Prevent unnecessary API calls if same person is already fetched
      if (lastFetchedPersonId.current === person.id) return;
      lastFetchedPersonId.current = person.id;
      setSelectedPerson(person.id);

      setIsDisabled(false);
      setIsPersonSelected(true);

      try {
        const response = await getHierarchyLevel(person.id);
        console.log("Hierarchy Data:", response);

        setGenData(response.data.hierarchy);
        setHierarchyOptions(
          Array.from({ length: response.data.levels }, (_, i) => i + 1)
        ); // Ensure proper level range
      } catch (error) {
        console.error("Error fetching hierarchy:", error);
      }
    };

    fetchHierarchy();
  }, [searchTerm, allPersons]); // Removed `filteredPersons` from dependencies

  const filteredPersons = allPersons
    .filter((person) => {
      const fullName = `${person.firstname} ${person.lastname}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      const searchLower = searchTerm.toLowerCase();
      const aFullName = `${a.firstname} ${a.lastname}`.toLowerCase();
      const bFullName = `${b.firstname} ${b.lastname}`.toLowerCase();
      const aStartsWith = aFullName.startsWith(searchLower);
      const bStartsWith = bFullName.startsWith(searchLower);
      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;
      return aFullName.localeCompare(bFullName);
    });

  const handleSelected = (name) => {
    setSearchTerm(name);
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

const transformedData = (originalData) => {
  return {
      people: originalData.map(person => ({
          id: person.id,
          name: `${person.firstname} ${person.lastname}`,
          age: calculateAge(person.dateofbirth),
          occupation: person.occupation,
          gender: person.gender
      }))
  };
};



  const handleVisualize = async () => {
    const id = genData[hierarchyUp].id;
    try {
      const response = await getDescendants(id);
      console.log("Hierarchy Data:", response);
      dispatch(setFamilyData(response.data));
      
    } catch (error) {
      console.error("Error fetching hierarchy:", error);
    }

    const response = await getPerson();
    console.log("Person Data:", transformedData(response.data));
    dispatch(setPersonData(transformedData(response.data)));
    navigate("/visualizer/show");

  };

  return (
    <div className="p-4 flex flex-col items-center w-screen">
      <div className="w-96 relative">
        <input
          type="text"
          placeholder="Search Person"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
        />
        {isFocused &&
          searchTerm.trim() !== "" &&
          filteredPersons.length > 0 && (
            <div className="absolute w-full left-0 mt-1 bg-gray-700 p-2 rounded shadow-lg max-h-48 overflow-y-auto">
              {filteredPersons.map((person) => (
                <div
                  key={person.id}
                  className="p-2 hover:bg-gray-600 rounded text-white cursor-pointer transition-colors duration-200"
                  onMouseDown={() =>
                    handleSelected(`${person.firstname} ${person.lastname}`)
                  }
                >
                  {person.firstname} {person.lastname}
                </div>
              ))}
            </div>
          )}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors duration-200 cursor-pointer disabled:bg-gray-500"
        disabled={isDisabled}
        onClick={() => setIsPersonSelected(true)}
      >
        Select Person
      </button>
      {isPersonSelected && (
        <div className="flex flex-col items-center">
          <div className="mt-4 bg-gray-700 p-2 rounded text-white text-center">
            Selected Person: {searchTerm}
          </div>
          <div className="mt-4 flex justify-center space-x-4">
            <div className="relative flex flex-col items-center">
              <label className="block text-sm mt-5 mb-2">Hierarchy Level</label>
              <select
                value={hierarchyUp}
                onChange={(e) => setHierarchyUp(Number(e.target.value))}
                className="w-16 p-1 bg-gray-600 border border-gray-500 rounded text-white text-center"
              >
                {hierarchyOptions.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleVisualize}
            className="mt-6 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
          >
            Visualize
          </button>
        </div>
      )}
    </div>
  );
};

export default Selector;
