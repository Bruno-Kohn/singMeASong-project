import connection from '../database.js';

async function createRecommendation(name, youtubeLink, score) {
  await connection.query(
    'INSERT INTO recommendations (name, "youtubeLink", score) VALUES ($1,$2,$3)',
    [name, youtubeLink, score],
  );
}

async function upScore(id, number) {
  return connection.query(
    'UPDATE recommendations SET score = score + $1 WHERE id = $2',
    [number, id],
  );
}

export { createRecommendation, upScore };
