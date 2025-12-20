import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req:Request, res: Response)=>{
  const {name, email} = req.body;

  try {
    const result = await userService.createUser(req.body);

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

const getSingleUser = async(req: Request, res: Response)=>{
  try {
    const user = await userService.getSingleUser(req.params.id as string);

    if(user.rows.length === 0){
      res.status(404).json({
      success: false,
      message: "User Not Found",
    })
    } else {
      res.status(200).json({
      success: true,
      message: "User Fetched Successfully",
      data: user.rows[0]
    })
    }
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const updateUser = async(req: Request, res: Response)=>{
  const {name, email} = req.body;

  try {
    const user = await userService.updateUser(name, email, req.params.id as string);

    if(user.rows.length === 0){
      res.status(404).json({
      success: false,
      message: "User Not Found",
    })
    } else {
      res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      data: user.rows[0]
    })
    }
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const deleteUser = async(req: Request, res: Response)=>{

  try {
    const user = await userService.deleteUser(req.params.id as string);

    

    if(user.rowCount === 0){
      res.status(404).json({
      success: false,
      message: "User Not Found",
    })
    } else {
      res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
      data: null
    })
    }
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const userController = {
    createUser,
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser
}