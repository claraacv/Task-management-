"use client"

import Link from "next/link"
import {Menu, X, CircleUserIcon} from "lucide-react"
import { useState, useEffect } from "react"

export default function NavbarLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [menuAberto, setMenuAberto] = useState(false)

    return (
        <div className="flex min-h-screen bg-teal-950">

            <aside className="hidden sm:flex sm:w-64 bg-[#0A3E41]/50 text-white p-5 flex-col">
                <div className="flex justify-center">
                    <img src="/next.svg" alt="Logo" className="w-28" />
                </div>
                <div className="flex flex-col gap-4 mt-6">
                    <Link href="/task-management/homepage">Home</Link>
                    <Link href="/task-management/course">Matérias</Link>
                    <Link href="">Conta</Link>
                </div>
            </aside>

            {menuAberto && (
                <div className="fixed inset-0 bg-black/40 z-40 sm:hidden">
                    <aside className="w-64 bg-[#0A3E41] text-white p-5 h-full">
                        <div className="flex justify-end">
                            <X onClick={() => setMenuAberto(false)} />
                        </div>
                        <div className="flex justify-center">
                            <img src="/next.svg" alt="Logo" className="w-28" />
                        </div>
                        <div className="flex flex-col gap-4 mt-6">
                            <Link href="/task-management/homepage" onClick={() => setMenuAberto(false)}>Home</Link>
                            <Link href="/task-management/course" onClick={() => setMenuAberto(false)}>Matérias</Link>
                            <Link href="" onClick={() => setMenuAberto(false)}>Conta</Link>
                        </div>
                    </aside>
                </div>
            )}

            <main className="flex-1 overflow-auto">
                <div className="sm:hidden flex items-center justify-between p-5 pb-0 bg-teal-950 text-white">
                    <Menu onClick={() => setMenuAberto(true)} />
                    <CircleUserIcon />
                </div>
                {children}
            </main>
        </div>
    )
}