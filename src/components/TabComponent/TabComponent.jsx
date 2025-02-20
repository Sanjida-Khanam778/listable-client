import { useState } from "react";
import Tasks from "../Tasks/Tasks";
import AddTaskForm from "../AddTaskForm/AddTaskForm";

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState("todo"); // State to track the active tab

  return (
    <div className="w-full mt-16">
      <div className="relative right-0">
        {/* Tab Buttons */}
        <ul className="relative flex flex-wrap px-1.5 py-1.5 list-none rounded-md border w-1/2 mx-auto" role="list">
          <li className="z-30 flex-auto text-center">
            <button
              className={`z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer ${
                activeTab === "todo" ? " bg-primary-dark text-white" : " bg-inherit"
              }`}
              onClick={() => setActiveTab("todo")}
            >
              Todo
            </button>
          </li>
          <li className="z-30 flex-auto text-center">
            <button
              className={`z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer ${
                activeTab === "add" ? "text-white bg-primary-dark" : " bg-inherit"
              }`}
              onClick={() => setActiveTab("add")}
            >
              Add Task
            </button>
          </li>
       
        </ul>

        {/* Tab Content */}
        <div className="p-5">
          {activeTab === "todo" && (
            <div id="todo" role="tabpanel">
             <Tasks></Tasks>
            </div>
          )}
          {activeTab === "add" && (
            <div id="add" role="tabpanel">
             <AddTaskForm></AddTaskForm>
            </div>
          )}
         
        </div>
      </div>
    </div>
  );
};

export default TabComponent;
