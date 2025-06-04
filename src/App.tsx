import "./style.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { LoginForm } from "./components/LoginForm";
import { Home } from "./components/Home";
import { HomeAdmin } from "./components/HomeAdmin";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LandingPage } from "./components/LandingPage";
import { supabase } from "./lib/supabase";

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event: string, session: Session | null) => {
        setSession(session);
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  const isAdmin = session?.user?.app_metadata?.role === "admin";

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            session ? (
              isAdmin ? (
                <Navigate to="/homeadmin" replace />
              ) : (
                <Navigate to="/home" replace />
              )
            ) : (
              <LandingPage
                session={session}
                onLogout={() => setSession(null)}
              />
            )
          }
        />
        <Route
          path="/landing"
          element={
            <LandingPage session={session} onLogout={() => setSession(null)} />
          }
        />
        <Route
          path="/login"
          element={
            session ? (
              isAdmin ? (
                <Navigate to="/homeadmin" replace />
              ) : (
                <Navigate to="/home" replace />
              )
            ) : (
              <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-100">
                <LoginForm onLogin={setSession} />
              </div>
            )
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute session={session}>
              <Home session={session!} onLogout={() => setSession(null)} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/homeadmin"
          element={
            <ProtectedRoute session={session}>
              {isAdmin ? (
                <HomeAdmin
                  session={session!}
                  onLogout={() => setSession(null)}
                />
              ) : (
                <Navigate to="/home" replace />
              )}
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
