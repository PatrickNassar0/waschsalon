import React from 'react';

type ButtonProps = {
  isActive: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ isActive, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-2xl text-white font-semibold shadow-xl transition-colors duration-300 cursor-pointer 
        ${isActive ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}
        focus:outline-none focus:ring-2 focus:ring-offset-2 ${isActive ? 'focus:ring-green-400' : 'focus:ring-red-400'}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
