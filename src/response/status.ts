import { json } from './json'

export const status = (status: number, message?: string) =>
  message
    ? json(
        {
          ...(typeof message === 'object'
            ? message
            : {
                status,
                message,
              }),
        },
        { status },
      )
    : new Response(null, { status })
