import { rest } from 'msw'

export const handlers = [
  rest.get('/user', (_req, res, ctx) => {
    return res(
      // ctx.status(200),
      ctx.json({
        username: 'admin'
      })
    )
  })
]
