import mysql from "mysql2/promise";

const test = async () => {
  try {
    const conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "typingrush",
      port: 3306
    });
    console.log("✅ Connected to MySQL!");
    await conn.end();
  } catch (err) {
    console.error("❌ DB Connection Failed:", err);
  }
};

test();
