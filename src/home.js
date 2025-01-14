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

  const confirmDelete = () => {
      //confirm("Tem certeza que deseja deletar?");
  };

  return (
    <div className="flex">
      <Navbar />

      <div className="relative ml-[4%] overflow-y-auto p-4 h-screen text-center bg-gray-600 box-border h-screen flex-grow flex flex-col">
        <CreateButton onClick={toggleTab} />
        {isTabVisible && <CreateTab />}

        {/* Conteúdo 1 */}
        
          <div className={`relative bg-gray-400 p-6 rounded-md shadow-md w-[97%] mb-4 ${editTabsVisibility[0] ? "mb-60" : ""}`}>
            Conteúdo 1
            <EditButton onClick={() => toggleEditTab(0)} />
            <DeleteButton onClick={confirmDelete}/>
            {editTabsVisibility[0] && <EditTab />}
            <form className="inline flex items-center justify-center space-x-2">
            <input
              type="checkbox"
              id="concluido2"
              name="concluido"
              value="concluido"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="concluido2"
              className="text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            >
              Concluido
            </label>
          </form>
          </div>

        {/* Conteúdo 2 */}
          <div className={`relative bg-gray-400 p-6 rounded-md shadow-md w-[97%] mb-4 ${editTabsVisibility[1] ? "mb-60" : ""}`} >
            Conteúdo 2
            <EditButton onClick={() => toggleEditTab(1)} />
            <DeleteButton />
            {editTabsVisibility[1] && <EditTab />}
            <form className="inline flex items-center justify-center space-x-2">
            <input
              type="checkbox"
              id="concluido2"
              name="concluido"
              value="concluido"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="concluido2"
              className="text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            >
              Concluido
            </label>
          </form>
          </div>

          <div className={`relative bg-gray-400 p-6 rounded-md shadow-md w-[97%] mb-4 ${editTabsVisibility[2] ? "mb-60" : ""}`} >
            Conteúdo 3
            <EditButton onClick={() => toggleEditTab(2)} />
            <DeleteButton />
            {editTabsVisibility[2] && <EditTab />}
            <form className="inline flex items-center justify-center space-x-2">
            <input
              type="checkbox"
              id="concluido2"
              name="concluido"
              value="concluido"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="concluido2"
              className="text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            >
              Concluido
            </label>
          </form>
          </div>
      </div>
    </div>
  );
}

export default Home;
