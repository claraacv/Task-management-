"use client"

import { useEffect, useState } from "react"
import {Plus} from "lucide-react"
import { colorMap, ColorKey } from "@/lib/colorMap"

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

  async function createState(){
    try{
        if(!state) return

        const response = await fetch("/api/state", {
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({name: state, color: "teal"})
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
              <div className="p-5 mt-auto">
                <button className={`${colors.button} p-3 w-full items-center rounded-xl ${colors.text} font-bold`}>Adicionar</button>
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
              <div id="createStateBtn" className="p-3 mt-auto">
                <button className={`teal p-3 w-full items-center rounded-xl bg-teal-300 text-black font-bold teal-`} onClick={createState}>Adicionar estado</button>
              </div>
        </div>
          )}
          <div 
          onClick={() => setShowState(!showState)}
          className="bg-teal-100/40 p-3 w-[320px] shrink-0 items-center rounded-xl text-white font-bold flex flex-row">
            <Plus className="font-bold mr-2"></Plus>
            Adicionar novo estado
          </div>
        </div>
        <div className="text-white mt-5">
          <h3 className="font-bold">Matérias escolares</h3>
          <div className="flex flex-row flex-wrap gap-3 mt-3">
            {courses.map(course => {
              const colors = colorMap[course.color]

              return (
                <div 
                  key={course.id}
                  className={`${colors.course} p-3 w-fit rounded-sm font-bold`}
                >
                  <p>{course.title}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
}