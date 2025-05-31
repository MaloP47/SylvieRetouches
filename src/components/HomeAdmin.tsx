import React from "react";
import { useNavigate } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

interface HomeAdminProps {
  session: Session;
  onLogout: () => void;
}

export function HomeAdmin({ session, onLogout }: HomeAdminProps) {
  const navigate = useNavigate();

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      onLogout();
      navigate("/");
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-semibold">
            Admin Panel - {session.user.email}
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
          >
            Déconnexion
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Administration</h2>
          <div className="grid gap-4">
            {/* Add admin-specific content here */}
            <p className="text-gray-500">Panel d'administration</p>
          </div>
        </div>
      </main>
    </div>
  );
}
