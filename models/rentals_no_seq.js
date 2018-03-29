// Import ORM from orm.js
var orm = require('../config/orm.js');
// ORMs
var rentals = {
    selectAll: function(cb) {
        orm.selectAll('Rentals', function(res) {
            cb(res);
        });
    },
    insertOne: function(username, item, rate, owner, location, category, description, cb) {
        orm.insertOne('Rentals', username, item, rate, owner, location, category, description, function(res) {
            cb(res);
        });
    },
    resetAll: function(table, cb) {
        orm.resetAll('Rentals', function(res) {
            cb(res);
        })
    }, 
    update: function(table, condition, cb) {
        orm.update('Rentals', condition, function(res) {
            cb(res);
        });
    },
    delete: function(condition, cb) {
        orm.delete('Rentals', condition, function(res) {
            cb(res);
        });
    }
};
// Export ORMs
module.exports = rentals;