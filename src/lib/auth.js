export function setSession({ email }) {
  localStorage.setItem('pottery_session', JSON.stringify({ email }));
}

export function getSession() {
  const session = localStorage.getItem('pottery_session');
  return session ? JSON.parse(session) : null;
}

export function clearSession() {
  localStorage.removeItem('pottery_session');
}