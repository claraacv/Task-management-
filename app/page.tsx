import Link from "next/link"

export default function Root(){
    return <>
        <h1>Welcome home</h1>
        <Link href="/blog">Blog</Link>
    </>
}