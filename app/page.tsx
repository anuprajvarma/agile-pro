"use client";
import { Dialog, DialogPanel } from "@headlessui/react";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { RiArrowDropDownLine } from "react-icons/ri";

interface Todo {
  title: string;
  status: string;
  id: number | string;
  assignee: string;
  priority: string;
  dueDate: string;
}

export default function Home() {
  const TODO = "TODO";
  const IN_PROGRESS = "IN_PROGRESS";
  const DONE = "DONE";
  const [searchTerm, setSearchTerm] = useState("");
  const [isPriorityCheckOpen, setIsPriorityCheckOpen] = useState(false);
  const [isSearchCheckOpen, setIsSearchCheckOpen] = useState(false);
  const [dueDateFilter, setDueDateFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    status: "TODO",
    id: Math.floor(Math.random() * 1000), // Random ID for demo purposes
    assignee: "",
    priority: "medium",
    dueDate: "",
  });
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);
  const [tasks, setTasks] = useState<Todo[]>([
    {
      id: 1,
      title: "Do something nice for someone you care about",
      assignee: "User 152",
      status: "TODO",
      priority: "medium",
      dueDate: "2025-07-15",
    },
    {
      id: 2,
      title: "Memorize a poem",
      assignee: "User 13",
      status: "DONE",
      priority: "low",
      dueDate: "2025-07-06",
    },
    {
      id: 3,
      title: "Watch a classic movie",
      assignee: "User 68",
      status: "IN_PROGRESS",
      priority: "low",
      dueDate: "2025-07-09",
    },
    {
      id: 4,
      title: "Watch a documentary",
      assignee: "User 84",
      status: "TODO",
      priority: "medium",
      dueDate: "2025-07-12",
    },
    {
      id: 5,
      title: "Watch a gothic movie",
      assignee: "User 85",
      status: "TODO",
      priority: "high",
      dueDate: "2025-07-19",
    },
    {
      id: 7,
      title: "Solve a Rubik's cube",
      assignee: "User 76",
      status: "IN_PROGRESS",
      priority: "medium",
      dueDate: "2025-07-05",
    },
    {
      id: 8,
      title: "Bake pastries for yourself and neighbor",
      assignee: "User 198",
      status: "IN_PROGRESS",
      priority: "medium",
      dueDate: "2025-07-07",
    },
    {
      id: 9,
      title: "Write a thank you letter to an influential person",
      assignee: "User 9",
      status: "DONE",
      priority: "low",
      dueDate: "2025-07-04",
    },
  ]);

  const [dragTask, setDragTask] = useState<Todo | null>(null);

  const togglePriorityFilter = (priority: string) => {
    setPriorityFilter(
      (prev) =>
        prev.includes(priority)
          ? prev.filter((p) => p !== priority) // remove if already selected
          : [...prev, priority] // add if not selected
    );
  };

  const handleDragNDrop = (status: string) => {
    let copyTask = [...tasks];
    copyTask = copyTask.map((item) => {
      if (dragTask && item.id === dragTask.id) {
        if (dragTask.id === item.id) {
          item.status = status;
        }
      }
      return item;
    });
    setTasks(copyTask);
    setDragTask(null);
  };
  const handleDrag = (e: React.DragEvent<HTMLElement>, task: Todo) => {
    setDragTask(task);
  };
  const handleOnDrop = (e: React.DragEvent<HTMLElement>) => {
    const status = e.currentTarget.getAttribute("data-status");
    if (status === TODO) {
      handleDragNDrop(TODO);
    } else if (status === IN_PROGRESS) {
      handleDragNDrop(IN_PROGRESS);
    } else if (status === DONE) {
      handleDragNDrop(DONE);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log("name", name, "value", value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // Add the new task to the tasks array
    if (formData.title !== "" && formData.assignee !== "") {
      setTasks((prev) => [
        ...prev,
        {
          ...formData,
          id: Math.floor(Math.random() * 1000), // Generate a new random ID
        },
      ]);
    } else if (formData.title === "" || formData.assignee === "") {
      alert("Please fill in all fields before submitting.");
    }
    setIsOpen(false);
  };
  return (
    <div className="w-full h-full flex justify-center p-6 bg-[#191919]">
      <div className="w-full flex flex-col gap-4 items-center">
        <h1 className="text-center text-4xl">Agile Pro</h1>
        <div className="py-4 flex gap-4">
          <div className="flex flex-col gap-1 relative">
            <button
              onClick={() => {
                setIsSearchCheckOpen(!isSearchCheckOpen);
                setSearchTerm("");
              }}
              className={`flex items-center px-4 w-[6rem] h-[1.6rem] ${
                isSearchCheckOpen ? "bg-amber-200/10" : ""
              } text-center py-1 z-10 cursor-pointer rounded-xl border border-amber-200/50 text-xs hover:bg-amber-200/10 transition duration-300`}
            >
              <p>Search</p>
              <RiArrowDropDownLine className="text-xl" />
            </button>
            {isSearchCheckOpen && (
              <div className="flex absolute top-[2.2rem] left-0 z-50">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="text"
                  placeholder="Search tasks..."
                  className="px-4 py-2 flex rounded-xl border border-amber-200/50 bg-[#191919] text-xs focus:outline-none focus:border-amber-200 transition duration-300"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1 relative">
            <button
              onClick={() => {
                setIsPriorityCheckOpen(!isPriorityCheckOpen);
                setPriorityFilter([]);
              }}
              className={`px-4 w-[6rem] items-center h-[1.6rem] text-center py-1 z-10 flex cursor-pointer rounded-xl border border-amber-200/50 text-xs hover:bg-amber-200/10 ${
                isPriorityCheckOpen ? "bg-amber-200/10" : ""
              } transition duration-300`}
            >
              <p>priority</p>
              <RiArrowDropDownLine className="text-xl" />
            </button>

            {isPriorityCheckOpen && (
              <div className="absolute top-[2.2rem] left-0 z-50 bg-[#191919] shadow-md rounded-md p-2 flex flex-col gap-1 border border-amber-200/50">
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    onClick={() => togglePriorityFilter("low")}
                    className="px-4 py-1 rounded-xl border border-amber-200/50 text-xs bg-transparent focus:outline-none focus:border-amber-200 transition duration-300"
                  />
                  <p>low</p>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    onClick={() => togglePriorityFilter("medium")}
                    className="px-4 py-1 rounded-xl border border-amber-200/50 text-xs bg-transparent focus:outline-none focus:border-amber-200 transition duration-300"
                  />
                  <p>medium</p>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    onClick={() => togglePriorityFilter("high")}
                    className="px-4 py-1 rounded-xl border border-amber-200/50 text-xs bg-transparent focus:outline-none focus:border-amber-200 transition duration-300"
                  />
                  <p>high</p>
                </div>
              </div>
            )}
          </div>

          {/* <input
            type="date"
            value={dueDateFilter}
            onChange={(e) => setDueDateFilter(e.target.value)}
            className="px-2 py-1 h-[1.6rem] cursor-pointer rounded-xl appearance-none border border-amber-200/50 text-xs bg-transparent text-white focus:outline-none focus:border-amber-200 transition duration-300"
          /> */}
          <div className="relative w-fit">
            <input
              type="date"
              value={dueDateFilter}
              onChange={(e) => setDueDateFilter(e.target.value)}
              className="px-2 py-1 h-[1.6rem] cursor-pointer rounded-xl appearance-none border border-amber-200/50 text-xs bg-transparent text-white focus:outline-none focus:border-amber-200 transition duration-300"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3M16 7V3M4 11h16M4 19h16M4 15h16M4 7h16"
              />
            </svg>
          </div>
        </div>
        <div className="flex gap-4 justify-between">
          <div
            className="w-[20rem] flex flex-col gap-2"
            data-status={TODO}
            onDrop={handleOnDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <h2 className="p-4 bg-amber-200/50 text-white rounded mb-2">
              Todo
            </h2>
            <button
              onClick={() => setIsOpen(true)}
              className="border hover:bg-amber-200/10 transition duration-300 flex gap-2 items-center justify-center cursor-pointer w-full border-amber-200/50 p-2 rounded"
            >
              <p>Add Task</p>
              <FiPlus />
            </button>
            <>
              {/* <button onClick={() => setIsOpen(true)}>Open dialog</button> */}
              <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative"
              >
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                  <DialogPanel className="max-w-lg space-y-4 p-12 border border-amber-200/50 bg-[#191919] rounded">
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4"
                    >
                      <div className="flex gap-2">
                        <label htmlFor="name">Title:</label>
                        <input
                          className="border px-2 border-amber-200/50 bg-transparent text-white rounded outline-none focus:border-amber-200 transition duration-300"
                          type="text"
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="flex gap-2">
                        <label htmlFor="email">Assign:</label>
                        <input
                          className="border px-2 border-amber-200/50 bg-transparent text-white rounded outline-none focus:border-amber-200 transition duration-300"
                          type="text"
                          id="assignee"
                          name="assignee"
                          value={formData.assignee}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex gap-2">
                        <label htmlFor="email">Status:</label>
                        <select
                          id="status"
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                          className="border px-2 border-amber-200/50 bg-transparent rounded"
                        >
                          <option value={TODO}>Todo</option>
                          <option value={IN_PROGRESS}>In Progress</option>
                          <option value={DONE}>Done</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <label htmlFor="email">Priority:</label>
                        <select
                          id="priority"
                          name="priority"
                          value={formData.priority}
                          onChange={handleChange}
                          className="border px-2 border-amber-200/50 bg-transparent rounded"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <label htmlFor="email">dueDate:</label>
                        <input
                          type="date"
                          name="dueDate"
                          value={formData.dueDate}
                          onChange={handleChange}
                          className="px-2 py-1 h-[1.6rem] rounded-xl border border-amber-200/50 text-xs bg-transparent text-white focus:outline-none focus:border-amber-200 transition duration-300"
                        />
                      </div>

                      <button type="submit">Submit</button>
                    </form>
                  </DialogPanel>
                </div>
              </Dialog>
            </>
            {tasks
              .filter(
                (task) =>
                  task.status === TODO &&
                  task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                  (priorityFilter.length === 0 ||
                    priorityFilter.includes(task.priority)) &&
                  (dueDateFilter === "" ||
                    new Date(task.dueDate) <= new Date(dueDateFilter))
              )
              .map((task) => (
                <div
                  draggable
                  onDrag={(e) => handleDrag(e, task)}
                  key={task.id}
                  className="flex flex-col text-lg justify-between gap-2 p-4 bg-amber-100/50 text-black rounded mb-2 cursor-pointer"
                >
                  <p>{task.title}</p>
                  <p className="text-xs">{task.assignee}</p>
                  <div>
                    <span className="text-sm px-4 py-1 text-center rounded-full bg-amber-200/50">
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
          </div>
          <div
            className="w-[20rem]"
            data-status={IN_PROGRESS}
            onDrop={handleOnDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <h2 className="p-4 bg-blue-200/50 text-white rounded mb-2">
              In Progress
            </h2>
            {tasks
              .filter(
                (task) =>
                  task.status === IN_PROGRESS &&
                  task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                  (priorityFilter.length === 0 ||
                    priorityFilter.includes(task.priority)) &&
                  (dueDateFilter === "" ||
                    new Date(task.dueDate) <= new Date(dueDateFilter))
              )
              .map((task) => (
                <div
                  draggable
                  onDrag={(e) => handleDrag(e, task)}
                  key={task.id}
                  className="flex flex-col text-lg justify-between gap-2 p-4 bg-amber-100/50 text-black rounded mb-2 cursor-pointer"
                >
                  <p>{task.title}</p>
                  <p className="text-xs">{task.assignee}</p>
                  <div>
                    <span className="text-sm px-4 py-1 text-center rounded-full bg-amber-200/50">
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
          </div>
          <div
            className="w-[20rem]"
            data-status={DONE}
            onDrop={handleOnDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <h2 className="p-4 bg-green-200/50 text-white rounded mb-2">
              Done
            </h2>
            {tasks
              .filter(
                (task) =>
                  task.status === DONE &&
                  task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                  (priorityFilter.length === 0 ||
                    priorityFilter.includes(task.priority)) &&
                  (dueDateFilter === "" ||
                    new Date(task.dueDate) <= new Date(dueDateFilter))
              )
              .map((task) => (
                <div
                  draggable
                  onDrag={(e) => handleDrag(e, task)}
                  key={task.id}
                  className="flex flex-col text-lg justify-between gap-2 p-4 bg-amber-100/50 text-black rounded mb-2 cursor-pointer"
                >
                  <p>{task.title}</p>
                  <p className="text-xs">{task.assignee}</p>
                  <div>
                    <span className="text-sm px-4 py-1 text-center rounded-full bg-amber-200/50">
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
