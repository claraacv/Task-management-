"use client";

import { useEffect, useState } from "react";
import { CoursePopup } from "@/components/modal/CoursePopup";
import { allColors, colorMap, ColorKey } from "@/lib/colorMap";
import { Plus } from "lucide-react";
import StateComp from "@/components/kanban/StateComp";
import type { Task, State, Course } from "@/app/types";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [state, setState] = useState("");
  const [showState, setShowState] = useState(false);
  const [createCourse, setCreateCourse] = useState(false);
  const [course, setCourse] = useState("");
  const [newTask, setNewTask] = useState<number | null>(null);
  const [task, setTask] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedColor, setSelectedColor] = useState<ColorKey>("default");
  const previewColors = colorMap[selectedColor];

  async function addTask(idState: number) {
    try {
      if (task == "") {
        setNewTask(idState);
        return;
      }

      if (!task) return;

      const response = await fetch("/api/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: task,
          stateId: idState,
          courseId: selectedCourse,
        }),
      });

      setNewTask(null);
      setTask("");
      setSelectedCourse("");

      await fetchStates();
      await fetchTasks();
      await fetchCourses();
    } catch (err) {
      console.log("There was an error " + err);
    }
  }

  async function createState() {
    try {
      if (!state) return;

      const response = await fetch("/api/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: state, color: selectedColor }),
      });

      console.log(response);

      setShowState(!showState);

      fetchStates();
      fetchTasks();
      fetchCourses();
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchStates() {
    try {
      const response = await fetch("/api/state");
      if (!response.ok) throw new Error("Failed to fetch states");
      const data = await response.json();
      console.log(data);
      setStates(data);
    } catch (err) {
      if (err instanceof Error) {
        console.log("There was an error " + err);
      } else {
        console.log("An unkown error ocurred");
      }
    }
  }

  async function fetchTasks() {
    try {
      const response = await fetch("/api/activity");
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      console.log(data);
      setTasks(data);
    } catch (err) {
      if (err instanceof Error) {
        console.log("There was an error " + err);
      } else {
        console.log("An unkown error ocurred");
      }
    }
  }

  async function fetchCourses() {
    try {
      const response = await fetch("/api/course");
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      console.log(data);
      setCourses(data);
    } catch (err) {
      if (err instanceof Error) {
        console.log("There was an error " + err);
      } else {
        console.log("An unkown error ocurred");
      }
    }
  }

  useEffect(() => {
    fetchStates();
    fetchTasks();
    fetchCourses();
  }, []);

  return (
    <div className="p-5">
      <div className="flex gap-5 overflow-x-auto items-start">
        <StateComp
          states={states}
          tasks={tasks}
          newTask={newTask}
          task={task}
          setTask={setTask}
          courses={courses}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          addTask={addTask}
        />
        <div
          onClick={() => setShowState(!showState)}
          className="bg-[#0A3E41] p-3 w-[320px] cursor-pointer shrink-0 items-center rounded-xl text-white font-bold flex flex-row"
        >
          <Plus className="font-bold mr-2"></Plus>
          Adicionar novo estado
        </div>
      </div>
      <div className="text-white mt-5">
        <h3 className="font-bold">Matérias escolares</h3>
        <div className="flex flex-row flex-wrap gap-5 mt-3 items-start">
          {courses.map((course) => {
            const colors = colorMap[course.color];
            return (
              <div
                key={course.id}
                className={`${colors.course} p-3 rounded-sm font-bold w-[320px]`}
              >
                <p>{course.title}</p>
              </div>
            );
          })}
          {createCourse && (
            <CoursePopup
              onCancel={() => setCreateCourse(false)}
              onCreate={() => {
                fetchCourses();
                setCreateCourse(!createCourse);
              }}
            ></CoursePopup>
          )}
          <div
            onClick={() => setCreateCourse(!createCourse)}
            className="bg-[#0A3E41] p-3 w-[320px] cursor-pointer items-center rounded-xl text-white font-bold flex flex-row"
          >
            <Plus className="font-bold mr-2"></Plus>
            Adicionar nova matéria
          </div>
        </div>
      </div>
    </div>
  );
}
