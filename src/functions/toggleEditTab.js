const toggleEditTab = (index, id, {setEditTabsVisibility, setEditingTaskId}) => {
    setEditTabsVisibility((prevVisibility) => {
      const newVisibility = [...prevVisibility];
      newVisibility[index] = !newVisibility[index];
      return newVisibility;
    });
    setEditingTaskId(id);
  };

export default toggleEditTab;