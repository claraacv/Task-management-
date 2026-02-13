import { SignIn } from "@/components/auth/SignIn";
import { Button } from "@/components/forms/button";
import { Input } from "@/components/forms/input";

export default function Login(){
    return (
        <div className="flex justify-center flex-col items-center w-1/3 p-10">
            <img src="/next.svg" alt="Logo" className="w-2/5 mb-3 items-center"/>
            <SignIn provider="github"></SignIn>
            <Input type="email" label="E-mail"></Input>
            <Input type="password" label="Password"></Input>
            <Button value="Login"></Button>
        </div>
    )
}