import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./App.css";
import { useEffect, useState } from "react";

const data = [
  {
    id: "item-1",
    content: "Item-1",
  },
  {
    id: "item-2",
    content: "Item-2",
  },
  {
    id: "item-3",
    content: "Item-3",
  },
  {
    id: "item-4",
    content: "Item-4",
  },
];

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const getListStyle = (isDragginOver) => ({
  background: isDragginOver ? "lightblue" : "lightgrey",
  padding: 8,
  height: 500,
  width: 250,
});

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(data);
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination
    );

    console.log(reorder);
    setItems(reorderedItems);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppabledId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDragginOver)}
            ></div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default App;
