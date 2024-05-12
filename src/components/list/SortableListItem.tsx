import { useSortable } from "@dnd-kit/sortable";
import ListItem, { ListItemProps } from "./ListItem";
import { CSS } from "@dnd-kit/utilities";

interface SortableListItemProps extends ListItemProps {}

function SortableListItem({ item, deleteItem, style }: SortableListItemProps) {
  const { id } = item;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });
  const transformStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.15 : 1,
  };

  return (
    <ListItem
      deleteItem={deleteItem}
      isDragging={isDragging}
      item={item}
      ref={setNodeRef}
      style={{
        ...style,
        ...transformStyle,
      }}
      {...attributes}
      {...listeners}
    />
  );
}

export default SortableListItem;
