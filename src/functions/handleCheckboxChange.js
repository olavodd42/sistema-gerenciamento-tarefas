import axios from "axios";
const handleCheckboxChange = async (index, {tarefas, setTarefas}) => {
    const updatedTarefas = [...tarefas];
    updatedTarefas[index].concluido = !updatedTarefas[index].concluido;
  
    try {
      await axios.patch(`http://localhost:4000/api/tarefas/${updatedTarefas[index].id}`, {
        concluido: updatedTarefas[index].concluido,
      });
      setTarefas(updatedTarefas); // Atualiza o estado local somente após sucesso na API
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

export default handleCheckboxChange;