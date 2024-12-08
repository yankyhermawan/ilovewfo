import { PrismaClient, Prisma } from '@prisma/client'

export const prismaService = new PrismaClient({
	omit: {
		user: {
			password: true
		}
	}
}).$extends({
	model: {
		$allModels: {
			async findManyAndCountAll<T> (
				this: T,
				{
					take,
					skip,
					where
				} : {
					take?: number,
					skip?: number,
					where?: Prisma.Args<T, 'findMany'>['where']
				}
			) {
				const context = Prisma.getExtensionContext(this)
				const count = await (context as any).count({ where })
				const rows = await (context as any).findMany({ take, skip, where })
				return {
					count,
					rows
				}
			}
		}
	}
})
export const prismaServiceWithUserPassword = new PrismaClient()