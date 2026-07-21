type Properties = {
    value: string
}

export function Button({value}: Properties){
    return (
        <input type="submit" value={value} className="bg-teal-600 text-white font-bold p-3 rounded-md w-full mt-3"/>
    )
}