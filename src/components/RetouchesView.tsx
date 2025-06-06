import React, { useState } from "react";
import { CreateAlterationWorkflow } from "./CreateAlterationWorkflow";

export const RetouchesView: React.FC = () => {
  const [showWorkflow, setShowWorkflow] = useState(false);

  const handleNewRetouche = () => {
    setShowWorkflow(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestion des retouches</h2>
        <button
          onClick={handleNewRetouche}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Nouvelle retouche
        </button>
      </div>
      <p>Cette section sera implémentée prochainement.</p>

      {showWorkflow && (
        <CreateAlterationWorkflow onClose={() => setShowWorkflow(false)} />
      )}
    </div>
  );
};
