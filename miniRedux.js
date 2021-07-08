// var reducerRegistry = function(){
//   var reducers = {}
//   var emitChange = null;
//   return {
//     register(reduncerName, reducer){
//       reducers = {...reducers, [reduncerName]: reducer};
//       if (emitChange) {
//         emitChange(reducers);
//       }
//     },
//     getReducers(){
//       return reducers;
//     },
//     setChangeListener(listner){
//       emitChange = listner;
//     }
//   }
// }

//var finalReducer = combineReducers(reducerRegistry.getgetReducers());


function createStore(reducer, initialState){ 
  var currentReducer = reducer;
  var currentState = initialState;
  var listener;
  return {
    getState(){
      return currentState;
    },
    dispatch(action){
      currentState = currentReducer(currentState, action);
      listener();
      return action;
    },
    subscribe(newListener){
        listener = newListener;
    }
  }
}

function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}

let store = createStore(counter)

store.subscribe(() =>
  console.log(store.getState())
)

store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'DECREMENT' })


console.log('end');


