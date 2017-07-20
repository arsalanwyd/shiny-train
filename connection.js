var pg = require("pg");

//var conString = "pg://usr:pswd@localhost:5432/db_name";
var conString = "pg://postgres:root@localhost:5432/test";

function runQuery(queryString,value, callback) {
  // connect to postgres database
  pg.connect(conString,function(err,client,done) {
    // if error, stop here
    if (err) {console.error(err); done(); callback(); return;}
    // execute queryString
    client.query(queryString,value, function(err,result) {
      // if error, stop here
      if (err) {console.error(err+'\nQuery: '+queryString); done(); callback(); return;}
      // callback to close connection
      done();
      // callback with results
     // console.log("resultsddd="+result.rows[0].id);
      callback(result.rows);
    });
  });
}

module.exports = {
    execute: function(sql,data,back){
        runQuery(sql,data, function(result) {
        // Whatever you need to do with 'result'
            back(result);      
        });
    },
    selectUser: function(sql,data,res){
        runQuery(sql,data, function(result) {
            console.log("result="+JSON.stringify(result));
        if (!result) {
            // We shield our clients from internal errors, but log them
            res.statusCode = 404;
            return res.json({
             errors: ['Failed']
            });
        }
        else{
            res.statusCode = 200;
            return res.json({
             result: ['Success'],
             data:[result]
            });
        }     
        });
    },
    createUser: function(sql,data,res){ 
        runQuery(sql,data,function(result) {
            if (!result) {
            // We shield our clients from internal errors, but log them
            res.statusCode = 500;
            return res.json({
             errors: ['Failed to create']
            });
        }
        else{
            res.statusCode = 201;
            return res.json({
             result: ['Success']
            });
        }
    });
    
}
};