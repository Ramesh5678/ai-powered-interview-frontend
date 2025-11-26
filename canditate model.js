const db = require('../db/connection');

async function getAllCandidates() {
  const sql = 'SELECT id, name, email, position, status FROM candidates';
  return await db.query(sql);
}

module.exports = { getAllCandidates };