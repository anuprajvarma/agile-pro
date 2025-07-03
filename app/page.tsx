"use client";
import React, { useState } from "react";

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
      title: "Invest in cryptocurrency",
      assignee: "User 163",
      status: "TODO",
      priority: "high",
      dueDate: "2025-07-20",
    },
    {
      id: 6,
      title: "Contribute code or a donation to open-source software",
      assignee: "User 69",
      status: "TODO",
      priority: "high",
      dueDate: "2025-07-14",
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
      title: "Go see a Broadway production",
      assignee: "User 7",
      status: "TODO",
      priority: "high",
      dueDate: "2025-07-16",
    },
    {
      id: 10,
      title: "Write a thank you letter to an influential person",
      assignee: "User 9",
      status: "DONE",
      priority: "low",
      dueDate: "2025-07-04",
    },
  ]);

  const [dragTask, setDragTask] = useState<Todo | null>(null);

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
  return (
    <div className="w-screen h-screen flex justify-center p-6 bg-[#191919]">
      <div className="w-full flex flex-col gap-4 items-center z-10">
        <h1 className="text-center text-4xl">drap and drop</h1>
        <div className="py-4 flex gap-4 z-10">
          <div className="flex flex-col gap-1">
            <button className="px-4 w-[5rem] h-[1.6rem] text-center py-1 cursor-pointer rounded-xl border border-amber-200/50 text-xs hover:bg-amber-200/10 transition duration-300">
              Search
            </button>
            <div className="flex z-30">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search tasks..."
                className="px-4 py-1 flex rounded-xl border border-amber-200/50 text-xs bg-transparent focus:outline-none focus:border-amber-200 transition duration-300"
              />
            </div>
          </div>
          <button className="px-4 w-[5rem] h-[1.6rem] text-center py-1 z-10 flex cursor-pointer rounded-xl border border-amber-200/50 text-xs hover:bg-amber-200/10 transition duration-300">
            Priority
          </button>
          <button className="px-4 w-[5rem] h-[1.6rem] text-center py-1 z-10 flex cursor-pointer rounded-xl border border-amber-200/50 text-xs hover:bg-amber-200/10 transition duration-300">
            date
          </button>
        </div>
        <div className="flex gap-4 justify-between text-center">
          <div
            className="w-[20rem]"
            data-status={TODO}
            onDrop={handleOnDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <h2 className="p-4 bg-amber-200/50 text-white rounded mb-2">
              Todo
            </h2>
            {tasks
              .filter(
                (task) =>
                  task.status === TODO &&
                  task.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((task) => (
                <div
                  draggable
                  onDrag={(e) => handleDrag(e, task)}
                  key={task.id}
                  className="flex justify-between gap-2 p-4 bg-amber-100/50 text-black rounded mb-2 cursor-pointer"
                >
                  <p>{task.title}</p>
                  <div className="flex gap-2">
                    <button>edit</button>
                    <button>delete</button>
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
                  task.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((task) => (
                <div
                  draggable
                  onDrag={(e) => handleDrag(e, task)}
                  key={task.id}
                  className="flex justify-between gap-2 p-4 bg-amber-100/50 text-black rounded mb-2 cursor-pointer"
                >
                  <p>{task.title}</p>
                  <div className="flex gap-2">
                    <button>edit</button>
                    <button>delete</button>
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
                  task.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((task) => (
                <div
                  draggable
                  onDrag={(e) => handleDrag(e, task)}
                  key={task.id}
                  className="flex justify-between gap-2 p-4 bg-amber-100/50 text-black rounded mb-2 cursor-pointer"
                >
                  <p>{task.title}</p>
                  <div className="flex gap-2">
                    <button>edit</button>
                    <button>delete</button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
