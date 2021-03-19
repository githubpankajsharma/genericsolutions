function throttle(callback,delay){
    let waiting= false;
    return function(){
    	const args = arguments;
    	const context = this;
    	if(!waiting){
        	waiting = true;
            callback.apply(context,args);
        	setTimeout(() =>{
                waiting = false;
            },delay);
        }
    }
}
