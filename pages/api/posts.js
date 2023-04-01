import { prisma } from "@/server/db/client";

export default async function handler(req, res) {
  const { method } = req

  switch (method) {

    case 'GET':
      const data = await prisma.note.findMany({
        select: {
          id: true,
          todo: true,
          date: true,
          time: true,
        }
      })
      console.log(data)
      res.status(200).json(data)
      break
    case 'POST':
      const { todo, date, time } = req.body
      const Note = await prisma.note.create({
        data: {
          todo,
          date,
          time
        }
      })
      console.log(Note);
      // send the post object back to the client
      res.status(201).json(Note)
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}