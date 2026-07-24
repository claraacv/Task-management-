"use client";

import { colorMap, ColorKey } from "@/lib/colorMap";
import type { Task, State, Course } from "@/app/types";

type Props = {
  states: State[];
  tasks: Task[];
  newTask: number | null;
  task: string;
  setTask: (value: string) => void;
  courses?: Course[];
  selectedCourse?: string;
  setSelectedCourse?: (value: string) => void;
  addTask: (id: number) => void;
  showCourseSelect?: boolean;
};

export default function StateComp({
  states,
  tasks,
  newTask,
  task,
  setTask,
  courses = [],
  selectedCourse,
  setSelectedCourse,
  addTask,
  showCourseSelect = true,
}: Props) {
  return (
    <>
      {states.map((state) => {
        const colors = colorMap[state.color];

        return (
          <div
            key={state.id}
            className={`flex flex-col w-[320px] shrink-0 ${colors.bg} rounded-lg max-h-screen shadow-lg text-white mb-3`}
          >
            <div
              className={`flex justify-center p-3 border-b-3 ${colors.border}`}
            >
              <h2>{state.name}</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
              {tasks
                .filter((task) => task.stateId === state.id)
                .map((task) => (
                  <div
                    key={task.id}
                    className={`${colors.task} p-2 rounded-sm`}
                  >
                    <p>{task.title}</p>
                  </div>
                ))}
            </div>

            {newTask === state.id && (
              <div className="pr-5 pt-5 pl-5">
                <input
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder="Digite o nome da tarefa..."
                  className="border-1 rounded-md w-full p-3 mb-3"
                />

                {showCourseSelect && (
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse?.(e.target.value)}
                  >
                    <option value="">Selecione uma matéria</option>

                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}

            <div className="p-5 mt-auto">
              <button
                className={`${colors.button} p-3 w-full items-center cursor-pointer rounded-xl ${colors.text} font-bold`}
                onClick={() => addTask(state.id)}
              >
                Adicionar
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
