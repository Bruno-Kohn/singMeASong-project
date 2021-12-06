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

async function deleteRecommendation(id) {
  return connection.query('DELETE FROM recommendations WHERE id = $1', [id]);
}

async function checkID(id) {
  const result = await connection.query(
    `
  SELECT * FROM recommendations WHERE id = $1
  `,
    [id],
  );

  return result.rows[0];
}

async function checkRecommendation(minScore, maxScore, order) {
  let where = '';
  const params = [minScore];

  if (maxScore === undefined || !maxScore) {
    where = 'score >= $1';
  } else {
    where = 'score BETWEEN $1 AND $2';
    params.push(maxScore);
  }

  let sql = `SELECT * FROM recommendations WHERE ${where}`;

  if (order) {
    sql += ` ORDER BY ${order}`;
  }

  const result = await connection.query(sql, params);

  return result.rows;
}

async function checkRecommendationRandom() {
  const result = await connection.query(
    'SELECT * FROM recommendations ORDER BY RANDOM() LIMIT = 1',
  );

  return result.rows[0];
}

async function selectTopAmount(amount) {
  const result = await connection.query(
    'SELECT * FROM recommendations ORDER BY score DESC LIMIT $1',
    [Number(amount)],
  );
  return result;
}

export {
  createRecommendation,
  upScore,
  deleteRecommendation,
  checkID,
  checkRecommendation,
  selectTopAmount,
  checkRecommendationRandom,
};
