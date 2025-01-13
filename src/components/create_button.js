import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function CreateButton({ onClick }) {
  return (
    <div className="absolute top-4 right-4">
      <FontAwesomeIcon
        icon={faPlus}
        className="cursor-pointer text-white"
        onClick={onClick}
      />
    </div>
  );
}

export default CreateButton;
