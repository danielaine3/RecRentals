var connection = require('./connection_no_seq.js');
function printQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}
 function objToSql(ob) {
    var arr = [];
    for (var key in ob) {
        var value = ob[key];

        if(Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
 }
var orm = {
    selectAll: function(table, cb) {
        var queryString = 'SELECT * FROM ??';
        connection.query(
            queryString, [table], 
            function(err, res) {
                if (err) throw err;
                cb(res);
            }
        );
    },
    insertOne: function(table, username, item, rate, owner, location, category, description, cb) {
        console.log('insertOne called')
        var queryString = "INSERT INTO `" + table + "` (" + 
        "username, item, rate, owner, location, category, description) " +
        `VALUES ('${username}', '${item}', '${rate}', '${owner}', '${location}', '${category}', '${description}')`;
        console.log(queryString);
        connection.query(
            queryString,
            // [table, col, val],
            function(err, res) {
                if (err) throw err;
                console.log(queryString);
                cb(res); 
            }
        );
    },
    resetAll: function(table, cb) {
        var queryString = 'TRUNCATE TABLE (??)';
        connection.query(
            queryString, [table],
            function(err, res) {
                if (err) throw err;
                cb(res);
            }
        );
    }, 
    update: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            } cb(result);
        })
    },
    delete: function(table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    }
};
module.exports = orm;