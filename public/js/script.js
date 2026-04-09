const itemsButton = document.getElementById("itemButton")
const questsButton = document.getElementById("questButton");
const items = document.getElementById("items");
const quests = document.getElementById("quests");

const showSection = (active, inactive) => {
  active.classList.remove("hidden");
  inactive.classList.add("hidden");
};

itemsButton.addEventListener("click", () => showSection(items, quests));

questsButton.addEventListener("click", () => {
  showSection(quests, items);
});

// Search

