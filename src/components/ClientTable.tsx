import React from "react";
import type { Client, ClientType } from "../../types/clients";

interface ClientTableProps {
  clients: Client[];
  editingClient: string | null;
  newName: string;
  newType: ClientType;
  newTelephone: string;
  newEmail: string;
  newAdress: string;
  onNameChange: (value: string) => void;
  onTypeChange: (value: ClientType) => void;
  onTelephoneChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onAdressChange: (value: string) => void;
  onUpdateClient: (clientId: string) => void;
  onCancelEdit: () => void;
  onStartEdit: (client: Client) => void;
}

export const ClientTable: React.FC<ClientTableProps> = ({
  clients,
  editingClient,
  newName,
  newType,
  newTelephone,
  newEmail,
  newAdress,
  onNameChange,
  onTypeChange,
  onTelephoneChange,
  onEmailChange,
  onAdressChange,
  onUpdateClient,
  onCancelEdit,
  onStartEdit,
}) => {
  return (
    <div className="h-full overflow-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
              Nom
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
              Téléphone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
              Adresse
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="px-6 py-4 text-sm text-gray-900 max-w-[200px] truncate">
                {editingClient === client.id ? (
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => onNameChange(e.target.value)}
                    placeholder="Nom"
                    className="px-2 py-1 border rounded text-sm w-full"
                  />
                ) : (
                  <span title={client.name}>{client.name}</span>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {editingClient === client.id ? (
                  <select
                    value={newType || ""}
                    onChange={(e) => onTypeChange(e.target.value as ClientType)}
                    className="px-2 py-1 border rounded text-sm w-full"
                  >
                    <option value="">Sélectionner</option>
                    <option value="Particulier">Particulier</option>
                    <option value="Boutique">Boutique</option>
                  </select>
                ) : (
                  client.type || "Non défini"
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 max-w-[150px] truncate">
                {editingClient === client.id ? (
                  <input
                    type="tel"
                    value={newTelephone}
                    onChange={(e) => onTelephoneChange(e.target.value)}
                    placeholder="Téléphone"
                    className="px-2 py-1 border rounded text-sm w-full"
                  />
                ) : (
                  <span title={client.telephone || "Non défini"}>
                    {client.telephone || "Non défini"}
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 max-w-[200px] truncate">
                {editingClient === client.id ? (
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => onEmailChange(e.target.value)}
                    placeholder="Email"
                    className="px-2 py-1 border rounded text-sm w-full"
                  />
                ) : (
                  <span title={client.email || "Non défini"}>
                    {client.email || "Non défini"}
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 max-w-[200px] truncate">
                {editingClient === client.id ? (
                  <input
                    type="text"
                    value={newAdress}
                    onChange={(e) => onAdressChange(e.target.value)}
                    placeholder="Adresse"
                    className="px-2 py-1 border rounded text-sm w-full"
                  />
                ) : (
                  <span title={client.adress || "Non défini"}>
                    {client.adress || "Non défini"}
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {editingClient === client.id ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => onUpdateClient(client.id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
                    >
                      Valider
                    </button>
                    <button
                      onClick={onCancelEdit}
                      className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm"
                    >
                      Annuler
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onStartEdit(client)}
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
  );
};
