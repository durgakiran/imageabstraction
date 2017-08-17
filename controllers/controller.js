'use strict'
var https = require('https');
var connection = require('../model/connection.js');


exports.setOptions =  function(req,res){
    var options = {};
    var offset = req.query.offset || 1;
    options['']
    options['hostname'] ='www.googleapis.com';
    options['path'] = "/customsearch/v1?key="+process.env.SECRET+"&cx="+process.env.CX+"&searchType=image&fileType=jpg&alt=json&start="+offset+"&q="+req.query.q; 
    options['method'] = 'GET';
    var headers = {
        'content-type': 'application/JSON'
    }
    options['headers'] = headers;
  /*var options = "https://www.googleapis.com/customsearch/v1?key=AIzaSyCqU_ob0so59D5vvWMANSH_iiqS0hUJGrQ&cx=004314060325951839611:2r8fh7j6zh8&searchType=image&fileType=jpg&alt=json&q=";
  */
    
var request = https.request(options,function(response){
        var bufData = "";
        response.on('data',function(chunk){
            bufData += chunk;
        });
        response.on('end',function(){
            
            bufData = bufData.toString();
            bufData = JSON.parse(bufData);
            bufData = bufData['items'];
            bufData.forEach(function(cr,i){
              var newObj = {};
              
              newObj['url'] = cr['link'];
              newObj['snippet'] = cr['snippet'];
              newObj['thumbnail'] = cr['image']['thumbnailLink'];
              newObj['context'] = cr['image']['contextLink'];
              bufData[i] = newObj;
              
            });
            bufData = JSON.stringify(bufData);
            res.end(bufData);
            connection.insert({'term':req.query.q,'when': new Date()})
        });
        response.on('error',function(err){
            console.log(err);
        });
    });
    request.end();
    
}
exports.getRecent = function(req,res){
  connection.retrieve(function(docs){
    res.end(JSON.stringify(docs));
  })
}