/**
 * API service for file management system
 * Handles all HTTP requests to the backend
 */

import axios from 'axios';
import { FileRecord, FileCreateInput, FileUpdateInput, FileQueryParams } from '../types/file';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * File Management API Service
 * Implements CRUD operations for file records
 */
export const FileAPI = {
  /**
   * Create a new file record
   * @param data File creation data
   * @returns Promise with created file record
   */
  createFile: async (data: FileCreateInput): Promise<FileRecord> => {
    const response = await api.post<FileRecord>('/files', data);
    return response.data;
  },

  /**
   * Get a file record by ID
   * @param id File record ID
   * @returns Promise with file record
   */
  getFile: async (id: number): Promise<FileRecord> => {
    const response = await api.get<FileRecord>(`/files/${id}`);
    return response.data;
  },

  /**
   * Get all file records with optional filtering
   * @param params Query parameters for filtering
   * @param skip Number of records to skip
   * @param limit Maximum number of records to return
   * @returns Promise with array of file records
   */
  getFiles: async (
    params?: FileQueryParams,
    skip: number = 0,
    limit: number = 100
  ): Promise<FileRecord[]> => {
    const response = await api.get<FileRecord[]>('/files', {
      params: {
        ...params,
        skip,
        limit,
      },
    });
    return response.data;
  },

  /**
   * Update a file record
   * @param id File record ID
   * @param data Update data
   * @returns Promise with updated file record
   */
  updateFile: async (id: number, data: FileUpdateInput): Promise<FileRecord> => {
    const response = await api.put<FileRecord>(`/files/${id}`, data);
    return response.data;
  },

  /**
   * Delete a file record
   * @param id File record ID
   * @returns Promise<void>
   */
  deleteFile: async (id: number): Promise<void> => {
    await api.delete(`/files/${id}`);
  },

  /**
   * Search file records
   * @param searchTerm Search term
   * @param limit Maximum number of records to return
   * @returns Promise with array of matching file records
   */
  searchFiles: async (searchTerm: string, limit: number = 100): Promise<FileRecord[]> => {
    const response = await api.get<FileRecord[]>(`/files/search/${searchTerm}`, {
      params: { limit },
    });
    return response.data;
  },
};

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
);

export default api;
