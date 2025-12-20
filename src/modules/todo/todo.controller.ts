import { Request, Response } from "express";
import { todoService } from "./todo.service";

const createTodo = async(req: Request, res: Response)=>{

  try {
    const result = await todoService.createTodo(req.body);

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
}

const getTodos = async(req:Request, res:Response)=>{
  try {
    const result = await todoService.getTodos();

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
}

export const todoController = {
    createTodo,
    getTodos,
}