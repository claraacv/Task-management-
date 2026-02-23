import { useState } from "react";

type PageProps = {
  params: {
    id: string
  }
}

export default function TasksPerCourse({ params }: PageProps){
    const [states, setStates] = useState([])
    const [tasks, setTasks] = useState([])
    const {id} = params

    async function fetchStates(){
        try{
            const states = await fetch("/api/activity", {

            })

        } catch(err){
            console.log("There was an error " + err);
            
        }
    }

    function fetchTasks(){

    }

    return(
        <div>
            <h2></h2>
            <div>

            </div>
        </div>
    )
}