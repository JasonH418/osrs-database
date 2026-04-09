import "dotenv/config";
import {Collection, MongoClient} from "mongodb";
import {Item, Quest} from "./types";

// Init vars
const ITEMS_URL: string =
  "https://raw.githubusercontent.com/JasonH418/oldschool-runescape/refs/heads/main/items.json";
const QUESTS_URL: string =
  "https://raw.githubusercontent.com/JasonH418/oldschool-runescape/refs/heads/main/quests.json";
const MONGO_URI: string | undefined = process.env.MONGO_URI;
if (!MONGO_URI) throw new Error("MONGO_URI is not defined");

// Mongo setup
const client: MongoClient = new MongoClient(MONGO_URI);
const itemsCol: Collection<Item> = client.db("osrs").collection<Item>("items");
const questsCol: Collection<Quest> = client
  .db("osrs")
  .collection<Quest>("quests");

async function exit() {
  try {
    await client.close();
    console.log("Disconnected succesfully from database");
  } catch (e) {
    console.log(e);
  } finally {
    process.exit(0);
  }
}

async function fetchGithubData<T>(url: string): Promise<T[]> {
  const response: Response = await fetch(url);
  return await response.json();
}

export async function getItems(): Promise<Item[]> {
  return await itemsCol.find({}).toArray();
}

export async function getItemById(id: string): Promise<Item | null> {
  return await itemsCol.findOne({id});
}

export async function getQuestById(id: string): Promise<Quest | null> {
  return await questsCol.findOne({ id });
}

export async function getQuests(): Promise<Quest[]> {
  return await questsCol.find({}).toArray();
}

export async function seedQuests(): Promise<void> {
  if ((await questsCol.countDocuments()) == 0) {
    const data: Quest[] = await fetchGithubData<Quest>(QUESTS_URL);
    const quests: Quest[] = await updateQuestImages(data);
    await questsCol.insertMany(quests);
  }
}

export async function seedItems(): Promise<void> {
  if ((await itemsCol.countDocuments()) == 0) {
    const data: Item[] = await fetchGithubData<Item>(ITEMS_URL);
    const items: Item[] = await updateItemImages(data);
    await itemsCol.insertMany(items);
  }
}

export async function updateItemImages(items: Item[]): Promise<Item[]> {
  return items.map((it: Item) => {
    let itemName: string = it.name.toLowerCase().split(" ").join("_");
    itemName = `${itemName[0]!.toUpperCase()}${itemName.substring(1)}`;
    return {
      ...it,

      imageURL: `https://oldschool.runescape.wiki/images/${itemName}_detail.png`,
    };
  });
}

export async function updateQuestImages(quests: Quest[]): Promise<Quest[]> {
  const newQuests: Quest[] = quests.map((quest: Quest) => {
    const questName: string = quest.name.split(" ").join("_");
    return {
      ...quest,
      iconUrl: `https://oldschool.runescape.wiki/images/${questName}.png`,
    };
  });
  return newQuests;
}

// console.log(imagesUrlResponse);

async function seedDatabase() {
  await seedItems();
  await seedQuests();
}

export async function connect() {
  try {
    await client.connect();
    await seedDatabase();
    process.on("SIGINT", exit);
  } catch (e) {
    console.log(e);
  }
}
