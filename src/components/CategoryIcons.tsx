import React from "react";
import type { CategoryL2 } from "../types/alteration";
import {
  WomanIcon,
  ManIcon,
  KidIcon,
  HomeIcon,
  OtherIcon,
  AccessoriesIcon,
} from "./icons/l2Icons";

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
      return <WomanIcon className={className} />;
    case "man":
      return <ManIcon className={className} />;
    case "kid":
      return <KidIcon className={className} />;
    case "home":
      return <HomeIcon className={className} />;
    case "other":
      return <OtherIcon className={className} />;
    case "accessories":
      return <AccessoriesIcon className={className} />;
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
    accessories: "Accessoires",
  };
  return labels[category];
};
