import { PrismaClient } from '@prisma/client'

export class PrismaService extends PrismaClient {
  constructor() {
    super({
      log: ['warn', 'error'],
    })
  }
}

export const prismaService = new PrismaService()
