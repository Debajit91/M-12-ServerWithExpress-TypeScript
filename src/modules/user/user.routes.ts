import { Request, Response, Router } from "express";
import { pool } from "../../config/db";

const router = Router();

// localhost:5000/users/ -> /
// post method
router.post('/', async (req:Request, res: Response)=>{
  const {name, email} = req.body;

  try {
    const result = await pool.query(`INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`, [name, email]);

   return res.status(201).json({
      success: true,
      message: "Data Inserted Successfully",
      data: result.rows[0]
    })
    
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }

});

// get all users
router.get('/', async (req: Request, res: Response) =>{
  try {
    const result = await pool.query(`SELECT * FROM users`)
    res.status(201).json({
      success: true,
      message: "Users Retrieved Successfully",
      data: result.rows
    })
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error
    })
  }
})

export const userRoutes = router;