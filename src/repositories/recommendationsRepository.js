import connection from '../database.js';

async function createRecommendation(name, youtubeLink, score) {
  await connection.query(
    'INSERT INTO recommendations (name, "youtubeLink", score) VALUES ($1,$2,$3)',
    [name, youtubeLink, score],
  );
}

export default createRecommendation;
