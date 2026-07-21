"use client"

import { SignIn } from "@/components/auth/SignIn";
import { Button } from "@/components/forms/ButtonForms";
import { Input } from "@/components/forms/FormsInput";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const redirectToRegister = () => {
    router.push("/register");
  };

  return (
    <div className="flex justify-center flex-col items-center w-2/3 xl:w-1/3 p-10">
      <img src="/next.svg" alt="Logo" className="w-2/5 mb-3 items-center" />
      <SignIn provider="github"></SignIn>
      <Input type="email" label="E-mail"></Input>
      <Input type="password" label="Password"></Input>
      <Button value="Entrar"></Button>
      <p>
        Não possui conta?
        <span
          className="text-teal-500 cursor-pointer"
          onClick={redirectToRegister}
        >
           {" "} Entre
        </span>
      </p>
    </div>
  );
}
