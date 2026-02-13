type Properties = {
    type: string,
    label: string
}

export function Input({type, label}: Properties){
    return (
        <div className="items-start w-full">
            <label htmlFor={label} className="text-white font-bold">{label}</label>
            <input type={type} id={label} className="p-2 bg-teal-900 text-white rounded-md w-full mb-3" />
        </div>
    )
}