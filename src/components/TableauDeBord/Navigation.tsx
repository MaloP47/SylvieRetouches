import React from "react";
import type { View } from "./types";

interface NavigationProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onViewChange,
}) => {
  return (
    <nav className="w-64 bg-yellow-300 shadow-md">
      <div className="p-6">
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => onViewChange("dashboard")}
              className={`w-full text-left text-lg px-6 py-4 rounded ${
                currentView === "dashboard"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              Tableau de bord
            </button>
          </li>
          <li>
            <button
              onClick={() => onViewChange("clients")}
              className={`w-full text-left text-lg px-6 py-4 rounded ${
                currentView === "clients"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              Gestion des clients
            </button>
          </li>
          <li>
            <button
              onClick={() => onViewChange("retouches")}
              className={`w-full text-left text-lg px-6 py-4 rounded ${
                currentView === "retouches"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
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
