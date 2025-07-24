import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Purchase from './pages/Purchase';
import Transfer from './pages/Transfer';
import Assignment from './pages/Assignment';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import jwtDecode from 'jwt-decode';
import Logs from './pages/Logs';

const App = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.role);
      } catch (e) {
        console.error('Invalid token');
      }
    }
  }, [isLoggedIn]);

  const hideNavbarPaths = ['/', '/login'];
  const shouldShowNavbar = isLoggedIn && !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && (
        <Navbar
          role={userRole}
          onLogout={() => {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            setUserRole(null);
          }}
        />
      )}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />

        <Route path="/dashboard" element={<PrivateRoute allowedRoles={['admin', 'logistics', 'commander']}><Dashboard /></PrivateRoute>} />
        <Route path="/purchase" element={<PrivateRoute allowedRoles={['admin']}><Purchase /></PrivateRoute>} />
        <Route path="/assignment" element={<PrivateRoute allowedRoles={['admin', 'logistics']}><Assignment /></PrivateRoute>} />
        <Route path="/transfer" element={<PrivateRoute allowedRoles={['admin', 'logistics']}><Transfer /></PrivateRoute>} />
        <Route path="/logs" element={<PrivateRoute allowedRoles={['admin']}><Logs /></PrivateRoute>} />
      </Routes>


    </>
  );
};

export default App;
