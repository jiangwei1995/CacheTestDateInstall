var Promise = require('bluebird');
module.exports = function(Saleout) {
  var uuid = require('node-uuid');  
  var loopback =require('loopback');
  var _ =require('lodash');
  var async = require('async');
  Saleout.init = init;
  Saleout.install = install;
  function init(callback){
    var user = loopback.getModel('user1');
    var wareHouse = loopback.getModel('wareHouse');
   // user.find({"fields": {"userId": "true"}},callback);
    // wareHouse.find({"fields": {"wareHouseId": "true"}},function(err,result){
    //   callback(err,result.length);
    //});


async.parallel({
  "user":function(callback){
    user.find({"fields": {"userId": "true"}},callback);
  },
  "wareHouse":function(callback){ 
    wareHouse.find({"fields": {"wareHouseId": "true"}},callback); 
  }
},function(err,result){
  var random = (Math.random() * 500).toFixed(0);
      //callback(err,{"u":result.user[random].userId,"w":result.wareHouse[random].wareHouseId});
      var saleouts = [];
     //for (var i = 0; i <2; i++) {
      console.log("==============start===============");
      for (var z = 0; z<1000; z++) {
        saleouts.push({
          "saleId": uuid.v1(),
          "saleCode": (Math.random() * 1045).toFixed(0)+"0244C20"+(Math.random() * 1045).toFixed(0)+"14104636AXKMTT",
          "saleType": (Math.random()*10 + 1).toFixed(0)%2,
          "userId": result.user[random].userId,
          "quantity": (Math.random()*99).toFixed(0),
          "wareHouseId": result.wareHouse[random].wareHouseId,
          "money": (Math.random()*55080).toFixed(0),
          "discount": (Math.random()*5780).toFixed(0),
          "note": (Math.random() * 10456712341).toFixed(0),
          "makeDate": "2014-0"+(Math.random()*9).toFixed(0)+"-"+(Math.random()*29).toFixed(0)
        });
      };
      Saleout.create(saleouts,function(err,result){
        console.log("============end===============");
        callback(err,{"size": result.length});
      });
    // };

  })

}

function install(callback){
  Promise.map(new Array(10000),function(){
    return a();
  }).then(function(result){
    console.log(result);
    callback(null,result);
  });

}

var size = 0;
function a(){
  return new Promise(function(resolve, reject) { 
    Saleout.init(function (err,result){
      if (err) {reject(err)};
      size += result.size;
      resolve(size);
    })
  });
}
};