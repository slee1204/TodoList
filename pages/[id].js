//nextAuth
import { useSession, signIn, signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

export default function App({ todosArray, listsArray, session }) {
  
  const r = useRouter();
  const {id} = r.query;
  // console.log(id)


  const [content, setContent] = useState("")
  const [lists, setLists] = useState(totalList)
  

  useEffect(()=>{
    setLists(totalList)
  },[totalList])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { res } = await axios.post(`/api/todos/${id}`, {
      content,
    });
    console.log(res.data);
    setLists([...lists, res.data]);
    r.push(`/profile`)
  }



  const { data: session } = useSession();


  const displayTodoLists = todosArray.map((item) => {
    return (
      <div key={item.id}>
        <div>{item.content}</div>
      </div>
    );
  });

  if (session) {
    return (
      <>
        <div>
          {displayTodoLists}
          <h1>Add lists to</h1>
          <div>
            <form onSubmit={handleSubmit} className="form">
              <div>
                <label>Add Description</label>
                <input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div>
                <button type="submit">Add</button>
              </div>
            </form>
          </div>
        </div>

        <div>
          <div>Here is the list of tasks</div>
          {/* {item} */}
        </div>
      </>
    );
  }
  return (
    <>
      <div>Test page</div>
    </>
  );
}

export async function getServerSideProps(context) {
  
  const session = await getServerSession(context.req, context.res, authOptions);

  const todos = await prisma.todo.findMany({
    include: {
      user: true,
      id: query,
    },
  });

  const todosLists = JSON.parse(JSON.stringify(todos))
  const todosArray = Object.values(todosLists)


  const notesList = await prisma.note.findMany({
    orderBy: {
      id: "asc",
    },
  });

  // console.log(notesList);



  const totalList = JSON.parse(JSON.stringify(notesList)) || [];
  const listsArray = Object.values(totalList);

  return {
    props: {
      listsArray,
      session,
      todosArray
    },
  };
}
