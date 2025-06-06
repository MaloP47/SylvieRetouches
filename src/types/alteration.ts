export type CategoryL2 = "woman" | "man" | "kid" | "other" | "home" | "accessories";
export type CategoryL3 =
  | "underwear"
  | "socks"
  | "leggings"
  | "trousers"
  | "accessories"
  | "hats"
  | "shirts"
  | "skirts"
  | "dress"
  | "knitwear"
  | "other"
  | "jeans"
  | "t-shirts"
  | "tops"
  | "swimwear";

export type AlterationStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "cancelled";

export type WorkflowStep =
  | "category_l2"
  | "category_l3"
  | "title"
  | "description"
  | "fabric"
  | "price"
  | "urgency"
  | "desired_date"
  | "photos"
  | "confirmation";

export interface WorkflowStepInfo {
  id: WorkflowStep;
  label: string;
  description: string;
}

export const WORKFLOW_STEPS: WorkflowStepInfo[] = [
  {
    id: "category_l2",
    label: "Catégorie principale",
    description: "Sélectionnez la catégorie principale de l'article à retoucher",
  },
  {
    id: "category_l3",
    label: "Sous-catégorie",
    description: "Sélectionnez la sous-catégorie du vêtement",
  },
  {
    id: "title",
    label: "Titre",
    description: "Donnez un titre à votre retouche",
  },
  {
    id: "description",
    label: "Description",
    description: "Décrivez les modifications souhaitées",
  },
  {
    id: "fabric",
    label: "Tissu",
    description: "Précisez le type de tissu",
  },
  {
    id: "price",
    label: "Prix",
    description: "Estimation du prix",
  },
  {
    id: "urgency",
    label: "Urgence",
    description: "Indiquez si la retouche est urgente",
  },
  {
    id: "desired_date",
    label: "Date souhaitée",
    description: "Date de livraison souhaitée",
  },
  {
    id: "photos",
    label: "Photos",
    description: "Ajoutez des photos du vêtement",
  },
  {
    id: "confirmation",
    label: "Confirmation",
    description: "Vérifiez et confirmez les informations",
  },
];

export interface Alteration {
  id: number;
  client: string;
  created_at: string;
  status: AlterationStatus;
  category_l2: CategoryL2;
  category_l3: CategoryL3;
  price: number;
  updated_at?: string;
  fabric: string[];
  title: string;
  decription?: string;
  urgent: boolean;
  desired_date?: string;
  custom_id: number;
}
