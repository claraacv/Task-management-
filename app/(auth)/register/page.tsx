"use client";

import { Button } from "@/components/forms/ButtonForms";
import { Input } from "@/components/forms/FormsInput";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterUser() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const redirectToLogin = () => {
    router.push("/login");
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.error);
      }

      router.push("/login");
    } catch (err) {
      console.error(err);
      if (err instanceof Error && "data" in err) {
        console.log((err as any).data.message);
      }
    }
  };

  return (
    <div className="flex justify-center flex-col items-center w-2/3 xl:w-1/3 p-10">
      <form onSubmit={handleRegister}>
        <img src="/next.svg" alt="Logo" className="w-2/5 mb-3 items-center" />
        <Input type="" label="Nome" value={name} onChange={(e) => setName(e.target.value)} />
        <Input type="" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input type="email" label="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button value="Cadastrar"></Button>
        <p>
          Já possui conta?
          <span
            className="text-teal-500 cursor-pointer"
            onClick={redirectToLogin}
          >
            {" "}
            Entre aqui
          </span>
        </p>
      </form>
    </div>
  );
}
