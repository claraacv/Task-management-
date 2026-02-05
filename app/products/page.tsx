import Link from "next/link";

export default function Products(){
    const productId = 3;
    return <>
        <Link href="/">Home</Link>
        <h1>Product list</h1>
        <h2>
            <Link href="/products/1">Product 2</Link>
        </h2>
        <h2>
            <Link href="/products/2">Product 2</Link>
        </h2>
        <h3>
            <Link href={`products/${productId}`}>Produto 3</Link>
        </h3>
    </>
}