import { Cabin } from "./Cabin";

export interface TripDTO {
  id: number;
  duration: number;
  difficulty: number;
  description: string;
  peak: string;
  area: string;
  length: number;
  rate: number;
  local: boolean;
  cabins: Cabin[];
  creatorId: number;
  hikerOnCallId: number;
}
