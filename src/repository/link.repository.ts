import { skip } from '@prisma/client/runtime/library';
import { prisma } from '../db/dbconnect'

class LinkRepository {
    constructor() { }

    async createLink({ title, link, user_id, tags }: { title?: string, link: string, user_id: number, tags?: string[] }) {
        return await prisma.link.create({
            data: {
                title,
                link,
                user_id,
                tags
            }
        })
    }

    async findLinkById(link_id: number) {
        return prisma.link.findUnique({
            where: {
                id: link_id,
                isDeleted: false
            }
        })
    }

    async deleteLink(link_id: number) {
        return await prisma.link.update({
            where: {
                id: link_id
            },
            data: {
                isDeleted: true
            }
        })
    }

    async findLinksByUserIdWithFilter(user_id: number, filter: string | null, page: number= 1) {
        const filters = filter
            ? {
                OR: [
                    { title: { contains: filter, mode: 'insensitive' } },
                    { tags: { contains: filter, mode: 'insensitive' } },
                ],
            }
            : {};

        return await prisma.link.findMany({
            where: {
                user_id: user_id,
                isDeleted: false,
                ...filters
            },
            orderBy: {
                createdAt: 'desc',
            },
            skip: (page - 1) * 10,
            take: 10,
            select: {
                id: true,
                title: true,
                link: true,
                tags: true,
                createdAt: true,
                user_id: true,
            }
        })
    }

}

export default LinkRepository