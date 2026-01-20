/**
 * Validation utilities for user input and data structures
 * Prevents corrupted data from crashing the application
 */

import { Project, BuilderNode, BuilderEdge, Persona } from '@/types';

// Maximum file size for uploads (10MB)
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

// Maximum localStorage size to prevent abuse (5MB)
export const MAX_LOCALSTORAGE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

/**
 * Validation result type
 */
export interface ValidationResult {
  valid: boolean;
  error?: string;
  details?: string;
}

/**
 * Validates a file before processing
 */
export function validateFile(file: File): ValidationResult {
  // Check file exists
  if (!file) {
    return {
      valid: false,
      error: 'No file provided',
      details: 'Please select a file to upload.'
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: 'File too large',
      details: `File size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds maximum allowed size (${MAX_FILE_SIZE / 1024 / 1024}MB).`
    };
  }

  // Check file type is JSON
  if (!file.name.endsWith('.json') && file.type !== 'application/json') {
    return {
      valid: false,
      error: 'Invalid file type',
      details: 'Only JSON files (.json) are supported.'
    };
  }

  // Empty file check
  if (file.size === 0) {
    return {
      valid: false,
      error: 'Empty file',
      details: 'The selected file is empty.'
    };
  }

  return { valid: true };
}

/**
 * Validates JSON string can be parsed
 */
export function validateJSON(jsonString: string): ValidationResult {
  try {
    JSON.parse(jsonString);
    return { valid: true };
  } catch (err) {
    return {
      valid: false,
      error: 'Invalid JSON',
      details: err instanceof Error ? err.message : 'The file contains invalid JSON syntax.'
    };
  }
}

/**
 * Type guard for BuilderNode
 */
function isValidNode(obj: any): obj is BuilderNode {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.type === 'string' &&
    typeof obj.referenceId === 'string' &&
    typeof obj.x === 'number' &&
    typeof obj.y === 'number' &&
    ['task', 'data', 'constraint', 'annotation', 'touchpoint', 'actor'].includes(obj.type)
  );
}

/**
 * Type guard for BuilderEdge
 */
function isValidEdge(obj: any): obj is BuilderEdge {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.source === 'string' &&
    typeof obj.target === 'string'
  );
}

/**
 * Type guard for Persona
 */
function isValidPersona(obj: any): obj is Persona {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.color === 'string' &&
    typeof obj.initials === 'string' &&
    typeof obj.category === 'string' &&
    ['human', 'ai', 'system', 'other'].includes(obj.category)
  );
}

/**
 * Validates a Project object structure
 */
export function validateProject(obj: any): ValidationResult {
  // Check if object exists
  if (!obj || typeof obj !== 'object') {
    return {
      valid: false,
      error: 'Invalid project data',
      details: 'Project data must be a valid object.'
    };
  }

  // Check required fields
  if (typeof obj.id !== 'string') {
    return {
      valid: false,
      error: 'Invalid project ID',
      details: 'Project must have a valid ID string.'
    };
  }

  if (typeof obj.name !== 'string') {
    return {
      valid: false,
      error: 'Invalid project name',
      details: 'Project must have a valid name string.'
    };
  }

  if (typeof obj.lastModified !== 'number') {
    return {
      valid: false,
      error: 'Invalid lastModified timestamp',
      details: 'Project must have a valid lastModified timestamp.'
    };
  }

  // Check data structure
  if (!obj.data || typeof obj.data !== 'object') {
    return {
      valid: false,
      error: 'Invalid project data structure',
      details: 'Project must contain a data object.'
    };
  }

  // Validate nodes array
  if (!Array.isArray(obj.data.nodes)) {
    return {
      valid: false,
      error: 'Invalid nodes data',
      details: 'Project data must contain a nodes array.'
    };
  }

  // Validate each node
  for (let i = 0; i < obj.data.nodes.length; i++) {
    const node = obj.data.nodes[i];
    if (!isValidNode(node)) {
      return {
        valid: false,
        error: `Invalid node at index ${i}`,
        details: `Node at index ${i} is missing required fields or has invalid data.`
      };
    }
  }

  // Validate edges array
  if (!Array.isArray(obj.data.edges)) {
    return {
      valid: false,
      error: 'Invalid edges data',
      details: 'Project data must contain an edges array.'
    };
  }

  // Validate each edge
  for (let i = 0; i < obj.data.edges.length; i++) {
    const edge = obj.data.edges[i];
    if (!isValidEdge(edge)) {
      return {
        valid: false,
        error: `Invalid edge at index ${i}`,
        details: `Edge at index ${i} is missing required fields or has invalid data.`
      };
    }
  }

  // Validate personas array
  if (!Array.isArray(obj.data.personas)) {
    return {
      valid: false,
      error: 'Invalid personas data',
      details: 'Project data must contain a personas array.'
    };
  }

  // Validate each persona
  for (let i = 0; i < obj.data.personas.length; i++) {
    const persona = obj.data.personas[i];
    if (!isValidPersona(persona)) {
      return {
        valid: false,
        error: `Invalid persona at index ${i}`,
        details: `Persona at index ${i} is missing required fields or has invalid data.`
      };
    }
  }

  return { valid: true };
}

/**
 * Validates an array of Projects
 */
export function validateProjectsArray(obj: any): ValidationResult {
  if (!Array.isArray(obj)) {
    return {
      valid: false,
      error: 'Invalid projects data',
      details: 'Projects data must be an array.'
    };
  }

  // Check array size
  const stringified = JSON.stringify(obj);
  if (stringified.length > MAX_LOCALSTORAGE_SIZE) {
    return {
      valid: false,
      error: 'Projects data too large',
      details: `Total projects data (${(stringified.length / 1024 / 1024).toFixed(2)}MB) exceeds maximum allowed size (${MAX_LOCALSTORAGE_SIZE / 1024 / 1024}MB).`
    };
  }

  // Validate each project
  for (let i = 0; i < obj.length; i++) {
    const result = validateProject(obj[i]);
    if (!result.valid) {
      return {
        valid: false,
        error: `Invalid project at index ${i}`,
        details: result.details || result.error
      };
    }
  }

  return { valid: true };
}

/**
 * Safely parse localStorage data with validation
 */
export function safeParseLocalStorage<T>(
  key: string,
  validator: (obj: any) => ValidationResult
): { data: T | null; error: string | null } {
  try {
    const stored = localStorage.getItem(key);

    if (!stored) {
      return { data: null, error: null };
    }

    // Parse JSON
    let parsed: any;
    try {
      parsed = JSON.parse(stored);
    } catch (err) {
      console.error(`Failed to parse localStorage key "${key}":`, err);
      return {
        data: null,
        error: 'Corrupted data detected. Unable to parse saved data.'
      };
    }

    // Validate structure
    const validation = validator(parsed);
    if (!validation.valid) {
      console.error(`Invalid data in localStorage key "${key}":`, validation.error);
      return {
        data: null,
        error: validation.details || validation.error || 'Invalid data structure detected.'
      };
    }

    return { data: parsed as T, error: null };
  } catch (err) {
    console.error(`Error reading localStorage key "${key}":`, err);
    return {
      data: null,
      error: 'Failed to load saved data.'
    };
  }
}

/**
 * Safely save to localStorage with size validation
 */
export function safeSaveLocalStorage(key: string, data: any): ValidationResult {
  try {
    const stringified = JSON.stringify(data);

    // Check size
    if (stringified.length > MAX_LOCALSTORAGE_SIZE) {
      return {
        valid: false,
        error: 'Data too large to save',
        details: `Data size (${(stringified.length / 1024 / 1024).toFixed(2)}MB) exceeds maximum allowed size (${MAX_LOCALSTORAGE_SIZE / 1024 / 1024}MB).`
      };
    }

    localStorage.setItem(key, stringified);
    return { valid: true };
  } catch (err) {
    if (err instanceof Error && err.name === 'QuotaExceededError') {
      return {
        valid: false,
        error: 'Storage quota exceeded',
        details: 'Your browser storage is full. Please delete some projects to free up space.'
      };
    }

    return {
      valid: false,
      error: 'Failed to save data',
      details: err instanceof Error ? err.message : 'An unknown error occurred while saving.'
    };
  }
}

/**
 * Sanitizes user input strings
 */
export function sanitizeString(input: string, maxLength: number = 1000): string {
  if (typeof input !== 'string') {
    return '';
  }

  // Trim whitespace
  let sanitized = input.trim();

  // Limit length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  // Remove null bytes
  sanitized = sanitized.replace(/\0/g, '');

  return sanitized;
}
