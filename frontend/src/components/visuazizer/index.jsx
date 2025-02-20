import React, { useEffect, useState } from "react";
import { useUnityContext, Unity } from "react-unity-webgl";

const Visualizer = () => {
  const { unityProvider, sendMessage, isLoaded } = useUnityContext({
    loaderUrl: "/visualizer/New-folder.loader.js",
    dataUrl: "/visualizer/New-folder.data.br",
    frameworkUrl: "/visualizer/New-folder.framework.js.br",
    codeUrl: "/visualizer/New-folder.wasm.br",
    companyName: "YourCompany",
    productName: "YourProduct",
    productVersion: "1.0.0",
  });

  const [isUnityReady, setIsUnityReady] = useState(false);

  // Wait until Unity is fully loaded before sending data
  useEffect(() => {
    if (isLoaded) {
      setIsUnityReady(true);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isUnityReady) {
      // Assuming you fetch the data from an API or have the data available locally
      const peopleData = `
      {
        "people": [
          { "id": 1, "name": "John", "age": 45, "occupation": "Engineer" },
          { "id": 2, "name": "Alice", "age": 20, "occupation": "Student" },
          { "id": 3, "name": "Bob", "age": 18, "occupation": "Student" },
          { "id": 4, "name": "Mary", "age": 42, "occupation": "Doctor" },
          { "id": 5, "name": "Charlie", "age": 10, "occupation": "Student" },
          { "id": 6, "name": "Sophia", "age": 25, "occupation": "Artist" },
          { "id": 7, "name": "Daniel", "age": 5, "occupation": "Child" },
          { "id": 8, "name": "Emma", "age": 3, "occupation": "Child" },
          { "id": 9, "name": "Lucas", "age": 2, "occupation": "Toddler" },
          { "id": 10, "name": "Evelyn", "age": 70, "occupation": "Retired" },
          { "id": 11, "name": "Olivia", "age": 50, "occupation": "Lawyer" },
          { "id": 12, "name": "James", "age": 25, "occupation": "Engineer" },
          { "id": 13, "name": "Mia", "age": 22, "occupation": "Designer" },
          { "id": 14, "name": "Robert", "age": 55, "occupation": "Scientist" },
          { "id": 15, "name": "Linda", "age": 60, "occupation": "Professor" },
          { "id": 16, "name": "William", "age": 30, "occupation": "Software Engineer" },
          { "id": 17, "name": "Sophia", "age": 28, "occupation": "Architect" },
          { "id": 18, "name": "Michael", "age": 32, "occupation": "Businessman" },
          { "id": 19, "name": "Noah", "age": 8, "occupation": "Student" },
          { "id": 20, "name": "Liam", "age": 6, "occupation": "Child" },
          { "id": 21, "name": "Isabella", "age": 5, "occupation": "Child" }
        ]
      }
      `;
      const familyData = `
      {
        "generations": [
          {
            "generation": 1,
            "members": [
              { "id": 1, "spouseId": -1, "parentId": -1 },
              { "id": 4, "spouseId": -1, "parentId": -1 },
              { "id": 10, "spouseId": -1, "parentId": -1 },
              { "id": 14, "spouseId": -1, "parentId": -1 },
              { "id": 15, "spouseId": -1, "parentId": -1 }
            ]
          },
          {
            "generation": 2,
            "members": [
              { "id": 2, "spouseId": 3, "parentId": 1 },
              { "id": 6, "spouseId": -1, "parentId": 1 },
              { "id": 5, "spouseId": -1, "parentId": 4 },
              { "id": 11, "spouseId": -1, "parentId": 10 },
              { "id": 16, "spouseId": 17, "parentId": 14 },
              { "id": 18, "spouseId": -1, "parentId": 15 }
            ]
          },
          {
            "generation": 3,
            "members": [
              { "id": 7, "spouseId": 8, "parentId": 3 },
              { "id": 9, "spouseId": -1, "parentId": 6 },
              { "id": 12, "spouseId": 13, "parentId": 11 },
              { "id": 19, "spouseId": -1, "parentId": 16 },
              { "id": 20, "spouseId": 21, "parentId": 18 }
            ]
          }
        ]
      }
      `;

      // Send data to Unity
      sendMessage("DataLoader", "ReceivePeopleData", peopleData);
      sendMessage("DataLoader", "ReceiveFamilyData", familyData);
    }
  }, [isUnityReady, sendMessage]);

  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      <Unity
        unityProvider={unityProvider}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      />
    </div>
  );
};

export default Visualizer;
