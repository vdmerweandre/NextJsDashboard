import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { useSession } from "next-auth/react"

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { data: session } = useSession();
    if (!session || session.user == undefined) {
      return res.status(401).end();
    }

    const { name, age } = req.body;
    const patient = await prisma.patient.create({
      data: {
        name,
        age,
        userId: session.user!.email!,
      },
    });
    res.status(201).json(patient);
  } else {
    res.status(405).end();
  }
}
