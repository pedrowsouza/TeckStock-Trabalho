import mysql from 'mysql2/promise'

export const db = await mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "techstock123",
    database: "techstock"
})

console.log("Conectado ao MySQL!")
