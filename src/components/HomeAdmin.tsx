import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import type { Client, ClientType, View } from "./HomeAdmin/types";
import { DashboardView } from "./HomeAdmin/DashboardView";
import { ClientsView } from "./HomeAdmin/ClientsView";
import { RetouchesView } from "./HomeAdmin/RetouchesView";
import { Navigation } from "./HomeAdmin/Navigation";

interface HomeAdminProps {
  session: Session;
  onLogout: () => void;
}

export function HomeAdmin({ session, onLogout }: HomeAdminProps) {
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
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-pink-100 shadow-md">
        <div className="w-full px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <img src="/sylvie3.png" alt="Logo" className="h-20 w-auto" />
            <div className="text-3xl font-semibold">Bienvenue Sylvie !</div>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="px-4 py-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-l"
          >
            Déconnexion
          </button>
        </div>
      </header>

      {/* Main Content with Navigation */}
      <div className="flex-1 flex bg-blue-300">
        <Navigation currentView={currentView} onViewChange={setCurrentView} />
        <main className="flex-1 p-8">{renderContent()}</main>
      </div>
    </div>
  );
}
