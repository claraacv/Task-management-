"use client";

import { SignIn } from "@/components/auth/SignIn";
import { Button } from "@/components/forms/ButtonForms";
import { Input } from "@/components/forms/FormsInput";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const redirectToRegister = () => {
    router.push("/register");
  };

  const handleLogin = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log(response);

      if (response?.error) {
        console.log("Email ou senha inválidos");
        return;
      }

      router.push("/task-management/homepage");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center w-2/3 xl:w-1/3 p-10">
      <form onSubmit={handleLogin}>
        <img src="/next.svg" alt="Logo" className="w-2/5 mb-3 items-center" />
        <SignIn provider="github"></SignIn>
        <Input
          type="email"
          label="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button value="Entrar"></Button>
        <p>
          Não possui conta?
          <span
            className="text-teal-500 cursor-pointer"
            onClick={redirectToRegister}
          >
            {" "}
            Entre
          </span>
        </p>
      </form>
    </div>
  );
}
