import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUseCasesRequest {
  name: string
  email: string
  password: string
}

export async function registerUserCase({
  name,
  email,
  password,
}: RegisterUseCasesRequest) {
  const userEmailCheks = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userEmailCheks) {
    throw new Error('E-mail already used')
  }

  const password_hash = await hash(password, 6)
  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
}
