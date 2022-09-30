import { rest } from 'msw'

export const handlers = [
  rest.get('/user', (_req, res, ctx) => {
    return res(
      ctx.json({
        username: 'admin'
      })
    )
  })
]
