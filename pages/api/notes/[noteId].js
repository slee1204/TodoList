import { prisma } from "@/server/db/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const { method } = req

  switch (method) {

    case 'GET':
      let data = await prisma.note.findMany({

      })
      data = data.map((note) => ({
        ...note}))
      console.log(data)
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

      const { detail } = req.body
      const Note = await prisma.note.create({
        data: {
          detail,
          user: {
            connect: {
              email: session.user.email,
            },
          },
          todo: {
            connect: {
              id: 1,
            },
          }

        }
      })
      // console.log(Note);
      // send the post object back to the client
      res.status(201).json(Note)
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
