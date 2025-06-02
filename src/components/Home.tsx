import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

interface HomeProps {
  session: Session;
  onLogout: () => void;
}

export function Home({ session, onLogout }: HomeProps) {
  const navigate = useNavigate();
  const [clientName, setClientName] = useState<string>("");

  useEffect(() => {
    async function fetchClientName() {
      const { data, error } = await supabase
        .from("clients")
        .select("name")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching client name:", error);
        setClientName(session.user.email || "anon");
      } else {
        setClientName(data.name);
      }
    }

    fetchClientName();
  }, [session.user.id]);

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
          <div className="text-xl font-semibold">Bienvenue, {clientName}!</div>
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
          <h2 className="text-2xl font-bold mb-6">Mes retouches</h2>
          <div className="grid gap-4">
            {/* Add your retouches content here */}
            <p className="text-gray-500">Aucune retouche pour le moment</p>
          </div>
        </div>
      </main>
    </div>
  );
}
