function promisee(executor){
   var resolveData;
   var rejectData;
   var resolveCb;
   var rejectCb; 
   var catchCb;
   var catchError;
  
  function resolve(data){
       try{
         resolveData = data;
         if(typeof resolveCb === 'function'){
           resolveCb(data);
         }   
       }
     catch(e){
       catchCb(e);
       catchError = e;
       
     }
         
   }
   function reject(data){
     try{  
         rejectData = data;
         if(typeof rejectCb === 'function'){
           rejectCb(data);
         }
     }
     catch(e){
       catchCb(e);
       catchError = e;
     }
   }
 
   this.then = function(_resolveCb, _rejectCb){
     if(typeof resolveData !== 'undefined' && typeof _resolveCb === 'function'){
       _resolveCb(resolveData);
     }
     if(typeof rejectData !== 'undefined' && typeof _rejectCb === 'function'){
       _rejectCb(rejectData);
     }
     resolveCb = _resolveCb;
     rejectCb = _rejectCb;
     return this;
   };
    
   this.catch = function(_catchCb){
     catchCb = _catchCb;
     if(typeof catchError !== 'undefined' && typeof catchCb === 'function'){
       _catchCb(catchError);
     }
     return this;
   };
   executor(resolve, reject); 
}

const ps = new promisee((resolve,reject)=>{
  setTimeout(()=>{
    reject('i m done');
  }, 1000);
});

ps.then((obj)=>{
  console.log('res', obj);
  throw new Error()
},(obj)=>{
  //console.log('rej', obj);
  throw new Error('Whoops!');
}).catch((reason)=>{
  console.log('I am failed error with below error', reason);
})

promisee.resolve = function(data){
  return new promisee((_resolve, _reject)=>{
    _resolve(data);
  })
};
promisee.reject = function(reason){
  return new promisee((_resolve, _reject)=>{
    _reject(reason);
  })
};
promisee.all = function(parr){
  var fullfilled =[];
  var reason; 
  var count = 0;
  const pp = new promisee((resolve, reject)=>{
    parr.forEach((ps, index)=>{
      ps.then((val)=>{
        count++;
        fullfilled[index] = val;
        if (count === parr.length) {
          resolve(fullfilled);
        } 
      },reject);   
    });
  });
  return pp;
}

//promisee.resolve('I am resolved').then((obj)=>{console.log(obj);}).catch((reson)=>{console.error(reson);});
//promisee.reject('I am rejected').then((obj)=>{console.log(obj);}, (obj)=>{console.log(obj);}).catch((reson)=>{console.error(reson);});

// delay helper for creating promises that resolve after ms milliseconds
function delay(ms, value) {
  return new promisee((resolve, reject)=>{
    setTimeout(resolve, ms, value)
  })
}

var pss = delay(100, 'a');
pss.then((val)=>{
  console.log(val);
})

//resolved promises wait for one another but ensure order is kept
promisee.all([
  delay(100, 'a'),
  delay(200, 'b'),
  delay(50, 'c'),
  delay(1000, 'd')
])
.then(console.log, console.error) // [ a, b, c, d ]

// resolved promises wait for one another but ensure order is kept
promisee.all([
  delay(100, 'a'),
  delay(200, 'b'),
  promisee.reject('bad things happened'),
  delay(50, 'c'),
  delay(1000, 'd')
])
.then(console.log, console.error) // Error: bad things happened



console.log('end');
