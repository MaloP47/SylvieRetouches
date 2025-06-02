export type ClientType = "Particulier" | "Professionnel" | null;

export interface Client {
  id: string;
  created_at: string;
  type: ClientType;
  name: string;
  telephone: string | null;
  email: string | null;
  adress: string | null;
}

export type View = "dashboard" | "clients" | "retouches";
