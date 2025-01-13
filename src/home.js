// filepath: /c:/Users/olavo/OneDrive/Documentos/sist_gerenciamento_tarefas/src/home.js
import React, { useState } from "react";
import Navbar from "./components/navbar";
import CreateButton from "./components/create_button";
import EditButton from "./components/edit_button";
import DeleteButton from "./components/delete_button";

function Home() {
  const [isTabVisible, setIsTabVisible] = useState(false);

  const toggleTab = () => {
    setIsTabVisible(!isTabVisible);
  };

  return (
    <div className="flex">
      <Navbar />

      <div className="relative ml-[4%] p-4 text-center bg-gray-600 box-border h-screen flex-grow flex flex-col justify-start">
        <CreateButton onClick={toggleTab} />
        {isTabVisible && (
          <div className="absolute top-16 right-4 bg-gray-500 p-4 rounded-md shadow-md w-64">
            <h2 className="text-lg font-bold mb-2">Nova Aba</h2>
            <p>Conteúdo da nova aba.</p>
          </div>
        )}
        <div className="bg-gray-400 p-6 rounded-md shadow-md w-[97%] mb-4 relative">
          Conteúdo 1
          <EditButton />

        </div>
        <div className="bg-gray-400 p-6 rounded-md shadow-md w-[97%] mb-4 relative">
          Conteúdo 2
          <EditButton />
        </div>
        <div className="bg-gray-400 p-6 rounded-md shadow-md w-[97%] mb-4 relative">
          Conteúdo 3
        </div>
      </div>
    </div>
  );
}

export default Home;