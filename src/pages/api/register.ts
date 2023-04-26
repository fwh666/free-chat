import { fetch } from 'undici'
import type { APIRoute } from 'astro'

const fwhServer = ((import.meta.env.FWH_SERVER) || 'https://api.fuwenhao.club').trim().replace(/\/$/, '')

export const post: APIRoute = async({ request }) => {
  if (request.headers.get('Content-Type') === 'application/json') {
    const body = await request.json()
    const response = await fetch(`${fwhServer}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: body.username,
        password: body.password,
      }),
    })
    const responseJson = await response.json()
    return new Response(JSON.stringify(responseJson))
  }
}
