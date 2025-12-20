import express, { Request, Response } from 'express'
import config from './config';
import initDB, { pool } from './config/db';
import { userRoutes } from './modules/user/user.routes';
import { todoRoutes } from './modules/todo/todo.routes';



const app = express()
const port = config.port


// initializing DB
initDB();

// parser
app.use(express.json());



app.get('/', (req: Request, res: Response) => {
  res.send('Hello Next Level Developers!')
})

// users Route -> localhost:5000/users
app.use('/users', userRoutes)


// todos crud
app.use('/todos', todoRoutes)



app.use((req, res) =>{
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
