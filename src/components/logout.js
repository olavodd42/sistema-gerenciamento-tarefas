import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Logout = () => {
    const handleLogout = () => {
        // Redirecionar para o backend
        localStorage.removeItem('token');
        window.location.href = "/login"; // Substitua "URL_DO_BACKEND" pela URL real do backend
    };

    return (
        <div onClick={handleLogout} className="cursor-pointer">
            <FontAwesomeIcon icon={faArrowRightFromBracket} />Logout
        </div>
    )
}

export default Logout