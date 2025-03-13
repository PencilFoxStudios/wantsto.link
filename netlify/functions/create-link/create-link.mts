import { Handler } from '@netlify/functions'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        }
    }

    try {
        const { slug, destination, userId } = JSON.parse(event.body || '{}')

        if (!slug || !destination || !userId) {
            return {
                statusCode: 400,
                body: 'Missing slug, destination, or userId',
            }
        }

        const newLink = await prisma.shortLink.create({
            data: {
                slug,
                destination,
                userId,
            },
        })

        return {
            statusCode: 201,
            body: JSON.stringify(newLink),
        }
    } catch (err: any) {
        console.error(err)
        return {
            statusCode: 500,
            body: 'Error creating shortlink',
        }
    }
}
