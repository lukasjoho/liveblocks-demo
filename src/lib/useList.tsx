// @ts-nocheck
import { useState } from "react";
import { useMutation, useStorage } from "../../liveblocks.config";
import { Item } from "./types";
import { allItems, defaultItems } from "./data";

export default function useList() {
  //--- LOCAL REACT STATE HOOKS
  const [items, setItems] = useState([...defaultItems]);

  const addItem = (item: Item) => {
    setItems((items) => [item, ...items]);
  };

  const moveItem = (fromIndex: number, toIndex: number) => {
    setItems((items) => {
      const item = items[fromIndex];
      const newItems = [...items];
      newItems.splice(fromIndex, 1);
      newItems.splice(toIndex, 0, item);
      return newItems;
    });
  };

  const deleteItem = (id: string) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  //--- LIVEBLOCKS REALTIME HOOKS (JUST REPLACE)---

  // const items = useStorage((root) => root.items);

  // const addItem = useMutation(
  //   ({ storage }, item: Item) => {
  //     const mutableItems = storage.get("items");
  //     mutableItems.insert(item, 0);
  //   },
  //   [items]
  // );

  // const moveItem = useMutation(
  //   ({ storage }, fromIndex: number, toIndex: number) => {
  //     const mutableItems = storage.get("items");
  //     const item = mutableItems.get(fromIndex);
  //     mutableItems.delete(fromIndex);
  //     mutableItems.insert(item, toIndex);
  //   },
  //   [items]
  // );

  // const deleteItem = useMutation(
  //  ({ storage }, id: string) => {
  //   const mutableItems = storage.get("items");
  //   const index = mutableItems.findIndex((item) => item.id === id);
  //   mutableItems.delete(index);
  // },
  // [items]
  // );

  return {
    items,
    addItem,
    moveItem,
    deleteItem,
  };
}
