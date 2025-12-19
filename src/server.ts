import express, { Request, Response } from 'express'
import config from './config';
import initDB, { pool } from './config/db';
import { userRoutes } from './modules/user/user.routes';



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
app.post('/todos', async(req: Request, res: Response)=>{
  const {user_id, title, description} = req.body;

  try {
    const result = await pool.query(`INSERT INTO todos(user_id, title, description) VALUES($1, $2, $3) RETURNING *`, [user_id, title, description]);

    res.status(200).json({
      success: true,
      message: "Todo inserted successfully",
      data: result.rows[0]
    })
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

app.get('/todos', async(req:Request, res:Response)=>{
  try {
    const result = await pool.query(`SELECT * FROM todos`);

    res.status(200).json({
      success: true,
      message: "Todos Retrieved Successfully",
      data: result.rows
    })
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

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
