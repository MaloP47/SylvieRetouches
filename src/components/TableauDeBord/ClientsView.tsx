import React from "react";
import type { Client, ClientType } from "./types";
import { ClientTable } from "./ClientTable";

interface ClientsViewProps {
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

export const ClientsView: React.FC<ClientsViewProps> = ({
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
    <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Gestion des clients</h2>
      <div className="flex-1 min-h-0">
        <ClientTable
          clients={clients}
          editingClient={editingClient}
          newName={newName}
          newType={newType}
          newTelephone={newTelephone}
          newEmail={newEmail}
          newAdress={newAdress}
          onNameChange={onNameChange}
          onTypeChange={onTypeChange}
          onTelephoneChange={onTelephoneChange}
          onEmailChange={onEmailChange}
          onAdressChange={onAdressChange}
          onUpdateClient={onUpdateClient}
          onCancelEdit={onCancelEdit}
          onStartEdit={onStartEdit}
        />
      </div>
    </div>
  );
};
