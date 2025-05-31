import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

interface HomeProps {
  session: Session;
  onLogout: () => void;
}

export function Home({ session, onLogout }: HomeProps) {
  const [displayName, setDisplayName] = useState("");
  const [currentDisplayName, setCurrentDisplayName] = useState(
    session.user.user_metadata.display_name || ""
  );
  const [isRenaming, setIsRenaming] = useState(false);
  const navigate = useNavigate();

  async function updateDisplayName() {
    if (!session?.user) return;

    const { error } = await supabase.auth.updateUser({
      data: { display_name: displayName },
    });

    if (error) {
      console.error("Error updating display name:", error);
    } else {
      console.log("Display name updated successfully");
      setCurrentDisplayName(displayName);
      setDisplayName(""); // Clear the input after successful update
      setIsRenaming(false);
    }
  }

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
            Bienvenue, {currentDisplayName || session.user.email || "anon"}!
          </div>
          <div className="flex items-center gap-4">
            {isRenaming ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Nouveau nom"
                  className="px-3 py-1 border rounded text-sm"
                />
                <button
                  type="button"
                  onClick={updateDisplayName}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
                >
                  Valider
                </button>
                <button
                  type="button"
                  onClick={() => setIsRenaming(false)}
                  className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm"
                >
                  Annuler
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsRenaming(true)}
                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm"
              >
                Renommer
              </button>
            )}
            <button
              type="button"
              onClick={handleSignOut}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
            >
              Déconnexion
            </button>
          </div>
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
