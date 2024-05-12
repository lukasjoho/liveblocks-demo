import { forwardRef } from "react";
import { Item } from "./types";
import { motion } from "framer-motion";
import Icons from "../icons";

export interface ListItemProps {
  item: Item;
  isDragging: boolean;
  deleteItem: (id: string) => void;
  style?: React.CSSProperties;
}

const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ item, isDragging, deleteItem, ...props }, ref) => {
    return (
      <motion.li ref={ref} className="list-item" layoutId={item.id} {...props}>
        <div
          className="list-item-bar"
          style={{
            background: item.color,
          }}
        />
        {item.name}
        <button className="delete-button" onClick={() => deleteItem(item.id)}>
          <Icons.trash style={{ width: 16 }} />
        </button>
      </motion.li>
    );
  }
);

export default ListItem;
