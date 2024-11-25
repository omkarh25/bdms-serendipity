'use client';

/**
 * Sidebar Component
 * Implements navigation between MVC components
 */

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiDatabase, FiGrid, FiSettings } from 'react-icons/fi';

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Model',
      path: '/model',
      icon: <FiDatabase className="w-5 h-5" />,
    },
    {
      name: 'View',
      path: '/view',
      icon: <FiGrid className="w-5 h-5" />,
    },
    {
      name: 'Controller',
      path: '/controller',
      icon: <FiSettings className="w-5 h-5" />,
    },
  ];

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <span className="text-2xl font-bold text-indigo-600">BDMS</span>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="p-4 space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    pathname === item.path
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            <p>Version 1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
