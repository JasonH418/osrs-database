import type { Difficulty, BaseEntity, Length } from "./common";
import { Requirements } from "./requirements";
import { Rewards } from "./rewards";

export interface Quest extends BaseEntity {
  type: "quest";
  id: string;
  name: string;
  description: string;
  difficulty: Difficulty;
  membersOnly: boolean;
  questPointReward: number;
  releaseDate: string;
  iconUrl: string;
  length: Length;
  series: string;
  requirements?: Requirements;
  rewards: Rewards;
  questSteps: string[];
}

// export const QuestSchema: z.ZodType<Quest> = z.object({
//   type: z.literal("quest"),
//   id: z.string(),
//   name: z.string(),
//   description: z.string(),
//   difficulty: z.enum(["Easy", "Medium", "Hard"]),
//   membersOnly: z.boolean(),
//   questPointReward: z.number().int().positive(),
//   releaseDate: z.string(),
//   requiredSkills: z.string().array(),
//   rewards: z.string().array()
// })
