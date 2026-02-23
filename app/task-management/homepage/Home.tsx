"use client"

import { useEffect, useState } from "react"
import { CoursePopup } from "@/components/modal/CoursePopup"
import { allColors, colorMap, ColorKey } from "@/lib/colorMap"
import { Plus } from "lucide-react"

type Task = {
  id: number
  title: string
  description: string
  color: string
  stateId: number
}

type State = {
  id: number
  name: string
  color: ColorKey
}

type Course = {
  id: number
  title: string
  color: ColorKey
  studentId: number
}

export default function Home(){
    const [tasks, setTasks] = useState<Task[]>([])
  const [states, setStates] = useState<State[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [state, setState] = useState("")
  const [showState, setShowState] = useState(false)
  const [createCourse, setCreateCourse] = useState(false)
  const [course, setCourse] = useState("")
  const [newTask, setNewTask] = useState<Number | null>(null)
  const [task, setTask] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedColor, setSelectedColor] = useState<ColorKey>("default")

  async function addTask(idState: Number){
    try{
      if(task == ""){
        setNewTask(idState)
        return
      } 

      if(!task) return

      const response = await fetch("/api/activity", {
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({title: task, stateId: idState, courseId: selectedCourse})
      })

      setNewTask(null)

      fetchStates()
      fetchTasks()
      fetchCourses()
    }catch(err){
      console.log("There was an error " + err);
      
    }
  }

  async function createState(){
    try{
        if(!state) return

        const response = await fetch("/api/state", {
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({name: state, color: selectedColor})
        })

        console.log(response);
        

        setShowState(!showState)

        fetchStates()
        fetchTasks()
        fetchCourses()
    } catch(err){
        console.log(err)
    }
  }

  async function fetchStates(){
      try{
        const response = await fetch("/api/state")
        if(!response.ok) throw new Error("Failed to fetch states")
        const data = await response.json()
    console.log(data);
        setStates(data)
      } catch(err){
        if(err instanceof Error){
          console.log("There was an error " + err)
        } else{
          console.log("An unkown error ocurred")
        }
      }
    }

    async function fetchTasks(){
      try{
        const response = await fetch("/api/activity")
        if(!response.ok) throw new Error("Failed to fetch tasks")
        const data = await response.json()
    console.log(data);
        setTasks(data)
      } catch(err){
        if(err instanceof Error){
          console.log("There was an error " + err)
        } else{
          console.log("An unkown error ocurred")
        } 
      }
    }

    async function fetchCourses(){
      try{
        const response = await fetch("/api/course")
        if(!response.ok) throw new Error("Failed to fetch tasks")
        const data = await response.json()
    console.log(data);
        setCourses(data)
      } catch(err){
        if(err instanceof Error){
          console.log("There was an error " + err)
        } else{
          console.log("An unkown error ocurred")
        } 
      }
    }

  useEffect(() => {
    fetchStates()
    fetchTasks()
    fetchCourses()
  }, [])

    return (
      <div className="p-5">
        <div className="flex gap-5 overflow-x-auto items-start">
          {states.map(state => {
            const colors = colorMap[state.color]

            return(
            <div 
              key={state.id}
              className={`flex flex-col w-[320px] shrink-0 ${colors.bg} rounded-lg max-h-100 shadow-lg text-white mb-3`}
            >
              <div className={`flex justify-center p-3 border-b-3 ${colors.border}`}>
                <h2>{state.name}</h2>
              </div>
              <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
                {tasks
                  .filter(task => task.stateId === state.id)
                  .map(task => (
                    <div key={task.id} className={`${colors.task} p-2 rounded-sm`}>
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
                  <select 
                    name="" 
                    id=""
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                  >
                    <option value="">Selecione uma matéria</option>
                    {courses.map((course) => (
                      <option value={course.id} key={course.id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="p-5 mt-auto">
                <button 
                  className={`${colors.button} p-3 w-full items-center rounded-xl ${colors.text} font-bold`}
                  onClick={() => addTask(state.id)}
                >
                  Adicionar
                  </button>
              </div>
            </div>
            )
          })}
          {showState && (
            <div 
              className={`flex flex-col w-[320px] shrink-0 bg-teal-600/40 rounded-lg max-h-100 shadow-lg text-white mb-3`}
        >
                <input 
                    type="text" 
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Digite aqui o nome do estado..."
                    className="flex p-3 border-1 mt-3 ml-3 mr-3 rounded-md"
                />
                <div className="flex flex-row flex-wrap gap-2 p-3 items-center justify-center">
                                    {allColors.map(color => (
                                        <div 
                                        key={color.key}
                                        className={`${color.course} w-5 h-5 border-1 rounded-sm border-amber-100 ${selectedColor === color.key ? "ring-2 ring-white" : ""}`}
                                        onClick={() => setSelectedColor(color.key)}
                                        ></div>
                                    ))}
                                </div>
              <div id="createStateBtn" className="p-3 mt-auto">
                <button className={`teal p-3 w-full items-center rounded-xl bg-teal-300 text-black font-bold teal-`} onClick={createState}>Adicionar estado</button>
              </div>
        </div>
          )}
          <div 
          onClick={() => setShowState(!showState)}
          className="bg-[#0A3E41] p-3 w-[320px] shrink-0 items-center rounded-xl text-white font-bold flex flex-row">
            <Plus className="font-bold mr-2"></Plus>
            Adicionar novo estado
          </div>
        </div>
        <div className="text-white mt-5">
          <h3 className="font-bold">Matérias escolares</h3>
          <div className="flex flex-row flex-wrap gap-5 mt-3 items-start">
            {courses.map(course => {
              const colors = colorMap[course.color]
              return (
                <div 
                  key={course.id}
                  className={`${colors.course} p-3 rounded-sm font-bold w-[320px]`}
                >
                  <p>{course.title}</p>
                </div>
              )
            })}
            {createCourse && (
              <CoursePopup
                onCancel={() => setCreateCourse(false)}
                onCreate={() => {fetchCourses(); setCreateCourse(!createCourse)}}
              ></CoursePopup>
            )}
            <div 
              onClick={() => setCreateCourse(!createCourse)}
              className="bg-[#0A3E41] p-3 w-[320px] items-center rounded-xl text-white font-bold flex flex-row"
            >
              <Plus className="font-bold mr-2"></Plus>
              Adicionar nova matéria
            </div>
          </div>
        </div>
      </div>
    )
}