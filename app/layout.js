import Link from "next/link"
import "./global.css"

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
        <nav>
          <ul>
            <Link href="/">Home</Link>
            <Link href="/todo-list">To Do Lists</Link>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  )
}