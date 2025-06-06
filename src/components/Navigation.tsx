import React from "react";
import type { View } from "../../types/clients.ts";

interface NavigationProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onViewChange,
}) => {
  return (
    <nav className="w-64 bg-white shadow-md">
      <div className="p-6">
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => onViewChange("dashboard")}
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
              onClick={() => onViewChange("clients")}
              className={`w-full text-left text-lg px-6 py-4 rounded transition-colors ${
                currentView === "clients"
                  ? "bg-coral-pink text-white"
                  : "text-coral-pink hover:bg-melon/50"
              }`}
            >
              Gestion des clients
            </button>
          </li>
          <li>
            <button
              onClick={() => onViewChange("retouches")}
              className={`w-full text-left text-lg px-6 py-4 rounded transition-colors ${
                currentView === "retouches"
                  ? "bg-coral-pink text-white"
                  : "text-coral-pink hover:bg-melon/50"
              }`}
            >
              Retouches
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
