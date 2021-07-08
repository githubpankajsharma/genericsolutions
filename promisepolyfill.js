Skip welcome & menu and move to editor
 
Textarea editor mode
JS Bin features
Getting started
Keyboard Shortcuts
Exporting/importing gist
 
Pro features
Private bins
Dropbox backup
Vanity URLs
Upgrade to pro now
 
Blog
The Return and The Refactor
Help
Transferring ownership of a bin
* What to expect from a Pro subscription
 
Donate to JS Bin ❤
Support JS Bin to keep the project open source & MIT for all
Follow @js_bin on twitter
By using JS Bin you agree to our legal terms
 
“Everyone should learn how to program a computer because it teaches you how to think” —
Steve Jobs
log
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
​
const ps = new promisee((resolve,reject)=>{
  setTimeout(()=>{
    reject('i m done');
  }, 1000);
});
​
ps.then((obj)=>{
  console.log('res', obj);
  throw new Error()
},(obj)=>{
  //console.log('rej', obj);
  throw new Error('Whoops!');
}).catch((reason)=>{
  console.log('I am failed error with below error', reason);
})
"bad things happened"
"end"
"a"
"I am failed error with below error"
[object Error] { ... }
["a", "b", "c", "d"]
Bin info
just now
DigitalOcean Managed MongoDB a fully managed DBaaS for modern apps. Try now with $100 credit.
Ad by EthicalAds
