import { prisma } from "@/server/db/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const { method } = req

  switch (method) {

    case 'GET':
      let data = await prisma.todo.findMany({
        include: {
          user: true,
        },
      })
      // data = data.map((note) => ({
      //   ...note}))
      // console.log(data)
      res.status(200).json(data)
      break;

    case 'POST':
      const session = await getServerSession(req, res, authOptions)

      // if not logged in
      if (!session) {
        res.status(401).json({ error: 'Not authorized' })
        return;
      }

      const prismaUser = await prisma.user.findUnique({
        where: {
          email: session.user.email },
      })

      if (!prismaUser) {
        res.status(401).json({ error: 'Not authorized' })
        return;
      }

      const { category } = req.body
      const Todo = await prisma.todo.create({
        data: {
          category,
          userId: prismaUser.id,
        }
        
      })
      // console.log(Note);
      // send the post object back to the client
      res.status(201).json(Todo)
      break;

      case 'PUT':
        const { id } = req.body.query
        const updatedTodo = await prisma.todo.update({
          where: {
            id: id,
          },
          data: {
            category: category,
          },
        })
        res.status(200).json(updatedTodo)

    
    default:
      res.setHeader('Allow', ['POST','GET','PUT'])
      res.status(405).end();
    }
  }


// import Head from "next/head";
// import { prisma } from "@/server/db/client";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { useSession, signIn } from "next-auth/react";
// // import FormNote from "@/comp/FormNote";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../auth/[...nextauth]";

// export default function Home({ notes }) {
//   const router = useRouter();
//   const { data: session } = useSession();
//   if(!session){
//     return (
//       <>
//         Not signed in <br />
//         <button onClick={() => signIn()}>Sign in</button>
//       </>
//     );
//   }

//   const [title, setTitle] = useState(" ");
//   const [content, setContent] = useState(" ");
//   const [date, setDate] = useState(" ");
//   const [time, setTime] = useState(" ");
//   const [category, setCategory] = useState("");

//   const {id} = router.query;
//   //note data
//   const [todosNote, setTodosNote] = useState(notes);
//   //updated version
//   // const [newTodo, setNewTodo] = useState("");

//   useEffect(() => {
//     setTodosNote(notes);
//   }, [notes]);

//   // const handleSubmit = async (e) => {
//   //     e.preventDefault()
//   //     const res = await axios.post(`/api/todos/${todoId}/notes`, { category: newTodo })
//   //     setTodosNote([...todosNote, res.data])
//   //     setNewTodo('')
//   // }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { data } = await axios.post(`/api/todos/${id}`, {
//       category
//     });
//     setTodosNote([...todosNote, data]);
//     router.push("/profile");
//   };

//   const handleBack = () => {
//     router.push("/todos");
//   };

//   // const handleUpdate = async (e) => {
//   //   e.preventDefault();
//   //   const { data } = await axios.put(`/api/todos/${id}/notes`, {
//   //     title,
//   //     content,
//   //     date,
//   //     time,
//   //   });
//   //   setNewTodo(data);
//   //   router.push("/profile");
//   // };


//   // const { category } = router.query;

//   // const handleDeleteNote = async (noteId) => {
//   //   const res = await axios.delete(`/api/todos/${id}`);
//   //   setTodosNote(todosNote.filter((note) => note.id !== noteId));
//   //   console.log(noteId);
//   // };

//   if (session) {
//     return (
//       <>
//         <main>
//           <div>
//             <p onClick={handleBack}>Todos</p>

//             <h1>{category}</h1>
//             <button onClick={() => handleDeleteNote(id)}>delete</button>
//             <div>
//               {todosNote.map((todo) => (
//                 <div key={todo.id}>
//                   <strong>{todo.title}</strong>
//                   <strong>{todo.category}</strong>
//                   <p>{todo.date}</p>
//                   <p>{todo.time}</p>
//                 </div>
//               ))}
//             </div>
//             <form onSubmit={handleSubmit} className="form">
//               <div>
//                 <label>Add category</label>
//                 <input
//                   type="text"
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                 />
//               </div>              
              
//               <div>
//                 <label>Add Title</label>
//                 <input
//                   type="text"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label>Add Description</label>
//                 <input
//                   type="text"
//                   value={content}
//                   onChange={(e) => setContent(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label>Set Date</label>
//                 <input
//                   type="text"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label>Set Time</label>
//                 <input
//                   type="text"
//                   value={time}
//                   onChange={(e) => setTime(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <button type="submit">Update</button>
//               </div>
//             </form>
//           </div>
//         </main>
//       </>
//     );
//   }
//   return (
//     <>
//       <main>
//         <div>
//           <p onClick={handleBack}>Todos</p>
//           <h1>Log in required</h1>
//         </div>
//       </main>
//     </>
//   );
// }

// export async function getServerSideProps(context) {
//   const notes = await prisma.note.findMany({
//     orderBy: {
//       createdAt: "desc",
//     },

//   });

//   const session = await getServerSession(context.req, context.res, authOptions);

//   return {
//     props: {
//       session,
//       notes
//     },
//   };
// }


// import { prisma } from "@/server/db/client";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../../auth/[...nextauth]";

// export default async function handler(req, res) {
// const { method } = req
// const { todoId } = req.query;
// const session = await getServerSession(req, res, authOptions)

// switch (method) {

//   case 'GET':
//     //if not logged in
//     if (!session) {
//       res.status(401).json({ error: 'Not authorized' })
//       return;
//     }

//     let todoById = await prisma.todo.findMany({
//       where: {
//         id: todoId,
//       },
//       select: {
//         category: true,
//       }
//     })
//     todoById = todoById.map((todo) => ({
//       ...todo}))
//     // console.log(data)
//     res.status(200).json(todoById)
//     break;

//   case 'POST':
//     //if not logged in
//     if (!session) {
//       res.status(401).json({ error: 'Not authorized' })
//       return;
//     }

//     const prismaUser = await prisma.user.findUnique({
//       where: {
//         email: session.user.email },
//     })

//     if (!prismaUser) {
//       res.status(401).json({ error: 'Not authorized' })
//       return;
//     }

//     const { category } = req.body
//     const updatedTodoById = await prisma.todo.update({
//       where: {
//         id: todoId,
//       },
//       data: {
//         category: category,
//       },
//     });
//     res.status(201).json(updatedTodoById);
//     break;

//   case "DELETE":
//     const deleteTodoById = await prisma.todo.delete({
//       where: {
//         id: todoId,
//       },
//       data: {
//         category: category,
//       },
//     });
//     res.status(201).json(deleteTodoById);

//   default:
//     res.setHeader('Allow', ['POST'])
//     res.status(405).end(`Method ${method} Not Allowed`)
// }
// }



// export default function Home({ Todos, todosArray, session }) {
//   console.log(Todos);
//   const router = useRouter();


//   const [title, setTitle] = useState(" ");
//   const [content, setContent] = useState(" ");
//   const [date, setDate] = useState(" ");
//   const [time, setTime] = useState(" ");
//   const [category, setCategory] = useState("");

//   const {id} = router.query;
//   //note data
//   const [todosNote, setTodosNote] = useState(Todos);
//   //updated version
//   // const [newTodo, setNewTodo] = useState("");

//   useEffect(() => {
//     setTodosNote(Todos);
//   }, [Todos]);

//   // const handleSubmit = async (e) => {
//   //     e.preventDefault()
//   //     const res = await axios.post(`/api/todos/${todoId}/notes`, { category: newTodo })
//   //     setTodosNote([...todosNote, res.data])
//   //     setNewTodo('')
//   // }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { data } = await axios.post(`/api/todos/${id}/notes`, {
//       title,
//       content,
//       date,
//       time,
      
//     });
//     setTodosNote([...todosNote, data]);
//     router.push("/profile");
//   };

//   const handleBack = () => {
//     router.push("/todos");
//   };

//   // const handleUpdate = async (e) => {
//   //   e.preventDefault();
//   //   const { data } = await axios.put(`/api/todos/${id}/notes`, {
//   //     title,
//   //     content,
//   //     date,
//   //     time,
//   //   });
//   //   setNewTodo(data);
//   //   router.push("/profile");
//   // };


//   // const { category } = router.query;

//   // const handleDeleteNote = async (noteId) => {
//   //   const res = await axios.delete(`/api/todos/${id}`);
//   //   setTodosNote(todosNote.filter((note) => note.id !== noteId));
//   //   console.log(noteId);
//   // };

//   if (session) {
//     return (
//       <>
//         <main>
//           <div>
//             <p onClick={handleBack}>Back to Add Todos</p>

//             <h1>{todosArray[id].category}</h1>
//             {/* <button onClick={() => handleDeleteNote(id)}>delete</button> */}
//             <div>
//               {todosNote.map((todo) => (
//                 <div key={todo.id}>
//                   <strong>{todo.title}</strong>
//                   <strong>{todo.category}</strong>
//                   <p>{todo.date}</p>
//                   <p>{todo.time}</p>
//                 </div>
//               ))}
//             </div>
//             <form onSubmit={handleSubmit} className="form">
//               <div>
//                 <label>Add category</label>
//                 <input
//                   type="text"
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                 />
//               </div>              
              
//               <div>
//                 <label>Add Title</label>
//                 <input
//                   type="text"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label>Add Description</label>
//                 <input
//                   type="text"
//                   value={content}
//                   onChange={(e) => setContent(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label>Set Date</label>
//                 <input
//                   type="text"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label>Set Time</label>
//                 <input
//                   type="text"
//                   value={time}
//                   onChange={(e) => setTime(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <button type="submit">Update</button>
//               </div>
//             </form>
//           </div>
//         </main>
//       </>
//     );
//   }
//   return (
//     <>
//       <main>
//         <div>
//           <p onClick={handleBack}>Todos</p>
//           <h1>Log in required</h1>
//         </div>
//       </main>
//     </>
//   );
// }

// export async function getServerSideProps(context) {
//   const Todos = await prisma.todo.findMany({
//     orderBy: {
//       createdAt: "desc",
//     },

//   });

//   const session = await getServerSession(context.req, context.res, authOptions);

//   const todosLists = JSON.parse(JSON.stringify(Todos))|| [];
//   const todosArray = Object.values(todosLists);

//   return {
//     props: {
//       session,
//       Todos,
//       todosArray
//     },
//   };
// }
