import React, { useEffect, useState } from 'react';
import Navbar from "./components/navbar";
import CreateButton from "./components/create_button";
import EditButton from "./components/edit_button";
import DeleteButton from "./components/delete_button";
import CreateTab from "./components/create_tab";
import EditTab from "./components/edit_tab";
import { format } from 'date-fns';


function Home() {
  const [isTabVisible, setIsTabVisible] = useState(false);
  const [editTabsVisibility, setEditTabsVisibility] = useState([]);
  const [tarefas, setTarefas] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    async function fetchTarefas() {
      try {
        const response = await fetch('http://localhost:4000/api/tarefas');
        const data = await response.json();
        setTarefas(data);
        setEditTabsVisibility(new Array(data.length).fill(false));
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    }

    fetchTarefas();
  }, []);

  const toggleTab = () => {
    setIsTabVisible(!isTabVisible);
  };

  const toggleEditTab = (index, id) => {
    setEditTabsVisibility((prevVisibility) => {
      const newVisibility = [...prevVisibility];
      newVisibility[index] = !newVisibility[index];
      return newVisibility;
    });
    setEditingTaskId(id);
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

        {tarefas.map((tarefa, index) => (
          <div key={tarefa.id} className={`relative bg-gray-400 p-6 rounded-md shadow-md w-[97%] mb-4 ${editTabsVisibility[index] ? "mb-60" : ""}`}>
            <div>{tarefa.nome_tarefa}</div>
            <div>{tarefa.descricao}</div>
            <div>{format(new Date(tarefa.data_hora), 'dd/MM/yyyy HH:mm:ss')}</div>
            <div>{tarefa.hora_termino}</div>
            <EditButton onClick={() => toggleEditTab(index, tarefa.id)} />
            <DeleteButton onClick={confirmDelete} />
            {editTabsVisibility[index] && <EditTab taskId={tarefa.id} />}
            <form className="inline flex items-center justify-center space-x-2">
              <input
                type="checkbox"
                id={`concluido${index}`}
                name="concluido"
                value="concluido"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                readOnly
              />
              <label
                htmlFor={`concluido${index}`}
                className="text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              >
                Concluido
              </label>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
