import express, { Request, Response } from 'express'
import initDB from './config/db';
import { userRoutes } from './modules/user/user.routes';
import { todoRoutes } from './modules/todo/todo.routes';
import { authRoutes } from './modules/auth/auth.routes';



const app = express()



// initializing DB
initDB();

// parser
app.use(express.json());



app.get('/', (req: Request, res: Response) => {
  res.send('Hello Next Level Developers!')
})

// users Route -> localhost:5000/users
app.use('/users', userRoutes);

// todos Route
app.use('/todos', todoRoutes);

// auth Route
app.use('/auth', authRoutes);


app.use((req, res) =>{
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path
  })
})

export default app;
