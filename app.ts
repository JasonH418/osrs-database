import "dotenv/config";
import express, { Express, Request, Response } from "express";
import { Item, Quest } from "./types";
import {
  connect, getItemById,
  getItems, getQuestById,
  getQuests,
  seedItems,
  updateItemImages,
} from "./database";

// Init vars
const PORT: number = Number(process.env.PORT) || 3000;

// Express config
const app: Express = express();
app.set("port", PORT);
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const items: Item[] = await getItems();
  const quests: Quest[] = await getQuests();
  res.render("index", { items, quests });
});

app.get("/item/:id", async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const item: Item | null = await getItemById(id);
  res.render("item", { item });
});

app.get("/quest/:id", async (req, res) => {
  const id = req.params.id;
  const quest: Quest | null = await getQuestById(id);
  res.render("")

});

// app.post("")

app.listen(app.get("port"), async () => {
  await connect();
  console.log(`Connected successfully at server: ${app.get("port")}`);
});
