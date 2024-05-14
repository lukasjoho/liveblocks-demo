import { useMutation, useStorage } from "../../../liveblocks.config";
import { Item } from "./types";

export default function useList() {
  const items = useStorage((root) => root.items);

  const addItem = useMutation(
    ({ storage }, item: Item) => {
      const mutableItems = storage.get("items");
      mutableItems.insert(item, 0);
    },
    [items]
  );

  const deleteItem = useMutation(
    ({ storage }, id: string) => {
      const mutableItems = storage.get("items");
      const index = mutableItems.findIndex((item) => item.id === id);
      mutableItems.delete(index);
    },
    [items]
  );

  const moveItem = useMutation(
    ({ storage }, fromIndex: number, toIndex: number) => {
      const mutableItems = storage.get("items");
      const item = mutableItems.get(fromIndex);
      if (!item) return;
      mutableItems.delete(fromIndex);
      mutableItems.insert(item, toIndex);
    },
    [items]
  );

  return {
    items,
    addItem,
    deleteItem,
    moveItem,
  };
}
