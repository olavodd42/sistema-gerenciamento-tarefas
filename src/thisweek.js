// filepath: /c:/Users/olavo/OneDrive/Documentos/sist_gerenciamento_tarefas/src/today.js
import React from "react";
import Navbar from "./components/navbar";

function ThisWeek() {
  return (
    <div className="flex">
      <Navbar />
      <div className="ml-[4%] p-4 text-center bg-gray-600 box-border h-screen flex-grow flex flex-col items-center justify-start">
        <div className="bg-gray-400 p-6 rounded-md shadow-md w-full mb-4">
          semana
        </div>
        <div className="bg-gray-400 p-6 rounded-md shadow-md w-full mb-4">
          Conteúdo 2
        </div>
        <div className="bg-gray-400 p-6 rounded-md shadow-md w-full mb-4">
          Conteúdo 3
        </div>
      </div>
    </div>
  );
}

export default ThisWeek;