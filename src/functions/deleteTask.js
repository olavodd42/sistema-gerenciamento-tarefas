import axios from "axios";

const deleteTask = async ({deleteData, setTarefas, tarefas, setOpen}) => {
    try {
      await axios.delete(`http://localhost:4000/api/tarefas/${deleteData.id}`);
      setTarefas(tarefas.filter(tarefa => tarefa.id !== deleteData.id));
      setOpen(false);
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

export default deleteTask;