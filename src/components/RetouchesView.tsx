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
          className="px-4 py-4 bg-coral-pink text-white rounded hover:bg-light-coral transition-colors text-l focus:ring-2 focus:ring-melon focus:ring-offset-2"
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
