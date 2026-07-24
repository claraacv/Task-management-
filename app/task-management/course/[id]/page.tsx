"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Task, Course, State } from "@/app/types";
import StateComp from "@/components/kanban/StateComp";

export default function TasksPerCourse() {
  const [states, setStates] = useState<State[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<number | null>(null);
  const [task, setTask] = useState("");
  const params = useParams();
  const id = params.id;
  const [course, setCourse] = useState<Course | null>(null);

  async function fetchStates() {
    try {
      const states = await fetch(`/api/state`, {});
      setStates(await states.json());
    } catch (err) {
      console.log("There was an error " + err);
    }
  }

  async function fetchTasks() {
    try {
      console.log(params);
      console.log(id);
      const tasks = await fetch(`/api/activity?courseId=${id}`, {});
      setTasks(await tasks.json());
    } catch (err) {}
  }

  async function addTask(stateId: number) {
    if (task === "") {
      setNewTask(stateId);
      return;
    }

    await fetch("/api/activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task,
        stateId,
        courseId: Number(id),
      }),
    });

    setTask("");
    setNewTask(null);
    fetchTasks();
  }

  async function getCourse() {
    try {
      const response = await fetch(`/api/course/${id}`);
      setCourse(await response.json());
    } catch (err) {}
  }

  useEffect(() => {
    getCourse();
    fetchStates();
    fetchTasks();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold">{course?.title}</h1>
      <div className="lg:grid lg:grid-cols-2 xl:gap-3 xl:grid-cols-3">
      <StateComp
        tasks={tasks}
        states={states}
        showCourseSelect={false}
        newTask={newTask}
        task={task}
        setTask={setTask}
        addTask={addTask}
      ></StateComp>
    </div>
    </div>
  );
}
