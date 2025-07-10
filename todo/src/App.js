import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("login"); // 'login' or 'register'

  const handleLogin = (email) => setUser(email);
  const handleLogout = () => setUser(null);

  if (user) return <Home user={user} onLogout={handleLogout} />;
  if (view === "register") return <Register onRegister={handleLogin} switchToLogin={() => setView("login")} />;
  return <Login onLogin={handleLogin} switchToRegister={() => setView("register")} />;
}

export default App;