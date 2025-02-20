import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import useAxiosPublic from "../../hooks/useAxiosPublic";

// WebSocket URL
const WEBSOCKET_URL = "ws://localhost:5000"; // Replace with your WebSocket server URL
const Tasks = () => {
  const axiosPublic = useAxiosPublic();
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
  const [socket, setSocket] = useState(null);

  // Fetch tasks from the server when the app loads
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axiosPublic(`/tasks`);
      console.log(response);
      setTasks(response.data); // Ensure the backend provides the data in the format { todo: [], inProgress: [], done: [] }
    };

    fetchTasks();
  }, [axiosPublic]);

  // Initialize WebSocket connection
  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onopen = () => {
      console.log("WebSocket connection established");
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const { type, payload } = JSON.parse(event.data);
      if (type === "UPDATE_TASKS") {
        setTasks(payload);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, []);

  // Handle drag-and-drop functionality
  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = source.droppableId;
    const destinationColumn = destination.droppableId;

    let updatedTasks = { ...tasks };

    if (sourceColumn === destinationColumn) {
      const items = [...tasks[sourceColumn]];
      const [movedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, movedItem);
      updatedTasks[sourceColumn] = items;
    } else {
      const sourceItems = [...tasks[sourceColumn]];
      const destinationItems = [...tasks[destinationColumn]];

      const [movedItem] = sourceItems.splice(source.index, 1);
      destinationItems.splice(destination.index, 0, movedItem);

      updatedTasks[sourceColumn] = sourceItems;
      updatedTasks[destinationColumn] = destinationItems;
    }

    setTasks(updatedTasks);

    // Notify the server of the changes
    socket?.send(
      JSON.stringify({ type: "UPDATE_TASKS", payload: updatedTasks })
    );

    // Optionally persist changes to the database via API
    await fetch(`${API_URL}/tasks`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTasks),
    });
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
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-3 border rounded-lg shadow-sm cursor-grab"
                      >
                        {item.title}
                        <button
                          className="text-red-500 ml-4"
                          onClick={async () => {
                            // Delete task
                            const updatedTasks = {
                              ...tasks,
                              [column]: tasks[column].filter(
                                (task) => task.id !== item.id
                              ),
                            };
                            setTasks(updatedTasks);

                            // Notify server via WebSocket
                            socket?.send(
                              JSON.stringify({
                                type: "UPDATE_TASKS",
                                payload: updatedTasks,
                              })
                            );

                            // Delete task from the database
                            await fetch(`${API_URL}/task/${item.id}`, {
                              method: "DELETE",
                            });
                          }}
                        >
                          Delete
                        </button>
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
