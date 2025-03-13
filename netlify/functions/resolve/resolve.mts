import {Handler} from '@netlify/functions'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

const handler: Handler = async (event, context) => {
    // Extract the host header. That's how we're gonna find out who's asking for what.
    const host = event.headers.host || ''
    // Extract subdomain and root domain from host
    const [subname, rootname, tld] = host.split(".")
    // Extract slug from path
    const path = event.path // e.g., "/discord"
    const slug = path.replace(/^\/+/, '')

    // Look up domain and user from host
    const domainEntry = await prisma.domains.findUnique({
        where: {
          name: rootname + "." + tld
        }
    });

    if(!domainEntry){
      return {
        statusCode: 404,
        body: 'Domain not registered.',
      }
    }

    const shortLinkEntry = await prisma.shortLinks.findUnique({
        where: {
          slug: slug,
          domainId: domainEntry.id,
          user: {
            username: subname
          }
        }
    })

    if(!shortLinkEntry){
      return {
        statusCode: 404,
        body: 'This short link does not exist under this user!',
      }
    }

    // redirect to URL
    return {
      statusCode: 301,
      headers: {
        "Location": shortLinkEntry.destination
      }

    }
}

export {handler}
