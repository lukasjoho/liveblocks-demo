import { Item } from "./types";

export const allItems: Item[] = [
  {
    id: "1",
    name: "Item 1",
    color: "#fca5a5",
  },
  {
    id: "2",
    name: "Item 2",
    color: "#fcd34d",
  },
  {
    id: "3",
    name: "Item 3",
    color: "#bef264",
  },
  {
    id: "4",
    name: "Item 4",
    color: "#5eead4",
  },
  {
    id: "5",
    name: "Item 5",
    color: "#93c5fd",
  },
  {
    id: "6",
    name: "Item 6",
    color: "#d8b4fe",
  },
  {
    id: "7",
    name: "Item 7",
    color: "#f9a8d4",
  },
];
//include last 3 items of allItems in defaultItems for any possible length of the array
export const defaultItems: Item[] = allItems.slice(0, 3).reverse();
