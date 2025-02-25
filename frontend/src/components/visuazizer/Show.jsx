import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUnityContext } from "react-unity-webgl";






const Show = () => {
  const familyData = useSelector((state) => state.visualizer.familyData);
  const personData = useSelector((state) => state.visualizer.personData);

  console.log("Family Data:", personData);

  const { unityProvider, sendMessage, isLoaded } = useUnityContext({
    loaderUrl: "/visualizer/New folder.loader.js",
    dataUrl: "/visualizer/New folder.data.br",
    frameworkUrl: "/visualizer/New folder.framework.js.br",
    codeUrl: "/visualizer/New folder.wasm.br",
    companyName: "YourCompany",
    productName: "YourProduct",
    productVersion: "1.0.0",
  });

  const [isUnityReady, setIsUnityReady] = useState(false);
  const [canvasSettings, setCanvasSettings] = useState({
    zoomSpeed: 0.000001,
    minScale: 0.001,
    maxScale: 2,
    dragSpeed: 1,
  });

  useEffect(() => {
    if (isLoaded) {
      setIsUnityReady(true);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isUnityReady && personData && familyData) {
      const configData = JSON.stringify(canvasSettings);
      sendMessage("Canvas", "ReceiveCanvasSettings", configData);

      console.log("Person Data:", personData);
      console.log("Family Data:", familyData);

      const peopleData = JSON.stringify(personData);
      const familyJsonData = JSON.stringify(familyData);

      console.log("People Data:", peopleData);
      console.log("Family JSON Data:", familyJsonData);

      sendMessage("DataLoader", "ReceivePeopleData", peopleData);
      sendMessage("DataLoader", "ReceiveFamilyData", familyJsonData);
    }
  }, [isUnityReady, personData, familyData, canvasSettings]);

  const UnityComponent = React.lazy(() => import("react-unity-webgl").then((module) => ({ default: module.Unity })));

  return (
    <div className="w-screen h-screen flex pt-[8rem] px-[1rem] justify-between bg-black">
      {/* Unity WebGL Viewer */}
      <div className="flex w-full h-full">
        <div className="w-full h-32 left-[0%] absolute bg-transparent z-10 text-black items-center flex flex-col">
            <div className="flex justify-between  items-center px-4 text-white font-semibold text-5xl"> Hierarchy Visualizer </div>
            <div className="flex justify-between w-full mr-20 flex-col px-4 text-white items-end text-sm  space-y-5"> 
              <div> Drag Move</div>
              <div> Scroll To Zoom</div>
              <div> Click on Names For More Information</div>
            </div>
            
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <UnityComponent
            unityProvider={unityProvider}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Show;
