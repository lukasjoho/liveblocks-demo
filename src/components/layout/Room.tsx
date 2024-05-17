import Avatars from "./Avatars";
import Icons from "../icons";
import List from "../list/List";

export default function Room() {
  return (
    <div>
      <div className="header">
        <h1 className="header-title">
          <Icons.liveblocksIcon style={{ width: 32, height: 32 }} />
          Liveblocks Demo
        </h1>
        <Avatars />
      </div>
      <div className="container">
        <List />
      </div>
    </div>
  );
}
