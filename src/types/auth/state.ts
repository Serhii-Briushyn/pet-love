export interface AuthState {
  user: { name: string; email: string } | null;
  token: string | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  isError: string | null;
}
