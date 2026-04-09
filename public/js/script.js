const itemsButton = document.querySelector(".nav-list-item-items");
const questsButton = document.querySelector(".nav-list-item-quests");
const items = document.querySelector(".items");
const quests = document.querySelector(".quests");

const showSection = (active, inactive) => {
  active.classList.remove("hide");
  inactive.classList.add("hide");
};

itemsButton.addEventListener("click", () => showSection(items, quests));

questsButton.addEventListener("click", () => {
  showSection(quests, items);
});

// Search

