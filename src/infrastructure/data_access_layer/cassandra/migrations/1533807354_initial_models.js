// CREATE KEYSPACE bluesky WITH REPLICATION = {'class':'SimpleStrategy', 'replication_factor':1};
var migration1533807354 = {
  up: function(db, handler) {
    var query = `
    CREATE TABLE users (
      id uuid PRIMARY KEY,
      name text,
      email text,
      description int,
      organization_id uuid
    )
    CREATE TABLE users_by_username (
      username text PRIMARY KEY,
      user_id uuid
    )
    CREATE TABLE users_by_email (
      email text PRIMARY KEY,
      user_id uuid
    )
    `;
    var params = [];
    db.execute(query, params, { prepare: true }, function(err) {
      if (err) {
        handler(err, false);
      } else {
        handler(false, true);
      }
    });
  },
  down: function(db, handler) {
    var query = `DROP TABLE users;`;
    var params = [];
    db.execute(query, params, { prepare: true }, function(err) {
      if (err) {
        handler(err, false);
      } else {
        handler(false, true);
      }
    });
  },
};
module.exports = migration1533807354;
