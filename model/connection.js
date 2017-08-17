var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;

module.exports = {
  insert : function(myObj){
    mongoClient.connect(process.env.URL,function(err,db){
      if(err) throw err;
      else{
        db.collection('image_search_history').insertOne(myObj);
        db.close();
      }
    })
  },
  retrieve : function(cb){
    mongoClient.connect(process.env.URL,function(err,db){
      if(err) throw err;
      else{
        db.collection('image_search_history').find({term : {$exists : true}},{_id:0}).limit(10).toArray(function(err,docs){
          if(err) throw err;
          cb(docs);
        })
      }
    })
  }
}