import 'module-alias/register'
import express, { type Application, type Request, type Response } from 'express'

const app: Application = express()

const PORT: number = 3001

app.use('/', (req: Request, res: Response): void => {
  res.send('Hello World')
})

app.listen(PORT, (): void => {
  console.log(`SERVER IS UP ON PORT TEST: ${PORT}`)
})
