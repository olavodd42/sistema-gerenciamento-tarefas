import React, { useEffect, useState } from 'react';
import Navbar from "../components/navbar";
import CreateButton from "../components/create_button";
import EditButton from "../components/edit_button";
import DeleteButton from "../components/delete_button";
import CreateTab from "../components/create_tab";
import EditTab from "../components/edit_tab";
import { format, set } from 'date-fns';
import axios from 'axios';
import ConfirmBox from '../components/confirmBox';
import toggleTab from '../functions/toggleTab';
import toggleEditTab from '../functions/toggleEditTab';
import deleteTask from '../functions/deleteTask';
import openDelete from '../functions/openDelete';
import handleCheckboxChange from '../functions/handleCheckboxChange';

const Home = () => {
  const [isTabVisible, setIsTabVisible] = useState(false);
  const [editTabsVisibility, setEditTabsVisibility] = useState([]);
  const [tarefas, setTarefas] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  useEffect(() => {
    async function fetchTarefas() {
      try {
        const response = await fetch(`http://localhost:4000/api/tarefas`);
        const data = await response.json();
        setTarefas(data);
        setEditTabsVisibility(new Array(data.length).fill(false));
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    }

    fetchTarefas();
  }, []);

  
  

  return (
    <div className="flex">
      <Navbar />

      <div className="relative ml-[4%] overflow-y-auto p-4 h-screen text-center bg-gray-600 box-border h-screen flex-grow flex flex-col">
        <CreateButton onClick={()=>toggleTab({setIsTabVisible,isTabVisible})} />
        {isTabVisible && <CreateTab />}

        {tarefas.map((tarefa, index) => (
          <div key={tarefa.id} className={`relative bg-gray-400 p-6 rounded-md shadow-md w-[97%] mb-4 ${editTabsVisibility[index] ? "mb-60" : ""}`}>
            <div>{tarefa.nome_tarefa}</div>
            <div>{tarefa.descricao}</div>
            <div>{format(new Date(tarefa.data_hora), 'dd/MM/yyyy HH:mm:ss')}</div>
            <div>{tarefa.hora_termino}</div>
            <EditButton onClick={() => toggleEditTab(index, tarefa.id, {setEditTabsVisibility, setEditingTaskId})} />
            <DeleteButton onClick={() => openDelete(tarefa, {setOpen, setDeleteData})} />
            {editTabsVisibility[index] && <EditTab taskId={tarefa.id} tarefas={tarefas} setTarefas={setTarefas} />}
            <form className="inline flex items-center justify-center space-x-2">
            <input
              type="checkbox"
              id={`concluido${index}`}
              name="concluido"
              checked={tarefa.concluido} // Ligação ao estado atual da tarefa
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={() => handleCheckboxChange(index, {tarefas, setTarefas})} // Atualiza o estado ao clicar
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
      <ConfirmBox
        open={open}
        closeDialog={() => setOpen(false)}
        title={deleteData?.nome_tarefa}
        deleteFunction={()=>deleteTask({deleteData, setTarefas, tarefas, setOpen})}
      />
    </div>
  );
}

export default Home;