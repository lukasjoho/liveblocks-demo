import { useState } from "react";
import { allItems, defaultItems } from "./data";

export default function useReactList() {
  const [items, setItems] = useState([...defaultItems]);

  const moveItem = (id: string, toIndex: number) => {
    setItems((items) => {
      const fromIndex = items.findIndex((item) => item.id === id);
      const item = items[fromIndex];
      const newItems = [...items];
      newItems.splice(fromIndex, 1);
      newItems.splice(toIndex, 0, item);
      return newItems;
    });
  };

  const addItem = () => {
    const itemToAdd = allItems.find(
      (item) => !items.some((i) => i.id === item.id)
    );
    if (itemToAdd) {
      setItems((items) => [itemToAdd, ...items]);
    }
  };

  const deleteItem = (id: string) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  return {
    items,
    addItem,
    deleteItem,
    moveItem,
  };
}
