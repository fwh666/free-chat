import { fetch } from 'undici'
import type { APIRoute } from 'astro'

const fwhServer = ((import.meta.env.FWH_SERVER) || 'https://api.fuwenhao.club').trim().replace(/\/$/, '')

export const post: APIRoute = async({ request }) => {
  if (request.headers.get('Content-Type') === 'application/json') {
    // const token = localStorage.getItem('token')
    // console.log('toknedd', token)
    // const token = params.token
    // 通过body获取透传的数据

    const body = await request.json()
    const token = body.token
    const response = await fetch(`${fwhServer}/users/checkCurrentAuth`, {
      method: 'POST',
      headers: {
        Authorization: token,
      },
      body: JSON.stringify(token),
    })
    const responseJson = await response.json()
    return new Response(JSON.stringify(responseJson))
  }
}
