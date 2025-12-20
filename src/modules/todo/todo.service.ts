import { pool } from "../../config/db"

const createTodo = async(payload: Record<string, unknown>)=>{
    const {user_id, title, description} = payload;
    const result = await pool.query(`INSERT INTO todos(user_id, title, description) VALUES($1, $2, $3) RETURNING *`, [user_id, title, description]);

    return result;
}


const getTodos = async()=>{
    const result = await pool.query(`SELECT * FROM todos`);

    return result;
}
export const todoService = {
    createTodo,
    getTodos,
}