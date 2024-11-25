'use client';

import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

const ControllerPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columnName, setColumnName] = useState('');
  const [columnType, setColumnType] = useState('text');
  const [error, setError] = useState<string | null>(null);

  const handleAddColumn = async () => {
    if (!columnName.trim()) {
      setError('Column name is required');
      return;
    }

    try {
      const response = await fetch('/api/schema/columns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: columnName,
          type: columnType,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add column');
      }

      setIsModalOpen(false);
      setColumnName('');
      setColumnType('text');
      setError(null);
      // Show success message or refresh the page
      alert('Column added successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add column');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Controller View</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <FiPlus className="mr-2" />
          Add Column
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Column</h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Column Name
              </label>
              <input
                type="text"
                value={columnName}
                onChange={(e) => setColumnName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter column name"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Column Type
              </label>
              <select
                value={columnType}
                onChange={(e) => setColumnType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
                <option value="boolean">Boolean</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddColumn}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Add Column
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">Instructions</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Click the "Add Column" button to add a new column to the table</li>
          <li>Enter a unique name for the column</li>
          <li>Select the appropriate data type for the column</li>
          <li>The new column will be added to all existing and future records</li>
          <li>Column names should be unique and contain only letters, numbers, and underscores</li>
        </ul>
      </div>
    </div>
  );
};

export default ControllerPage;
