import { forwardRef } from "react";
import { Item } from "./types";
import { AnimatePresence, motion } from "framer-motion";
import Icons from "../icons";
import { useOthers } from "../../../liveblocks.config";
import { COLORS } from "../../constants";

export interface ListItemProps {
  item: Item;
  isDragging: boolean;
  deleteItem: (id: string) => void;
  style?: React.CSSProperties;
}

const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ item, isDragging, deleteItem, ...props }, ref) => {
    const users = useOthers();
    return (
      <motion.li
        id={item.id}
        ref={ref}
        className="list-item"
        layoutId={item.id}
        {...props}
      >
        <AnimatePresence>
          {users.map(({ connectionId, presence }) => {
            if (presence.itemId == item.id) {
              return (
                <motion.div
                  className="list-item-selection"
                  style={{
                    background: COLORS[connectionId % COLORS.length] + "75",
                  }}
                  key={item.id + connectionId}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 1 },
                  }}
                />
              );
            }
          })}
        </AnimatePresence>
        <div className="list-item-inner">
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
        </div>
      </motion.li>
    );
  }
);

export default ListItem;
