import { PrismaClient, Prisma } from '@prisma/client'

export const prismaService = new PrismaClient({
	omit: {
		user: {
			password: true
		}
	}
})

// NEED TO BE IMPROVE, MAP EVERY MODEL NAME, THEN APPLY COUNT AND ROWS AS KEY, VALUE!
export const prismaPagination = {
	company: async ({ take, skip, where }: { take?: number, skip?: number, where?: Prisma.companyWhereInput }) => ({
		count: prismaService.company.count(),
		rows: prismaService.company.findMany({ take, skip, where })
	}),
	material: async ({ take, skip, where }: { take?: number, skip?: number, where?: Prisma.materialWhereInput }) => ({
		count: await prismaService.material.count(),
		rows: await prismaService.material.findMany({ take, skip, where })
	})
}

export const prismaServiceWithUserPassword = new PrismaClient()