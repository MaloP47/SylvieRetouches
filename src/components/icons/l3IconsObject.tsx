import { UnderwearIcon, SocksIcon, TrousersIcon, TShirtIcon } from "./l3Icons";

export const L3Icons = {
  underwear: UnderwearIcon,
  socks: SocksIcon,
  trousers: TrousersIcon,
  tshirt: TShirtIcon,
} as const;

// Type for the icon names
export type L3IconName = keyof typeof L3Icons;
