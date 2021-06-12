function promisee(executor){
   var resolveData;
   var rejectError;
   var resolveCb;
   var rejectCb; 
  
   function resolve(data){
       resolveData = data;
       if(typeof resolveCb === 'function'){
         resolveCb(data);
       }     
   }
   function reject(error){
       rejectError = error;
       if(typeof resolveCb === 'function'){
         resolveCb(error);
       } 
   }
  

   this.then = function(cb){
     if(typeof resolveData !== 'undefined'){
       cb(resolveData);
     }
     else{
       resolveCb = cb;
     }
     return this;
   };
    
   this.catch = function(cb){
     if(typeof rejectError !== 'undefined'){
       cb(rejectError);
     }
     else{
       rejectCb = cb;
     }
     return this;
   };
  
   executor(resolve, reject); 
}

const ps = new promisee((resolve,reject)=>{
  setTimeout(()=>{
    resolve('i m done');
    reject('I am error');
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
promise.all = function(parr){
  var fullfilled =[];
  var reason; 
  const executor = (resolve, reject)=>{
    parr.forEach((ps, index)=>{
      ps.then((val)=>{
      fullfilled.push(val);
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
promisee.reject('I am rejected').then((obj)=>{console.log(obj);}).catch((reson)=>{console.log(reson);});





console.log('end');



