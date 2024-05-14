import Avatars from "./Avatars";
import Icons from "./icons";
import List from "./list/List";

export default function Room() {
  return (
    <div>
      <div className="header">
        <div className="header-title">
          <Icons.liveblocksIcon style={{ width: 24, height: 24 }} />
          <h1 className="header-title">Liveblocks Realtime Demo</h1>
        </div>
        <Avatars />
      </div>
      <div className="container">
        <List />
      </div>
    </div>
  );
}
