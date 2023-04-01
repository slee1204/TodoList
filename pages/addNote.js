import Head from 'next/head'
import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'
import NavMenu from '@/comp/NavMenu'
import TodoInput from '@/comp/TodoInput'
import FormTodo from '@/comp/FormTodo'
import { useRouter } from 'next/router'
// import { prisma } from '@/server/db/client'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <NavMenu href="/">Home</NavMenu>
        <NavMenu href="/addNote">To Do Lists</NavMenu>
        <h1>Todo</h1>

          <FormTodo />
      </main>
    </>
  )
}
