import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import Home from "./Home"

export default async function HomePage(){
  const session = await auth()

  if (!session) {
    return redirect("/login")
  }

  return <Home/>
}