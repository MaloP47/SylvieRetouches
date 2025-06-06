import "../style.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { Connexion } from "../pages/Connexion";
import { MonEspace } from "../pages/MonEspace";
import { TableauDeBord } from "../pages/TableauDeBord";
import { ProtectedRoute } from "./ProtectedRoute";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { supabase } from "../lib/supabase";

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
          element={<Home session={session} onLogout={() => setSession(null)} />}
        />
        <Route
          path="/connexion"
          element={
            session ? (
              isAdmin ? (
                <Navigate to="/tableau-de-bord" replace />
              ) : (
                <Navigate to="/mon-espace" replace />
              )
            ) : (
              <Connexion onLogin={setSession} />
            )
          }
        />
        <Route
          path="/mon-espace"
          element={
            <ProtectedRoute session={session}>
              <MonEspace session={session!} onLogout={() => setSession(null)} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tableau-de-bord"
          element={
            <ProtectedRoute session={session}>
              {isAdmin ? (
                <TableauDeBord
                  session={session!}
                  onLogout={() => setSession(null)}
                />
              ) : (
                <Navigate to="/mon-espace" replace />
              )}
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
