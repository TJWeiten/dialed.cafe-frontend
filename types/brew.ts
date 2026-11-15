export type Rating = "THUMBS_UP" | "NEUTRAL" | "THUMBS_DOWN";

export type MadeAs = "ESPRESSO" | "MILK_DRINK" | "AMERICANO" | "OTHER";

export type BasketType =
  | "STANDARD_DOUBLE"
  | "STANDARD_SINGLE"
  | "PRECISION_DOUBLE"
  | "PRECISION_SINGLE"
  | "PRECISION_TRIPLE"
  | "DOUBLE_WALLED_SINGLE"
  | "DOUBLE_WALLED_DOUBLE"
  | "OTHER";

export interface BrewEntry {
  id: string;
  datetime: string;
  beanId: string;
  beanName: string;       // computed: roaster + name
  grinderId: string;
  grinderName: string;
  grindSetting: string;
  doseIn: number;
  yieldOut: number;
  timeTaken: number;
  rating: Rating | null;
  madeAs: MadeAs;
  milkType: string | null;
  milkAmount: number | null;
  waterTemp: number | null;
  preInfusionTime: number | null;
  puckPrepNotes: string | null;
  waterType: string | null;
  basketType: BasketType | null;
  basketTypeOther: string | null;
  sauceId: string | null;
  sauceName: string | null;
  tastingNotes: string | null;
  copilotNotes: string | null;
  baristaCopilotComment: string | null;
}
