import React, { useState } from "react";
import type {
  CategoryL2,
  CategoryL3,
  WorkflowStep,
  WorkflowStepInfo,
} from "../types/alteration";
import { WORKFLOW_STEPS } from "../types/alteration";
import { CategoryIcon, getCategoryLabel } from "./CategoryIcons";

interface CreateAlterationWorkflowProps {
  onClose: () => void;
}

export const CreateAlterationWorkflow: React.FC<
  CreateAlterationWorkflowProps
> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>("category_l2");
  const [selectedCategoryL2, setSelectedCategoryL2] =
    useState<CategoryL2 | null>(null);
  const [selectedCategoryL3, setSelectedCategoryL3] =
    useState<CategoryL3 | null>(null);

  const handleCategoryL2Select = (category: CategoryL2) => {
    setSelectedCategoryL2(category);
    setCurrentStep("category_l3");
  };

  const handleCategoryL3Select = (category: CategoryL3) => {
    setSelectedCategoryL3(category);
    // Ici nous ajouterons la logique pour passer à l'étape suivante
    console.log("Catégories sélectionnées:", {
      l2: selectedCategoryL2,
      l3: category,
    });
  };

  const getCurrentStepIndex = () => {
    return WORKFLOW_STEPS.findIndex((step) => step.id === currentStep);
  };

  const renderProgressBar = () => {
    const currentIndex = getCurrentStepIndex();
    const progress = ((currentIndex + 1) / WORKFLOW_STEPS.length) * 100;

    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

  const renderStepSummary = () => {
    const currentIndex = getCurrentStepIndex();
    const completedSteps = WORKFLOW_STEPS.slice(0, currentIndex + 1);
    const upcomingSteps = WORKFLOW_STEPS.slice(currentIndex + 1);

    return (
      <div className="mt-8 border-t pt-4">
        <h4 className="text-sm font-semibold text-gray-600 mb-2">
          Progression
        </h4>
        <div className="space-y-2">
          {completedSteps.map((step, index) => (
            <div key={step.id} className="flex items-center text-sm">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2">
                ✓
              </span>
              <span className="text-gray-700">{step.label}</span>
              {index === currentIndex && (
                <span className="ml-2 text-blue-500">(En cours)</span>
              )}
            </div>
          ))}
          {upcomingSteps.map((step) => (
            <div
              key={step.id}
              className="flex items-center text-sm text-gray-400"
            >
              <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                {WORKFLOW_STEPS.findIndex((s) => s.id === step.id) + 1}
              </span>
              <span>{step.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCategoryL2Step = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">
        Sélectionnez une catégorie principale
      </h3>
      <div className="grid grid-cols-2 gap-6">
        {(["woman", "man", "kid", "other", "home", "accessories"] as CategoryL2[]).map(
          (category) => (
            <button
              key={category}
              onClick={() => handleCategoryL2Select(category)}
              className="p-6 border rounded-lg hover:bg-blue-50 transition-colors flex flex-col items-center gap-3 group"
            >
              <div className="text-blue-500 group-hover:text-blue-600">
                <CategoryIcon category={category} className="w-12 h-12" />
              </div>
              <span className="text-lg font-medium capitalize">
                {getCategoryLabel(category)}
              </span>
              <span className="text-sm text-gray-500">{category}</span>
            </button>
          )
        )}
      </div>
    </div>
  );

  const renderCategoryL3Step = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => setCurrentStep("category_l2")}
          className="text-blue-500 hover:text-blue-700"
        >
          ← Retour
        </button>
        <h3 className="text-xl font-semibold">
          Sélectionnez une sous-catégorie
        </h3>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {(
          [
            "underwear",
            "socks",
            "leggings",
            "trousers",
            "accessories",
            "hats",
            "shirts",
            "skirts",
            "dress",
            "knitwear",
            "other",
            "jeans",
            "t-shirts",
            "tops",
            "swimwear",
          ] as CategoryL3[]
        ).map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryL3Select(category)}
            className="p-4 border rounded-lg hover:bg-blue-50 transition-colors text-left capitalize"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Nouvelle retouche</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {renderProgressBar()}

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700">
            {WORKFLOW_STEPS.find((step) => step.id === currentStep)?.label}
          </h3>
          <p className="text-sm text-gray-500">
            {
              WORKFLOW_STEPS.find((step) => step.id === currentStep)
                ?.description
            }
          </p>
        </div>

        {currentStep === "category_l2"
          ? renderCategoryL2Step()
          : renderCategoryL3Step()}

        {renderStepSummary()}
      </div>
    </div>
  );
};
