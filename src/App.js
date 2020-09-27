import React from "react";
import "./styles.css";
import useStelectableList from "./useSelectableList";

// const list = [
//   { name: "John A" },
//   { name: "John B" },
//   { name: "John C" },
//   { name: "John D" },
//   { name: "John E" },
//   { name: "John F" },
//   { name: "John G" }
// ];

const Item = ({ selected, name, email, onToggle }) => {
  return (
    <li
      style={{
        margin: 8,
        padding: 8,
        border: "1px solid lightgrey",
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <input
        type="checkbox"
        value={selected}
        checked={selected}
        onChange={onToggle}
      />
      <b>{name}</b>
      <span
        style={{
          maxWidth: 100,
          whiteSpace: "no-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}
      >
        {email}
      </span>
    </li>
  );
};

export default function App() {
  const {
    list,
    toggleItem,
    isAllSelected,
    toggleAll,
    forceSetList
  } = useStelectableList([], { identifierKey: "id" });

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((u) => forceSetList(u));
  }, [forceSetList]);

  return (
    <div className="App">
      <h1>useSelectableList</h1>
      <h2>A hook to make lists selectable!</h2>
      <h3>
        Select all:{" "}
        <input type="checkbox" checked={isAllSelected} onChange={toggleAll} />
      </h3>
      <ul
        style={{ display: "flex", flexDirection: "column", listStyle: "none" }}
      >
        {list.map(({ name, selected, email, id }, i) => (
          <Item
            key={`${i}-${name}`}
            name={name}
            email={email}
            selected={selected}
            onToggle={() => toggleItem(id)}
          />
        ))}
      </ul>
    </div>
  );
}
