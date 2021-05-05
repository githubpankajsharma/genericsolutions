//console.log('started');
function Seer(obj){
var signals = {};
function observeData(obj){
  for(var key in obj){
    if(obj.hasOwnProperty(key)){
      makeReactive(obj, key);
    }
  }
  updateUI(obj)
}
function makeReactive(obj, key){
  var val = obj[key];
  Object.defineProperty(obj, key, {
    get(){return val; },
    set(newVal){  val = newVal; notify(key);}
  });
}
  
function notify(signal){
  if(signals[signal] && signals[signal].length > 0){
    signals[signal].forEach((fn)=> { fn();});
  }
}
 
function observer(key, handler){
  if(!signals[key]){
     signals[key] = [];
  }
  signals[key].push(handler);
}
observeData(obj);
  return {
    data: obj,
    observe: observer,
  }
}
var obj = {title: 'reactivity', project: 'learning'};
var app = new Seer(obj);
app.observe('title', ()=> { updateUI(app.data);});
function updateObj(property, e){
  obj[property] = e.target.value;
}
function updateUI(obj){
  var node = document.getElementById('myTitle')
  node.textContent = obj.title; 
}


//console.log(obj.title);
//obj.title = 'pankaj';
