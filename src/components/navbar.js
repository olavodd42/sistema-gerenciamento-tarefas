import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHouse, faThumbTack, faThumbTackSlash } from '@fortawesome/free-solid-svg-icons';

const items = [
  { name: "Home", url: "/home", icon: faHouse },
  { name: "Itens pendentes", url: "#", icon: faThumbTack },
  { name: "Itens concluidos", url: "#", icon: faThumbTackSlash },
];

function Navbar() {
  return (
    <nav className="h-screen w-[4%] bg-gray-800 text-white fixed">
      <div className="flex flex-col items-center p-4">
        <FontAwesomeIcon icon={faBars} className="mb-4" />
        <ul className="w-full">
          {items.map((item, index) => (
            <li key={index} className="w-full mb-4">
              <a className="flex flex-col items-center p-2 hover:bg-gray-700 rounded" href={item.url}>
                <FontAwesomeIcon icon={item.icon} className="mb-2" />
                <span className="text-xs text-center">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
