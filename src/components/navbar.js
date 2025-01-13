import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCalendarDay, faCalendarWeek, faCalendarDays, faHouse } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const items = [
  { name: "Home", url: "/home", icon: faHouse },
  { name: "Hoje", url: "/today", icon: faCalendarDay },
  { name: "Esta semana", url: "/thisweek", icon: faCalendarWeek },
  { name: "Este mês", url: "/thismonth", icon: faCalendarDays },
];

function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const toggleNavbar = () => setIsVisible(!isVisible);

  return (
    <nav className={`h-screen ${isVisible ? "w-[4%]" : "w-[4%]"} bg-gray-800 text-white fixed transition-all duration-300`}>
      <div className="flex flex-col items-center relative">
        {/* Botão de menu */}
        <div className="absolute top-4 left-4 z-50">
          <FontAwesomeIcon
            icon={faBars}
            className="cursor-pointer text-white"
            onClick={toggleNavbar}
            style={{
              fontSize: "1.5rem",
            }}
          />
        </div>

        {/* Lista de navegação */}
        <ul className={`w-full mt-16 flex flex-col items-center ${isVisible ? "block" : "hidden"}`}>
          {items.map((item, index) => (
            <li key={index} className="w-full mb-4">
              <Link
                className="flex flex-col items-center p-2 hover:bg-gray-700 rounded"
                to={item.url}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className="mb-2"
                  style={{
                    fontSize: "1.2rem", // Tamanho uniforme
                  }}
                />
                <span className="text-xs text-center">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
