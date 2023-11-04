import React, { useState, useRef } from 'react';

function ContextMenu({ items }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setPosition({ top: event.clientY, left: event.clientX });
    setIsVisible(true);
    document.addEventListener('click', handleClick);
  };

  const handleClick = () => {
    setIsVisible(false);
    document.removeEventListener('click', handleClick);
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      ref={menuRef}
      className='relative' // tailwind class for position: relative;
    >
      {isVisible && (
        <ul
          className='absolute bg-white border border-gray-300 shadow-md z-10 p-0 m-0 list-none'
          style={position}
        >
          {items.map((item, index) => (
            <li
              key={index}
              className='px-3 py-1 cursor-pointer hover:bg-gray-300'
              onClick={item.onClick}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ContextMenu;

