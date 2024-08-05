const { Client } = require("pg");
require('dotenv').config();

const SQL = `
CREATE TABLE IF NOT EXISTS usernames (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR ( 255 )
);

INSERT INTO usernames (username)
VALUES
    ('Bryan'),
    ('Odin'),
    ('Damon')
`;


async function main() {
    console.log("seeding...")
    console.log(process.env.DB_CONNECTION)
    const client = new Client({
        connectionString: process.env.DB_CONNECTION
    });

    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done")
}

main()