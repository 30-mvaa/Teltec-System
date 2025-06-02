// User type
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

// Auth state
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Añade aquí otros tipos que necesites