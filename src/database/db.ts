import sqlite3 from "sqlite3";
import path from "path";
import fs from "fs";

const dbFile = path.resolve(__dirname, "../../data/data.sqlite");

const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

const schema = fs.readFileSync(path.resolve(__dirname, "schema.sql"), "utf-8");
db.exec(schema, (err) => {
  if (err) console.error("Error creating schema:", err.message);
});

const seed = fs.readFileSync(path.resolve(__dirname, "seed.sql"), "utf-8");
db.get("SELECT COUNT(*) as count FROM courses", (err, row: any) => {
  if (err) {
    console.error("Error checking seed data:", err);
  } else if (row.count === 0) {
    db.exec(seed, (err) => {
      if (err) console.error("Error seeding data:", err.message);
    });
    console.log("Database seeded with initial data");
  } else {
    console.log("Courses already seeded");
  }
});

export default db;
