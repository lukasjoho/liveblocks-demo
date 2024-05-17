import Avatars from "./Avatars";
import List from "./list/List";

export default function Room() {
  return (
    <div>
      <div className="header">
        <Avatars />
      </div>
      <div className="container">
        <List />
      </div>
    </div>
  );
}
