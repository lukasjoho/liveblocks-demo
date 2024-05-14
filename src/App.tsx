import { RoomProvider } from "../liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import Room from "./components/Room";
import { LiveList } from "@liveblocks/client";
function App() {
  return (
    <RoomProvider
      id="my-room"
      initialPresence={{
        itemId: null,
      }}
      initialStorage={{
        items: new LiveList([
          {
            id: "1",
            name: "Item 1",
            color: "#fca5a5",
          },
        ]),
      }}
    >
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        {() => <Room />}
      </ClientSideSuspense>
    </RoomProvider>
  );
}

export default App;
