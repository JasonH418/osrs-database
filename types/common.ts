export type EntityType = "item" | "quest";
export type Difficulty = "Easy" | "Medium" | "Hard";
export type Rarity = "Common" | "Rare" | "Epic";
export type CombatStyles = "Defensive" | "Slash" | "Strength" | "Utility";
export type TypeCategory =
  | "weapon"
  | "tool"
  | "armor"
  | "food"
  | "potion"
  | "quest_item";
export type Skill =
  | "Attack"
  | "Defence"
  | "Combat"
  | "Mining"
  | "Magic"
  | "Ranged"
  | "Cooking"
  | "Herblore"
  | "Crafting"
  | "Strength"
  | "Woodcutting"
  | "Agility";

export type Length = "Short" | "Medium" | "Long" | "Very Long";

export interface BaseEntity {
  type: EntityType;
  id: string;
  name: string;
}
