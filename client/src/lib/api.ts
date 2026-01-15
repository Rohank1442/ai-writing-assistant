const BASE_URL = 'http://127.0.0.1:8000';

function getAuthToken(): string | null {
  return localStorage.getItem('access_token');
}

function setAuthToken(token: string): void {
  localStorage.setItem('access_token', token);
}

function clearAuthToken(): void {
  localStorage.removeItem('access_token');
}

async function fetchWithAuth(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  if (!(options.body instanceof FormData)) {
    (headers as Record<string, string>)['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    clearAuthToken();
    window.location.href = '/login';
  }

  return response;
}

// Auth API
export interface User {
  id: string;
  email: string;
}

export interface AuthResponse {
  id: string;
  email: string;
  access_token?: string;
}

export const authApi = {
  async signup(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Signup failed');
    }
    return response.json();
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Login failed');
    }
    const data = await response.json();
    if (data.access_token) {
      setAuthToken(data.access_token);
    }
    return data;
  },

  logout(): void {
    clearAuthToken();
  },

  isAuthenticated(): boolean {
    return !!getAuthToken();
  },
};

// Documents API
export interface Document {
  doc_id: string;
  filename: string;
  status: string;
  chunks_count?: number;
  created_at?: string;
}

export interface UploadResponse {
  doc_id: string;
  status: string;
  chunks_count: number;
}

export const documentsApi = {
  async upload(file: File, onProgress?: (progress: number) => void): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetchWithAuth('/documents/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Upload failed');
    }

    return response.json();
  },

  async list(): Promise<Document[]> {
    const response = await fetchWithAuth('/documents/');
    if (!response.ok) {
      throw new Error('Failed to fetch documents');
    }
    return response.json();
  },

  async get(docId: string): Promise<Document> {
    const response = await fetchWithAuth(`/documents/${docId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch document');
    }
    return response.json();
  },
};

// Essays/Files API
export interface OutlineItem {
  header: string;
  description: string;
}

export interface Essay {
  id: string;
  doc_id: string;
  topic?: string;
  outline: OutlineItem[];
  content: Record<string, string>;
  created_at?: string;
}

export const essaysApi = {
  async generateOutline(documentId: string, topic: string): Promise<Essay> {
    const response = await fetchWithAuth('/files/generate-outline', {
      method: 'POST',
      body: JSON.stringify({ document_id: documentId, topic }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to generate outline');
    }
    return response.json();
  },

  async generateSection(essayId: string, header: string, documentId: string): Promise<string> {
    const response = await fetchWithAuth(`/files/${essayId}/generate-section?header=${encodeURIComponent(header)}&document_id=${documentId}`, {
      method: 'POST',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to generate section');
    }
    const data = await response.json();
    return data.text || data;
  },
};