import { prisma } from "@/server/db/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
export default async function handler(req, res) {
  const { method } = req

  switch (method) {

    case 'GET':
      let data = await prisma.todo.findMany({

      })
      data = data.map((note) => ({
        ...note}))
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


      //if the the same title or content is already in the database
      // const existingNote = await prisma.note.findUnique({
      //   where: {
      //     title: req.body.title,
      //   },
      // })

      // if (existingNote) {
      //   res.status(400).json({ error: 'Note already exists' })
      //   return;
      // }

      const { category } = req.body
      const Todo = await prisma.todo.create({
        data: {
          category,
          userId: prismaUser.id,
        }
      })

      // send the post object back to the client
      res.status(201).json(Todo)
      break;

      case 'PUT':
        const { id } = req.body
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