import { PrismaClient } from '@prisma/client'

export const prismaService = new PrismaClient({
	omit: {
		user: {
			password: true
		}
	}
})

export const prismaServiceWithUserPassword = new PrismaClient()