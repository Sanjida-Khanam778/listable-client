import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaSave, FaTimes } from "react-icons/fa";
// import useTheme from "../../hooks/useTheme";

const Tasks = () => {
  // const {theme} = useTheme()
  const axiosPublic = useAxiosPublic();
  const [tasks, setTasks] = useState({});

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  useEffect(() => {
    axiosPublic.get("/tasks").then((res) => {
      const data = res.data;
      setTasks({
        todo: data.todo.sort((a, b) => a.order - b.order) || [],
        inProgress: data.inProgress.sort((a, b) => a.order - b.order) || [],
        done: data.done.sort((a, b) => a.order - b.order) || [],
      });
    });
  }, [axiosPublic]);

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumn = source.droppableId;
    const destinationColumn = destination.droppableId;
    const movedItem = tasks[sourceColumn][source.index];

    if (sourceColumn === destinationColumn) {
      const updatedTasks = [...tasks[sourceColumn]];
      updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, movedItem);

      setTasks((prev) => ({
        ...prev,
        [sourceColumn]: updatedTasks,
      }));

      await Promise.all(
        updatedTasks.map((task, index) =>
          axiosPublic.put(`/tasks/modify/${task._id}`, {
            category: sourceColumn,
            order: index,
          })
        )
      );
    } else {
      const sourceTasks = [...tasks[sourceColumn]];
      const destinationTasks = [...tasks[destinationColumn]];

      const [movedItem] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, movedItem);

      setTasks((prev) => ({
        ...prev,
        [sourceColumn]: sourceTasks,
        [destinationColumn]: destinationTasks,
      }));

      await Promise.all([
        ...sourceTasks.map((task, index) =>
          axiosPublic.put(`/tasks/modify/${task._id}`, {
            category: sourceColumn,
            order: index,
          })
        ),
        ...destinationTasks.map((task, index) =>
          axiosPublic.put(`/tasks/modify/${task._id}`, {
            category: destinationColumn,
            order: index,
          })
        ),
      ]);
    }
  };

  const handleEditToggle = (column, itemId) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [column]: prevTasks[column].map((task) =>
        task._id === itemId ? { ...task, isEditing: !task.isEditing } : task
      ),
    }));
  };

  const handleSaveEdit = async (column, itemId, updatedTask) => {
    try {
      await axiosPublic.put(`/tasks/${itemId}`, updatedTask);
      setTasks((prevTasks) => ({
        ...prevTasks,
        [column]: prevTasks[column].map((task) =>
          task._id === itemId
            ? { ...task, ...updatedTask, isEditing: false }
            : task
        ),
      }));
    } catch (error) {
      console.error("Failed to save task:", error.message);
      alert("Failed to save changes");
    }
  };

  const handleDelete = async (itemId, column) => {
    try {
      const response = await axiosPublic.delete(`/tasks/${itemId}`);
      console.log(response.data.message);

      setTasks((prevTasks) => ({
        ...prevTasks,
        [column]: prevTasks[column].filter((item) => item._id !== itemId),
      }));
    } catch (error) {
      console.error(
        "Failed to delete task:",
        error.response?.data?.error || error.message
      );
      alert(error.response?.data?.error || "Something went wrong");
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {Object.entries(tasks).map(([column, items]) => (
          <Droppable key={column} droppableId={column}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="border rounded-md p-4"
              >
                <h2 className="text-lg font-bold mb-4 capitalize">{column}</h2>
                {items.map((item, index) => (
                  <Draggable key={item._id} draggableId={item._id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`p-4 border rounded-md mb-3 ${
                          isOverdue(item.dueDate) ? "border border-red-500 " : ""
                        } `}
                      >
                        {/*  */}
                        {item.isEditing ? (
                          <div className="space-y-2">
                            <input
                              type="text"
                              defaultValue={item.title}
                              className="w-full border px-3 py-2 rounded-lg"
                              onChange={(e) =>
                                (item.title = e.target.value)
                              }
                            />
                            <textarea
                              defaultValue={item.description}
                              className="w-full border px-3 py-2 rounded-lg"
                              rows="3"
                              onChange={(e) =>
                                (item.description = e.target.value)
                              }
                            ></textarea>
                            <div className="flex justify-end gap-2">
                              <button
                                className="bg-green-500 cursor-pointer text-white px-3 py-1 rounded-lg hover:bg-green-600"
                                onClick={() =>
                                  handleSaveEdit(column, item._id, {
                                    title: item.title,
                                    description: item.description,
                                  })
                                }
                              >
                                <FaSave className="text-sm" /> Save
                              </button>
                              <button
                                className="bg-gray-500 cursor-pointer text-white px-3 py-1 rounded-lg hover:bg-gray-600"
                                onClick={() => handleEditToggle(column, item._id)}
                              >
                                <FaTimes className="text-sm" /> Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="flex justify-between items-center">
                              <p className={` font-medium ${
                          isOverdue(item.dueDate) ? " w-full rounded-xs px-2 text-white bg-red-500" : "w-full px-2 text-white rounded-xs bg-primary-dark"
                        }`}>{item.title}</p>
                             
                            </div>
                            <p className={`mt-2 text-sm `}>{item.description}</p>
                            {/* <p className="text-xs">
                              Due Date: {new Date(item.dueDate).toLocaleDateString()}
                            </p> */}
                            <p className="mt-2 text-xs text-gray-500">
                              {formatTimestamp(item.timestamp)}
                            </p>
                          </div>
                        )}
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
