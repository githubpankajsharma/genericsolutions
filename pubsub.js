var pubsubObj = (function pubsub(){
  var cbObj = {};
  var fn = {
    _getEid : (function(){
      var id = 0;
      return function eid(){
        return ++id;
      };
     })(),
    _publish(eventname, data){
      var ueids = Object.keys(cbObj[eventname]);
      ueids.forEach((ueid, i)=>{
        if(typeof cbObj[eventname][ueid] === 'function'){
          cbObj[eventname][ueid](data);
        }
      });
    },
    _subscribe(eventname, cb){
      var eid = fn._getEid();
      var ueid = eventname + ':' + eid;
      console.log(ueid);
      if(!cbObj[eventname]){
        cbObj[eventname] = {};
      }
      cbObj[eventname][ueid] = cb;
      return ueid;
    },
    _unsubscribe(ueid){
      var output = false;
      if(ueid){
        var ueidArr = ueid.split(':');
        if(ueidArr.length === 2)
          var eventname = ueidArr[0];
          if(cbObj[eventname]){
            delete cbObj[eventname][ueid];
            output = true;
          }
      }
      return output;
    }
  }
  return {
    publish: function(){
      return fn._publish.apply(this, arguments);
    },
    subscribe: function(){
      return fn._subscribe.apply(this, arguments);
    },
    unsubscribe: function(){
      return fn._unsubscribe.apply(this, arguments);
    }
  }
})();

var loginData = {
  name: 'pankaj',
  uid: 'pxnxkxj'
}

pubsubObj.subscribe('user.login', function(data){
 // do your job
  console.log('your data for login is :' + data.name);
});

pubsubObj.subscribe('user.login', function(data){
 // do your job
  console.log('your data for login is :' + data.uid);
});
pubsubObj.publish('user.login', loginData);
