// src/context/AuthContext.jsx
import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { loadDb, saveDb } from "../mock/mockDb";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [db, setDb] = useState(loadDb());
  const [user, setUser] = useState(() => {
    try {
      const raw = sessionStorage.getItem("uyzn_demo_session");
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  });

  useEffect(() => saveDb(db), [db]);

  const login = async ({ role, email, password }) => {
    // demo password rule
    if (password !== "demo123") {
      throw new Error("Invalid password. Use demo123 for the demo.");
    }
    const key = role === "applicant" ? "applicants" : role === "admin" ? "admins" : "partners";
    const found = db[key].find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!found) throw new Error("No user found with that email for the selected role.");
    setUser(found);
    sessionStorage.setItem("uyzn_demo_session", JSON.stringify(found));
    return found;
  };

  const signup = async ({ role, name, email }) => {
    const key = role === "applicant" ? "applicants" : role === "admin" ? "admins" : "partners";
    const exists = db[key].some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) throw new Error("Email already exists for this role.");

    // very simple new user model per role
    const newUser = {
      id: Date.now(),
      name,
      email,
      role,
      ...(role === "applicant" ? { program: "", region: "", gpa: 0, status: "New" } : {}),
      ...(role === "admin" ? { position: "Staff", permissions: [] } : {}),
      ...(role === "partner" ? { focusArea: "", access: [] } : {})
    };

    const next = { ...db, [key]: [...db[key], newUser] };
    setDb(next);
    setUser(newUser);
    sessionStorage.setItem("uyzn_demo_session", JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("uyzn_demo_session");
  };

  const value = useMemo(() => ({ user, db, login, signup, logout }), [user, db]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider/>");
  return ctx;
}
