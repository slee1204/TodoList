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
  }
}