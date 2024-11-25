/**
 * Type definitions for file management system
 */

export interface FileRecord {
  file_id: number;
  file_name: string;
  file_type: string;
  file_size: number;
  file_path: string;
  department?: string;
  owner?: string;
  access_level: string;
  created_at: string;
  updated_at: string;
}

export interface FileCreateInput {
  file_name: string;
  file_type: string;
  file_size: number;
  file_path: string;
  department?: string;
  owner?: string;
  access_level?: string;
}

export interface FileUpdateInput {
  file_name?: string;
  file_type?: string;
  file_size?: number;
  file_path?: string;
  department?: string;
  owner?: string;
  access_level?: string;
}

export interface FileQueryParams {
  department?: string;
  owner?: string;
  file_type?: string;
  access_level?: string;
  min_size?: number;
  max_size?: number;
}
