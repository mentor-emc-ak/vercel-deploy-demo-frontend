import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Todos from './components/Todos';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, loading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="app">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={user ? <Todos /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
