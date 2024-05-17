import React from "react";
import { useOthersMapped, useSelf } from "../../../liveblocks.config";
import { COLORS } from "../../lib/constants";
import Icons from "../icons";

const Avatars = React.memo(function Avatars() {
  const me = useSelf();
  const users = useOthersMapped((others) => others);
  return (
    <div className="avatars">
      {users.slice(0, 3).map(([connectionId]) => {
        return (
          <Avatar key={connectionId} connectionId={connectionId}>
            <Icons.user style={{ width: 20, height: 20 }} />
          </Avatar>
        );
      })}
      {me && <Avatar connectionId={me.connectionId}>You</Avatar>}
    </div>
  );
});

export default Avatars;

function Avatar({
  children,
  connectionId,
}: {
  children: React.ReactNode;
  connectionId: number;
}) {
  return (
    <div
      className="avatar"
      key={connectionId}
      style={{
        border: `2px solid ${COLORS[connectionId % COLORS.length]}`,
      }}
    >
      {children}
    </div>
  );
}
