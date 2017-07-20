var pg = require("pg");

var connection = require('../dao/connection');

module.exports = {
    login: function(req,res){
        var uname = req.query.username;
        var paswd = req.query.password;
        var sql = "SELECT * FROM login WHERE username = '"+uname+"' and password = '"+paswd+"'";
        var data = '';
        connection.selectUser(sql,data,res);
    },
    //create new user
    createUser: function(req,res){
        //SELECT * FROM TABLE_NAME WHERE ROWID=(SELECT MIN(ROWID) FROM TABLE_NAME)
        var sql = 'SELECT * FROM login WHERE id=(SELECT MAX(id) FROM login)';
        var data = '';
        //Find last id 
        connection.execute(sql,data,function(result) {
           // console.log("resultid="+result[0].id);
            
            var id=result[0].id;
            id++;
            var key=1234;
            // Retrieve the data to insert from the POST body
            var data = [
            id,
            req.query.username,
            req.query.password,
            key
            ];
            var sql = 'INSERT INTO login (id,username,password,key) VALUES ($1,$2,$3,$4)RETURNING id';
            //insert new user
            connection.createUser(sql,data,res);
            console.log("id="+id);
        });
  },
  updateUser: function(req,res){
        var data = [
        req.query.id,
        req.query.username,
        req.query.password
      ];
      console.log("data="+data);
      var sql = 'UPDATE login SET username = $2, password = $3  WHERE id = $1 RETURNING id';
        connection.execute(sql,data,function(result) {
            res.statusCode = 200;
            return res.json({
             result: ['Success'],
             data:[result]
            });
      });
  },
  deleteUser: function(req,res){
        var data = [
        req.query.id
      ];
      var sql = 'DELETE FROM login WHERE id = $1 RETURNING id';
        connection.execute(sql,data,function(result) {
            res.statusCode = 200;
            return res.json({
             result: ['Success'],
             data:[result]
            });
      });
  }
};