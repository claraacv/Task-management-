"use client"

import { useEffect, useState } from "react"
import { colorMap, ColorKey } from "@/lib/colorMap"

type Course = {
    id: number
    title: string
    color: ColorKey
    studentId: number
}

export default function Course(){
    const [courses, setCourses] = useState<Course[]>([])
    useEffect(() => {
        async function fetchCourses(){
            try{
                const response = await fetch("/api/course")
                if(!response.ok) throw new Error("There was an error while fetching the data")
                const data = await response.json()
                setCourses(data)
            } catch(err){
                if(err instanceof Error){
                    console.log("There was an error " + err)
                } else{
                    console.log("There was an unknown error while fetching the data")
                }
            }
        }

        fetchCourses()
    }, [])

    return (
        <div className="p-5">
            {courses.map((course) => {
                const colors = colorMap[course.color]

                return(
                    <div className={`${colors.course} rounded-xl text-white p-3 mb-3`}>
                        <h3>{course.title}</h3>
                    </div>
                )
            })}
        </div>
    )
}