import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PropertyProvider } from './contexts/PropertyContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import AddProperty from './pages/AddProperty';
import ArchivedProperties from './pages/ArchivedProperties';
import Login from './pages/Login';
import Profile from './pages/Profile';
import PrivateRoute from './components/Auth/PrivateRoute';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <AuthProvider>
      <PropertyProvider>
        <NotificationProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<PrivateRoute />}>
                  <Route element={<Layout toggleTheme={toggleTheme} theme={theme} />}>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/properties" element={<Properties />} />
                    <Route path="/properties/:id" element={<PropertyDetail />} />
                    <Route path="/properties/add" element={<AddProperty />} />
                    <Route path="/properties/edit/:id" element={<AddProperty />} />
                    <Route path="/archived" element={<ArchivedProperties />} />
                    <Route path="/profile" element={<Profile toggleTheme={toggleTheme} theme={theme} />} />
                  </Route>
                </Route>
              </Routes>
            </div>
          </Router>
        </NotificationProvider>
      </PropertyProvider>
    </AuthProvider>
  );
}

export default App;