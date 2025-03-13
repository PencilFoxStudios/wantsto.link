import { Handler } from '@netlify/functions'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const handler: Handler = async (event) => {
    const path = event.path || '/'
    const slug = path.split('/').pop()

    try {
        const shortLink = await prisma.shortLink.findUnique({
            where: { slug: slug || '' },
        })

        if (!shortLink) {
            return {
                statusCode: 404,
                body: 'Shortlink not found',
            }
        }

        // Optional: log click
        await prisma.click.create({
            data: {
                shortLinkId: shortLink.id,
                ip: event.headers['client-ip'] || '',
                referrer: event.headers.referer || '',
                userAgent: event.headers['user-agent'] || '',
            },
        })

        return {
            statusCode: 302,
            headers: {
                Location: shortLink.destination,
            },
            body: '',
        }
    } catch (err: any) {
        console.error(err)
        return {
            statusCode: 500,
            body: 'Error resolving shortlink',
        }
    }
}
