function sum(a,b,c){
  return a+b+c;
}
console.log(sum(1,2,3));

function sum1(a1){
  return function(b1){
    return function(c1){
        return sum(a1, b1, c1);
    }
  }
}

var op = sum1(1)(2)(3);
console.log(op);


function curry(func){
  return function curriedFn(...args){
    if(args.length >= func.length){
      return func.apply(this, args);
    }
    else{
      return function(...args2){
        return curriedFn.apply(this, [...args, ...args2]);
      }
    }
  }
}

var curriedSumFn = curry(sum); 
console.log(curriedSumFn(1,2,3));



console.log('end');




