import React, { useState, useEffect } from "react";
import axios from 'axios';

const EditTab = ({ taskId }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [endTime, setEndTime] = useState('00:00');

  useEffect(() => {
    async function fetchTask() {
      try {
        const response = await axios.get(`http://localhost:4000/api/tarefas/${taskId}`);
        const task = response.data;
        setTaskName(task.nome_tarefa);
        setTaskDescription(task.descricao);
        setTaskDate(task.data_hora.split('T')[0]); // Assuming the date is in ISO format
        setTaskTime(task.data_hora.split('T')[1].substring(0, 5)); // Assuming the time is in ISO format
        setEndTime(task.hora_termino.substring(0, 5));
      } catch (error) {
        console.error('Erro ao buscar tarefa:', error);
      }
    }

    if (taskId) {
      fetchTask();
    }
  }, [taskId]);

  const onSubmit = async event => {
    event.preventDefault();

    await axios.put(`http://localhost:4000/api/tarefas/${taskId}`, {
      taskName,
      taskDescription,
      taskDate,
      taskTime,
      endTime,
    });
    

    // Handle the server's response and update the UI as needed
  };

  return (
    <form onSubmit={onSubmit} className="absolute top-[20%] right-[3%] z-50 bg-gray-500 p-4 rounded-md shadow-md w-[40%] grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <label htmlFor="taskName" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Nome da tarefa:
        </label>
        <input
          type="text"
          id="taskName"
          name="taskName"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 h-7 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="taskDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Descrição da tarefa:
        </label>
        <textarea
          id="taskDescription"
          name="textDescription"
          rows="4"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className="block p-2.5 w-full h-12 text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        ></textarea>
      </div>
      <div>
        <label htmlFor="taskDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Data da tarefa:
        </label>
        <div className="relative max-w-sm">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input
            datepicker
            id="taskDate"
            name="taskDate"
            type="text"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date"
          />
        </div>
      </div>
      <div>
        <label htmlFor="taskTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Hora da tarefa (24 horas):
        </label>
        <div className="relative">
          <input
            type="time"
            id="taskTime"
            name="taskTime"
            value={taskTime}
            onChange={(e) => setTaskTime(e.target.value)}
            className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            step="1" // Permite edição de segundos
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="endTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Hora de término previsto (24 horas):
        </label>
        <input
          type="time"
          id="endTime"
          name="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          step="1" // Permite edição de segundos
          required
        />
      </div>
      <div>
        <button
          type="submit"
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Editar
        </button>
      </div>
    </form>
  );
};

export default EditTab;
