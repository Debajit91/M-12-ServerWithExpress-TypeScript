import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const createUser = async(payload: Record<string, unknown>)=>{
    const {name, email, role, password} = payload;

    const hashedPass = await bcrypt.hash(password as string, 10);

    const result = await pool.query(`INSERT INTO users(name, email, role, password) VALUES($1, $2, $3, $4) RETURNING *`, [name, email, role, hashedPass]);

    return result;
}

const getUsers = async()=>{
    const result = await pool.query(`SELECT * FROM users`)

    return result;
}

const getSingleUser = async(id:string)=>{
    const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);

    return user;
}

const updateUser = async(name:string, email:string, id:string)=>{
    const user = await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id = $3 RETURNING *`, [name, email, id]);

    return user;
}

const deleteUser = async(id:string)=>{
    const user = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);

    return user;
}

export const userService = {
    createUser,
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser
}