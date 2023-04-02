import Head from 'next/head'
import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'
import FormTodo from '@/comp/FormTodo'
import { useRouter } from 'next/router'
// import { prisma } from '@/server/db/client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'

export default function addNote ({ user }) {


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>

        <h1>Make a new Todo List</h1>

          <FormTodo />
          <button onClick={()=>router.push("/profile")}>Back to profile</button>
          
      </main>
    </>
  )
}
