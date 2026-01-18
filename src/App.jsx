import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MarketingPage from './pages/MarketingPage';
import LoginPage from './pages/LoginPage';
import ConsoleLayout from './components/ConsoleLayout';
import Dashboard from './pages/Console/Dashboard';
import Profile from './pages/Console/Profile';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MarketingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Console Routes */}
        <Route path="/console" element={<ConsoleLayout />}>
          <Route index element={<Navigate to="/console/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={
            <div className="bg-white p-8 rounded-2xl border border-slate-100">
              <h2 className="text-2xl font-bold mb-4">Settings</h2>
              <p className="text-slate-500 italic">Settings module is coming soon...</p>
            </div>
          } />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
