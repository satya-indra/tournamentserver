var express=require("express");
var routerlist=express();
var mysql = require("mysql");
var config = require("config");


var connection = mysql.createConnection({
    host:config.get("host"),
    database:config.get("database"),
    user:config.get("user"),
    password:config.get("password")    
});

connection.connect();
routerlist.use(express.json());

routerlist.get("/", (request, response)=>{
    var query="select * from CricStatTB";

    connection.query(query,(err,result)=>{
        if (err==null)
        {
            response.send(JSON.stringify(result));
        }
        else
        {
            response.send(JSON.stringify(err));
        }
    });
});

routerlist.post("/",(request, response)=>{
    
            var id = request.body.id;
            var Country = request.body.Country;
            var Year = request.body.Year;
            var NoofTeam = request.body.NoofTeam;
            var Venue= request.body.Venue;

            var queryText = `insert into CricStatTB values (default, '${Country}', ${Year}, ${NoofTeam}, '${Venue}')`;
            connection.query(queryText,(err, result)=>{
            if(err==null)
                {
                    response.send(JSON.stringify(result));
                }
                else{
                    response.send(JSON.stringify(err));
                }
        });
});


routerlist.delete("/:Venue", (request, response)=>{
    
    var Venue = request.params.Venue;

    var query=`DELETE FROM CricStatTB where Venue = '${Venue}'`;
    connection.query(query,(err,result)=>{
        if (err==null)
        {
            response.send(JSON.stringify(result));
        }
        else
        {
            response.send(JSON.stringify(err));
        }
    })
});

module.exports=routerlist;