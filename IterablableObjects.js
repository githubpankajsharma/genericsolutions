//Make objects iterable thuu symbol keyword

var obj = {
  name: 'pankaj',
  age: 32,
  test: function(){
    console.log(arguments);
  }
}
obj[Symbol.iterator] = function(){
    var keys = Object.keys(this);
    var len = keys.length;
    var isDone = false;
    var count = 0;
    let next = () => {
      if(count >= len){
          isDone = true;
      }
      return {done: isDone, value: this[keys[count++]]};
      
    }
    return {next};
}
for(var key of obj){
  console.log(key)
}
obj.test.apply(null, [10,20,30]);
