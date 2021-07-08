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
    
   this.catch = function(catchCb){
     if(typeof catchError !== 'undefined'){
       catchCb(catchError);
     }
     return this;
   };
   executor(resolve, reject); 
}

const ps = new promisee((resolve,reject)=>{
  setTimeout(()=>{
    resolve('i m done');
  }, 1000);
});

ps.then((obj)=>{
  console.log(obj);
}).catch((reason)=>{
  console.log('I am failed');
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
  const executor = (resolve, reject)=>{
    parr.forEach((ps, index)=>{
      ps.then((val, i)=>{
      fullfilled[i] = val;
      if (fulfilledPromises.length === promises.length) {
         return resolve(result);
      }
      
    }).catch((_reason)=>{
        return reject(error);
    });   
    
    });
  }
  return new promisee(executor)
}

promisee.resolve('I am resolved').then((obj)=>{console.log(obj);}).catch((reson)=>{console.log(reson);});
promisee.reject('I am rejected').then((obj)=>{console.log(obj);}, (obj)=>{console.log(obj);}).catch((reson)=>{console.log(reson);});





console.log('end');
