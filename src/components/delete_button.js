import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function DeleteButton ({ onClick }) {
  return (
    <div className="absolute bottom-2 right-2">
      <FontAwesomeIcon
        icon={faTrashCan}s
        className="cursor-pointer text-white"
        onClick={onClick}
      />
    </div>
  );
}

export default DeleteButton;
