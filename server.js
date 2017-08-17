var express = require('express');
var app = express();
var controller = require('./controllers/controller.js');

app.listen(process.env.PORT || 3000);

app.use('/',express.static('views'));

app.get('/',function(req,res){
    res.sendFile('./views/index.html');
    res.end();
});
app.get('/api/imagesearch',controller.setOptions);
app.get('/api/latest/imagesearch',controller.getRecent);
app.get('/*',function(req,res){
  res.sendStatus(404);
  res.end();
})