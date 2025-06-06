import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import type { Client, ClientType, View } from "../types/clients";
import { DashboardView } from "../components/DashboardView";
import { ClientsView } from "../components/ClientsView";
import { RetouchesView } from "../components/RetouchesView";
import { Navigation } from "../components/Navigation";

interface TableauDeBordProps {
  session: Session;
  onLogout: () => void;
}

export function TableauDeBord({ onLogout }: TableauDeBordProps) {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [clients, setClients] = useState<Client[]>([]);
  const [editingClient, setEditingClient] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState<ClientType>(null);
  const [newTelephone, setNewTelephone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAdress, setNewAdress] = useState("");

  useEffect(() => {
    if (currentView === "clients") {
      fetchClients();
    }
  }, [currentView]);

  async function fetchClients() {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching clients:", error);
    } else {
      setClients(data || []);
    }
  }

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      onLogout();
      navigate("/");
    }
  }

  async function updateClient(clientId: string) {
    const { error } = await supabase
      .from("clients")
      .update({
        name: newName,
        type: newType,
        telephone: newTelephone || null,
        email: newEmail || null,
        adress: newAdress || null,
      })
      .eq("id", clientId);

    if (error) {
      console.error("Error updating client:", error);
    } else {
      await fetchClients();
      setEditingClient(null);
      resetForm();
    }
  }

  function resetForm() {
    setNewName("");
    setNewType(null);
    setNewTelephone("");
    setNewEmail("");
    setNewAdress("");
  }

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardView />;
      case "clients":
        return (
          <ClientsView
            clients={clients}
            editingClient={editingClient}
            newName={newName}
            newType={newType}
            newTelephone={newTelephone}
            newEmail={newEmail}
            newAdress={newAdress}
            onNameChange={setNewName}
            onTypeChange={setNewType}
            onTelephoneChange={setNewTelephone}
            onEmailChange={setNewEmail}
            onAdressChange={setNewAdress}
            onUpdateClient={updateClient}
            onCancelEdit={() => {
              setEditingClient(null);
              resetForm();
            }}
            onStartEdit={(client) => {
              setEditingClient(client.id);
              setNewName(client.name);
              setNewType(client.type);
              setNewTelephone(client.telephone || "");
              setNewEmail(client.email || "");
              setNewAdress(client.adress || "");
            }}
          />
        );
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
            <div className="text-3xl font-semibold text-coral-pink">
              Bienvenue Sylvie !
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
              className="px-4 py-4 bg-coral-pink text-white rounded hover:bg-light-coral transition-colors text-l focus:ring-2 focus:ring-melon focus:ring-offset-2"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Main Content with Navigation */}
      <div className="flex-1 flex bg-melon/30">
        <Navigation currentView={currentView} onViewChange={setCurrentView} />
        <main className="flex-1 p-8">{renderContent()}</main>
      </div>
    </div>
  );
}
