import express, { Request, Response } from 'express'
import {Pool} from 'pg';


const app = express()
const port = 5000

const pool = new Pool({
  connectionString: `postgresql://neondb_owner:npg_EoSQkOKG95Vm@ep-bitter-brook-a4o7u4w3-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
})

// parser
app.use(express.json());



app.get('/', (req: Request, res: Response) => {
  res.send('Hello Next Level Developers!')
})

app.post('/', (req, res)=>{
  console.log(req.body);

  res.status(201).json({
    success: true,
    message: "API is working"
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
