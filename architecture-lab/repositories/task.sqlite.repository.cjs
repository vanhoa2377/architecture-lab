const { DatabaseSync } = require("node:sqlite");
const fs = require("node:fs");
const path = require("node:path");

function createSqliteTaskRepository(dbFile) {
    fs.mkdirSync(path.dirname(dbFile), { recursive: true });

    const db = new DatabaseSync(dbFile);

    db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL
    );
  `);

    const selectAll = db.prepare(
        "SELECT id, title FROM tasks ORDER BY id",
    );

    const selectById = db.prepare(
        "SELECT id, title FROM tasks WHERE id = ?",
    );

    const insert = db.prepare(
        "INSERT INTO tasks (title) VALUES (?)",
    );

    function findAll() {
        return selectAll.all().map((row) => ({
            id: row.id,
            title: row.title,
        }));
    }

    function findById(id) {
        const row = selectById.get(id);

        return row ? { id: row.id, title: row.title } : undefined;
    }

    function create(title) {
        const result = insert.run(title);

        return {
            id: Number(result.lastInsertRowid),
            title: title,
        };
    }

    return {
        findAll,
        findById,
        create,
    };
}

module.exports = { createSqliteTaskRepository };