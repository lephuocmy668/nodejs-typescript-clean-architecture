var migration1533807354 = {
  up: function(db, handler) {
    var query = `CREATE KEYSPACE bluesky WITH  WITH REPLICATION = {'class':'SimpleStrategy', 'replication_factor':1};`;
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
    var query = `DROP KEYSPACE bluesky;`;
    var params = [];
    db.execute(query, params, { prepare: true }, function(err) {
      if (err) {
        handler(err, false);
      } else {
        handler(false, true);
      }
    });
  }
};
module.exports = migration1533807354;
