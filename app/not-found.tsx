"use client"

import { usePathname } from "next/navigation"

export default function notFound(){
    const pathname = usePathname()
    const productId = pathname.split("/")[2]
    const reviewId = pathname.split("/")[2]
    return(
        <div>
            <h2>Page not found</h2>
            <p>Could not find requested resource for review {reviewId} and product {productId}</p>
        </div>
    )
}