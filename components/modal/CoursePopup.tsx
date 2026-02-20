import { useState } from "react"
import { allColors, ColorKey } from "@/lib/colorMap"

type CourseProps = {
    onCancel: () => void
    onCreate: () => void
}

export function CoursePopup({onCancel, onCreate}: CourseProps){
    const [course, setCourse] = useState("")
    const [selectedColor, setSelectedColor] = useState<ColorKey>("default")

    async function creatingCourse(){
    try{
        if(!course) return

        const response = await fetch("/api/course", {
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({title: course, color: selectedColor})
        })

        onCreate()
    } catch(err){
        console.log(err)
    }
    }

    return (
            <div className="bg-[#0A3E41] flex flex-col w-[320px] rounded-lg max-h-100 shadow-lg text-white mb-3">
                <input 
                    type="text" 
                    placeholder="Digite aqui o nome da matéria..." 
                    className="flex p-3 border-1 mt-3 ml-3 mr-3 rounded-md"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
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
                <div className="flex flex-row gap-3 p-3 mt-auto">
                    <button className="bg-[#06585c] p-3 w-full items-center rounded-xl text-white font-bold" onClick={onCancel}>Cancelar</button>
                    <button className="bg-[#0e8288] p-3 w-full items-center rounded-xl text-white font-bold" onClick={creatingCourse}>Cadastrar</button>
                </div>
            </div>
    )
}