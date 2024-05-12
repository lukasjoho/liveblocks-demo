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
import useList from "./useList";
import { Item } from "./types";
import ListItem from "./ListItem";
import SortableListItem from "./SortableListItem";

export default function List() {
  const [activeItem, setActiveItem] = useState<Item | null>(null);
  const { items, addItem, moveItem, deleteItem } = useList();
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
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      moveItem(
        String(active.id),
        items.findIndex((item) => item.id === over!.id)
      );
    }
    setActiveItem(null);
  }

  return (
    <DndContext
      modifiers={[restrictToVerticalAxis]}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="list">
          <button
            className="add-button"
            onClick={() => addItem()}
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
