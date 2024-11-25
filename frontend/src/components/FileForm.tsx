/**
 * FileForm Component
 * Form for creating and editing file records
 */

import React, { useState, useEffect } from 'react';
import { FileRecord, FileCreateInput, FileUpdateInput } from '../types/file';

interface FileFormProps {
  file?: FileRecord;
  onSubmit: (data: FileCreateInput | FileUpdateInput) => void;
  onCancel: () => void;
}

const FileForm: React.FC<FileFormProps> = ({ file, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<FileCreateInput | FileUpdateInput>({
    file_name: '',
    file_type: '',
    file_size: 0,
    file_path: '',
    department: '',
    owner: '',
    access_level: 'private',
  });

  useEffect(() => {
    if (file) {
      setFormData({
        file_name: file.file_name,
        file_type: file.file_type,
        file_size: file.file_size,
        file_path: file.file_path,
        department: file.department || '',
        owner: file.owner || '',
        access_level: file.access_level,
      });
    }
  }, [file]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'file_size' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="file_name" className="block text-sm font-medium text-gray-700">
            File Name *
          </label>
          <input
            type="text"
            name="file_name"
            id="file_name"
            required
            value={formData.file_name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="file_type" className="block text-sm font-medium text-gray-700">
            File Type *
          </label>
          <input
            type="text"
            name="file_type"
            id="file_type"
            required
            value={formData.file_type}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="file_size" className="block text-sm font-medium text-gray-700">
            File Size (bytes) *
          </label>
          <input
            type="number"
            name="file_size"
            id="file_size"
            required
            min="0"
            value={formData.file_size}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="file_path" className="block text-sm font-medium text-gray-700">
            File Path *
          </label>
          <input
            type="text"
            name="file_path"
            id="file_path"
            required
            value={formData.file_path}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <input
            type="text"
            name="department"
            id="department"
            value={formData.department}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="owner" className="block text-sm font-medium text-gray-700">
            Owner
          </label>
          <input
            type="text"
            name="owner"
            id="owner"
            value={formData.owner}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="access_level" className="block text-sm font-medium text-gray-700">
            Access Level
          </label>
          <select
            name="access_level"
            id="access_level"
            value={formData.access_level}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
            <option value="internal">Internal</option>
            <option value="confidential">Confidential</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {file ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default FileForm;
