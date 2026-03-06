import React, { useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage.jsx';
import { getSession, clearSession } from './lib/auth.js';
import { Container } from 'react-bootstrap';
import { Navbar, Button } from 'react-bootstrap';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const currentSession = getSession();
    setSession(currentSession);
  }, []);

  const handleLogout = () => {
    clearSession();
    setSession(null);
  };

  return (
    <div className="app-shell">
      <div className="app-overlay">
        {session ? (
          <Container className="py-5 text-center welcome-container min-vh-100 d-flex flex-column justify-content-center">
            <h1 className="mb-4 welcome-text">Welcome to Pottery Class!</h1>
            <p className="lead mb-4 welcome-text">You are logged in as <strong>{session.email}</strong></p>
            <Button variant="secondary" onClick={handleLogout} className="welcome-btn" style={{ minWidth: '150px' }}>Log Out</Button>
          </Container>
        ) : (
          <LoginPage />
        )}
      </div>
    </div>
  );
}

export default App;