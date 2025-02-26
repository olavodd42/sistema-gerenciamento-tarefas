import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

function EditButton({ onClick }) {
  return (
    <div className="inline-block ml-2 absolute top-2 right-2">
      <FontAwesomeIcon
        icon={faPen}
        className="cursor-pointer text-white"
        onClick={onClick}
      />
    </div>
  );
}

export default EditButton;
