import Link from "next/link";

export default function NavMenu({href,children,handleClick=()=>{}}){
  return (
    <Link href={href}>{children}</Link>
  )
}