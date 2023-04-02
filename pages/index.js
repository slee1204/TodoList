import Head from 'next/head'
import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'
import NavMenu from '@/comp/NavMenu'
import Link from 'next/link'

//nextAuth
import { useSession, signIn, signOut } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'


export default function Home() {
  const { data: session } = useSession()

  if (session) {
    return(
      <>
        Signed in as {session.user.email} <br/>
        <img src= {session.user.image} style={{width:"100px", height:"100px"}}/> <br/>
        Signed in as {session.user.name} <br/>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
    Not signed in <br/>
    <button onClick={() => signIn()}>Sign in</button>
    </>
  )
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
        <h1>Make your ToDo List</h1>
        

      </main>
    </>
  )
}

//get session info from the server side and use it on client side
export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session
    },
  }
}