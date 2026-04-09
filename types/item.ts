import { Bonuses } from "./bonuses";
import type { BaseEntity, TypeCategory } from "./common";
import { type Quest } from "./quest";
import { SkillRequirements } from "./skillRequirement";

export interface Item extends BaseEntity {
  type: "item";
  id: string;
  name: string;
  typeCategory: TypeCategory;
  value: number;
  examine: string;
  tradeable: boolean;
  members: boolean;
  weight: number;
  skillRequirements?: SkillRequirements[];
  bonuses?: Bonuses;
  releaseDate: string;
  imageURL: string;
  quest?: Quest;
}
