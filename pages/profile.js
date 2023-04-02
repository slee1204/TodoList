//nextAuth
import { useSession, signIn, signOut } from 'next-auth/react'
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'
import { useRouter } from 'next/router'

export default function Profile({notesArray}) {
  const router = useRouter();
  const { data: session } = useSession()

  if (session) {
    const todoNotes = notesArray.map((note) => (
      <div key={note.id} style={{backgroundColor:"lavender"}}>
        <div>
          <p>{note.title}</p>
          <p>{note.content}</p>
          <p>{note.date}</p>
          <p>{note.time}</p>
        </div>
      </div>
    ))
    return(
      <>
        <div>
          Signed in as {session.user.email} <br/>
          <img src= {session.user.image} style={{width:"100px", height:"100px"}}/> <br/>
          Signed in as {session.user.name} <br/>
          <button onClick={() => router.push("/addNote")}>Post something</button>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
        
        <div>
          {todoNotes}
        </div>
      </>
    )
  }
  return (
    <>
    Not signed in <br/>
    <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}



export async function getServerSideProps(context) {

  const notes = await prisma.note.findMany({
    orderBy:{
      createdAt: 'desc'
    },
    include: {
      user: true,
    }
  })


  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    //redirect to login page
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    }
  }

  const notesLists = JSON.parse(JSON.stringify(notes))|| [];
  const notesArray = Object.values(notesLists);
  console.log(notesArray)
  return {
    props: {
      session,
      notesArray,
    },
  }
}
