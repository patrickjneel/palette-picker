module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/palettepicker',
    useNullAsDefualt: true,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    }
  }
};
