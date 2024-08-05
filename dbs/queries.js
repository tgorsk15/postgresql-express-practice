const pool = require("./pool");

async function getAllUsernames() {
    const { rows } = await pool.query("SELECT * FROM usernames");
    return rows
}

async function insertUsername(username) {
    await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username])
}

async function searchUserName(queryName) {
    const searchResult = await pool.query(`
        SELECT username FROM usernames
        WHERE LOWER(username) LIKE $1
    `, [`%${queryName}%`]);
    
    console.log(searchResult)
    return searchResult.rows
}

async function deleteUsers() {
    await pool.query(`
        TRUNCATE usernames;
        DELETE FROM usernames;
    `)

    // console.log(await pool.query("SELECT * FROM usernames"))
}

module.exports = {
    getAllUsernames,
    insertUsername,
    searchUserName,
    deleteUsers
}