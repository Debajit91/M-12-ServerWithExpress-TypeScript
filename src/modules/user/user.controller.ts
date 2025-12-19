import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userService } from "./user.service";

const createUser = async (req:Request, res: Response)=>{
  const {name, email} = req.body;

  try {
    const result = await userService.createUser(name, email);

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

}

const getUsers = async (req: Request, res: Response) =>{
  try {
    const result = await userService.getUsers();
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
}

export const userController = {
    createUser,
    getUsers
}