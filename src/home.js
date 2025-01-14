import React, { useState } from "react";
import Navbar from "./components/navbar";
import CreateButton from "./components/create_button";
import EditButton from "./components/edit_button";
import DeleteButton from "./components/delete_button";
import CreateTab from "./components/create_tab";
import EditTab from "./components/edit_tab";

function Home() {
  const [isTabVisible, setIsTabVisible] = useState(false);
  const [editTabsVisibility, setEditTabsVisibility] = useState([false, false, false]);

  const toggleTab = () => {
    setIsTabVisible(!isTabVisible);
  };

  const toggleEditTab = (index) => {
    setEditTabsVisibility((prevVisibility) => {
      const newVisibility = [...prevVisibility];
      newVisibility[index] = !newVisibility[index];
      return newVisibility;
    });
  };

  return (
    <div className="flex">
      <Navbar />

      <div className="relative ml-[4%] p-4 text-center bg-gray-600 box-border h-screen flex-grow flex flex-col justify-start">
        <CreateButton onClick={toggleTab} />
        {isTabVisible && <CreateTab />}
        <div className={`bg-gray-400 p-6 rounded-md shadow-md w-[97%] mb-4 relative ${isTabVisible ? "mt-80" : ""}`}>
          Conteúdo 1
          <EditButton onClick={() => toggleEditTab(0)} />
          <DeleteButton />
          {editTabsVisibility[0] && <EditTab />}
        </div>
        <div className="bg-gray-400 p-6 rounded-md shadow-md w-[97%] mb-4 relative">
          Conteúdo 2
          <EditButton onClick={() => toggleEditTab(1)} />
          <DeleteButton />
          {editTabsVisibility[1] && <EditTab />}
        </div>
        <div className="bg-gray-400 p-6 rounded-md shadow-md w-[97%] mb-4 relative">
          Conteúdo 3
          <EditButton onClick={() => toggleEditTab(2)} />
          <DeleteButton />
          {editTabsVisibility[2] && <EditTab />}
        </div>
      </div>
    </div>
  );
}

export default Home;
