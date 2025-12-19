export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: {
    id: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    role: string | null;
  } | null;
}