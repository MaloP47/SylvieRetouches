import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

interface HomeAdminProps {
  session: Session;
  onLogout: () => void;
}

type ClientType = "Particulier" | "Professionnel" | null;

interface Client {
  id: string;
  created_at: string;
  type: ClientType;
  name: string;
  telephone: string | null;
  email: string | null;
  adress: string | null;
}

export function HomeAdmin({ session, onLogout }: HomeAdminProps) {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  const [editingClient, setEditingClient] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState<ClientType>(null);
  const [newTelephone, setNewTelephone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAdress, setNewAdress] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

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

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-semibold">
            Bienvenue Sylvie !
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
          <h2 className="text-2xl font-bold mb-6">Gestion des clients</h2>
          <div className="grid gap-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nom
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Téléphone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Adresse
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {clients.map((client) => (
                    <tr key={client.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {editingClient === client.id ? (
                          <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder="Nom"
                            className="px-2 py-1 border rounded text-sm w-full"
                          />
                        ) : (
                          client.name
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {editingClient === client.id ? (
                          <select
                            value={newType || ""}
                            onChange={(e) =>
                              setNewType(e.target.value as ClientType)
                            }
                            className="px-2 py-1 border rounded text-sm"
                          >
                            <option value="">Sélectionner</option>
                            <option value="Particulier">Particulier</option>
                            <option value="Boutique">Boutique</option>
                          </select>
                        ) : (
                          client.type || "Non défini"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {editingClient === client.id ? (
                          <input
                            type="tel"
                            value={newTelephone}
                            onChange={(e) => setNewTelephone(e.target.value)}
                            placeholder="Téléphone"
                            className="px-2 py-1 border rounded text-sm w-full"
                          />
                        ) : (
                          client.telephone || "Non défini"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {editingClient === client.id ? (
                          <input
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            placeholder="Email"
                            className="px-2 py-1 border rounded text-sm w-full"
                          />
                        ) : (
                          client.email || "Non défini"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {editingClient === client.id ? (
                          <input
                            type="text"
                            value={newAdress}
                            onChange={(e) => setNewAdress(e.target.value)}
                            placeholder="Adresse"
                            className="px-2 py-1 border rounded text-sm w-full"
                          />
                        ) : (
                          client.adress || "Non défini"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {editingClient === client.id ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateClient(client.id)}
                              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
                            >
                              Valider
                            </button>
                            <button
                              onClick={() => {
                                setEditingClient(null);
                                resetForm();
                              }}
                              className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm"
                            >
                              Annuler
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingClient(client.id);
                              setNewName(client.name);
                              setNewType(client.type);
                              setNewTelephone(client.telephone || "");
                              setNewEmail(client.email || "");
                              setNewAdress(client.adress || "");
                            }}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                          >
                            Modifier
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
