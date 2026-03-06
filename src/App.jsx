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
    <>
      {session ? (
        <Container className="py-5 text-center">
          <h1 className="mb-4">Welcome to Pottery Class!</h1>
          <p className="lead mb-4">You are logged in as <strong>{session.email}</strong></p>
          <Button variant="secondary" onClick={handleLogout}>Log Out</Button>
        </Container>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default App;