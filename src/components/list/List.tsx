import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import Icons from "../icons";
import { useState } from "react";
import { allItems } from "./data";
import { Item } from "./types";
import ListItem from "./ListItem";
import SortableListItem from "./SortableListItem";
import { useUpdateMyPresence } from "../../../liveblocks.config";
import useList from "./useList";

export default function List() {
  const updateMyPresence = useUpdateMyPresence();
  const [activeItem, setActiveItem] = useState<Item | null>(null);
  const { items, addItem, deleteItem, moveItem } = useList();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveItem(items.find((item) => item.id === active.id) || null);
    updateMyPresence({ itemId: String(active.id) });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      moveItem(
        items.findIndex((item) => item.id === active.id),
        items.findIndex((item) => item.id === over!.id)
      );
    }
    setActiveItem(null);
    updateMyPresence({ itemId: null });
  }

  const handleAdd = () => {
    const itemToAdd = allItems.find(
      (item) => !items.some((i) => i.id === item.id)
    );
    if (!itemToAdd) return;
    addItem(itemToAdd);
  };

  return (
    <DndContext
      modifiers={[restrictToVerticalAxis]}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items as Item[]}
        strategy={verticalListSortingStrategy}
      >
        <div className="list">
          <div className="list-header">
            <h2>Item List</h2>
            <p>Add, remove and sort items by dragging.</p>
          </div>
          <button
            className="add-button"
            onClick={handleAdd}
            disabled={items.length === allItems.length}
          >
            <Icons.plusCircle style={{ width: 20 }} />
            Add Item
          </button>
          <ul className="list-items">
            {items.map((item) => (
              <SortableListItem
                isDragging={false}
                key={item.id}
                item={item}
                deleteItem={deleteItem}
                style={{
                  boxShadow: "none",
                }}
              />
            ))}
          </ul>
        </div>
      </SortableContext>
      <DragOverlay>
        {activeItem ? (
          <ListItem
            key={`${activeItem.id}-drag-overlay`}
            style={{ zIndex: 10, boxShadow: "0 0 16px rgba(0,0,0,0.2)" }}
            item={activeItem}
            isDragging={true}
            deleteItem={deleteItem}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
