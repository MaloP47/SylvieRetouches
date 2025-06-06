import React from "react";
import {
  FcBusinessman,
  FcBusinesswoman,
  FcHome,
  FcReading,
  FcShop,
} from "react-icons/fc";
import type { CategoryL2 } from "../../types/alteration";

interface CategoryIconProps {
  category: CategoryL2;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  category,
  className = "w-8 h-8",
}) => {
  switch (category) {
    case "woman":
      return <FcBusinesswoman className={className} />;
    case "man":
      return <FcBusinessman className={className} />;
    case "kid":
      return <FcReading className={className} />;
    case "home":
      return <FcHome className={className} />;
    case "other":
      return <FcShop className={className} />;
    default:
      return null;
  }
};

export const getCategoryLabel = (category: CategoryL2): string => {
  const labels: Record<CategoryL2, string> = {
    woman: "Femme",
    man: "Homme",
    kid: "Enfant",
    home: "Maison",
    other: "Autre",
  };
  return labels[category];
};
