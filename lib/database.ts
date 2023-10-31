import mysql from "mysql2";

export const connection = mysql.createConnection({
    host: "65.21.149.235",
    user: "compmath_admin",
    password: "comp_password",
    database: "compmath",
    port: 3306
})