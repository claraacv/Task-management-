import {signOut } from "@/lib/auth"

export function SignOut() {
  return (
    <form
        action={async () => {
            "use server"
            await signOut()
        }}
    >
      <button className="bg-neutral-700 text-white p-2 rounded-md">
        Sign Out
      </button>
    </form>
  )
}