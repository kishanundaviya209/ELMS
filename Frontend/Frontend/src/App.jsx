import Router from "./router/Router";
import { AuthProvider } from "./store/authStore";

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
