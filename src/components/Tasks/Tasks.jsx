import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Tasks = () => {
  const axiosPublic = useAxiosPublic();
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    axiosPublic.get("/tasks").then((res) => {
      const data = res.data;
      setTasks({
        todo: data.todo || [],
        inProgress: data.inProgress || [],
        done: data.done || [],
      });
    });
  }, [axiosPublic]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If no destination, exit
    if (!destination) return;
    const sourceColumn = source.droppableId;
    const destinationColumn = destination.droppableId;

    if (sourceColumn === destinationColumn) {
      const items = Array.from(tasks[sourceColumn]);
      console.log(items)
      const [movedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, movedItem);

      setTasks((prevTasks) => ({
        ...prevTasks,
        [sourceColumn]: items,
      }));

      axiosPublic.put(`/tasks/modify/${movedItem._id}`, {
        category: destinationColumn,
        order: destination.index,
      });
    } else {
      const sourceItems = Array.from(tasks[sourceColumn]);
      const destinationItems = Array.from(tasks[destinationColumn]);

      const [movedItem] = sourceItems.splice(source.index, 1);
      destinationItems.splice(destination.index, 0, movedItem);

      setTasks((prevTasks) => ({
        ...prevTasks,
        [sourceColumn]: sourceItems,
        [destinationColumn]: destinationItems,
      }));

      axiosPublic.put(`/tasks/modify/${movedItem._id}`, {
        category: destinationColumn,
        order: destination.index,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-4 p-4">
        {Object.entries(tasks).map(([column, items]) => (
          <Droppable key={column} droppableId={column}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="border rounded-lg p-4"
              >
                <h2 className="text-lg font-bold mb-4 capitalize">{column}</h2>
                {items.map((item, index) => (
                  <Draggable
                    key={item._id}
                    draggableId={item._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-3 border rounded-lg shadow-sm cursor-grab"
                      >
                        <p> {item.title}</p>
                        <p>{item.description}</p>
                       
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Tasks;
