import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { DashboardView } from "../components/DashboardView";
import { RetouchesView } from "../components/RetouchesView";

interface MonEspaceProps {
  session: Session;
  onLogout: () => void;
}

type View = "dashboard" | "retouches";

export function MonEspace({ session, onLogout }: MonEspaceProps) {
  const navigate = useNavigate();
  const [clientName, setClientName] = useState<string>("");
  const [currentView, setCurrentView] = useState<View>("dashboard");

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

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardView />;
      case "retouches":
        return <RetouchesView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-misty-rose">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="w-full px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/")}
              className="hover:opacity-80 transition-opacity"
            >
              <img src="/sylvie3.png" alt="Logo" className="h-20 w-auto" />
            </button>
            <div className="text-2xl font-semibold text-coral-pink">
              Bienvenue, {clientName}!
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 text-coral-pink hover:text-light-coral transition-colors text-l"
            >
              Retour à l'accueil
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="px-4 py-2 bg-coral-pink text-white rounded hover:bg-light-coral transition-colors text-l focus:ring-2 focus:ring-melon focus:ring-offset-2"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Main Content with Navigation */}
      <div className="flex-1 flex bg-melon/30">
        <nav className="w-64 bg-white shadow-md">
          <div className="p-6">
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => setCurrentView("dashboard")}
                  className={`w-full text-left text-lg px-6 py-4 rounded transition-colors ${
                    currentView === "dashboard"
                      ? "bg-coral-pink text-white"
                      : "text-coral-pink hover:bg-melon/50"
                  }`}
                >
                  Tableau de bord
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView("retouches")}
                  className={`w-full text-left text-lg px-6 py-4 rounded transition-colors ${
                    currentView === "retouches"
                      ? "bg-coral-pink text-white"
                      : "text-coral-pink hover:bg-melon/50"
                  }`}
                >
                  Mes retouches
                </button>
              </li>
            </ul>
          </div>
        </nav>
        <main className="flex-1 p-8">{renderContent()}</main>
      </div>
    </div>
  );
}
