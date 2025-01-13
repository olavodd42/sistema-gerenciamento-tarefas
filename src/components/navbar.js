import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCalendarDay, faCalendarWeek, faCalendarDays, faHouse } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const items = [
  { name: "Home", url: "/home", icon: faHouse },
  { name: "Hoje", url: "/today", icon: faCalendarDay },
  { name: "Esta semana", url: "/thisweek", icon: faCalendarWeek },
  { name: "Este mês", url: "/thismonth", icon: faCalendarDays },
];

function Navbar() {
  return (
    <nav className="h-screen w-[4%] bg-gray-800 text-white fixed">
      <div className="flex flex-col items-center p-4">
        <FontAwesomeIcon icon={faBars} className="mb-4" />
        <ul className="w-full">
          {items.map((item, index) => (
            <li key={index} className="w-full mb-4">
              <Link className="flex flex-col items-center p-2 hover:bg-gray-700 rounded" to={item.url}>
                <FontAwesomeIcon icon={item.icon} className="mb-2" />
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
