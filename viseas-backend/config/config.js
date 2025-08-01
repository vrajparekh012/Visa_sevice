module.exports = {
  db: {
    host: 'localhost',
    user: 'root',
    password: '', // update if your MySQL has a password
    database: 'visa_info', // update to your actual database name
    port: 3306,
  },
  auth: {
    jwtSecret: 'my_jwt_secret_key',
    jwtExpiresIn: '1d',
  },
};
