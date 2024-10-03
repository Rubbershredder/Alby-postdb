require("dotenv").config();
module.exports = {
  ably: {
    apiKey: process.env.ABLY_API_KEY,
  },
  postgres: {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT, 10),
    database: process.env.PG_DATABASE,
  },
};
