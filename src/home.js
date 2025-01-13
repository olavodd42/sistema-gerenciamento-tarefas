// filepath: /c:/Users/olavo/OneDrive/Documentos/sist_gerenciamento_tarefas/src/home.js
import React from "react";
import Navbar from "./components/navbar";

function Home() {
  return (
    <div className="flex">
      <Navbar />
      <div className="ml-64 p-4 text-center w-full">
        Bem-vindo à página inicial!
      </div>
    </div>
  );
}

export default Home;