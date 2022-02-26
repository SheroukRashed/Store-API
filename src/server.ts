import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import dashboardRoutes from './handlers/dashboardHandler'
import userRoutes from './handlers/usersHandler'
import productRoutes from './handlers/productsHandler'
import orderRoutes from './handlers/ordersHandler'

const app: express.Application = express()
const address: string = '0.0.0.0:3000'

app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

dashboardRoutes(app)
userRoutes(app)
productRoutes(app)
orderRoutes(app)

app.listen(3000, () => {
  console.log(`starting app on: ${address}`)
})


export default app;