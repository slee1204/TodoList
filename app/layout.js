import Link from "next/link"
import "./global.css"
import NavMenu from "../comp/NavMenu"

export default function RootLayout({children}){
  return(
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
        <title>To Do List</title>
      </head>
      <body>
        <nav className="nav">
          <ul className="">
            <NavMenu href="/">Home</NavMenu>
            <NavMenu href="/todo-list">To Do Lists</NavMenu>
          </ul>
        </nav>
        <main className="main">
          {children}
        </main>
      </body>
    </html>
  )
}