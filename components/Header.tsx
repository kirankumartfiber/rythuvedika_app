
import React from 'react';
import { UserIcon, ShieldCheckIcon } from './icons';

interface HeaderProps {
  currentView: 'user' | 'admin';
  setView: (view: 'user' | 'admin') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const activeClasses = 'bg-green-600 text-white';
  const inactiveClasses = 'bg-white text-green-700 hover:bg-green-100';

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img src="https://picsum.photos/40/40?random=1" alt="Logo" className="h-10 w-10 rounded-full object-cover"/>
            <h1 className="ml-3 text-2xl font-bold text-green-800">Rythuvedika Complaints</h1>
          </div>
          <div className="flex items-center space-x-2 rounded-lg bg-gray-200 p-1">
            <button
              onClick={() => setView('user')}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${currentView === 'user' ? activeClasses : inactiveClasses}`}
            >
              <UserIcon className="w-5 h-5 mr-2" />
              User View
            </button>
            <button
              onClick={() => setView('admin')}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${currentView === 'admin' ? activeClasses : inactiveClasses}`}
            >
              <ShieldCheckIcon className="w-5 h-5 mr-2" />
              Admin View
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
