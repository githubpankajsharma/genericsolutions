// Refernce: https://blog.jakoblind.no/learn-react-redux-by-coding-the-connect-function-yourself/
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

//below line is just for under standing purpose.
//var finalReducer = combineReducers(reducerRegistry.getgetReducers());

// function combineReducers(reducers){
//   var reducerKeys = Object.keys(reducers);
//   return function(state={}, action){
//     var nextState = {};
//     for(var i = 0;i <reducerKeys.length; i++){
//       var reducerKey = reducerKeys[i];
//       var reducer = reducerKeys[reducerKey];
//       var myState = state[reducerKey];
//       nextState[reducerKey] = reducer(myState, action);
//     }
//     return nextState;
//   }
// }


// function connect(mapStateToProps, mapDispatchToProps){
//   return function (WrappedComponent){ 
//     return class extends React.Component{
//       constructor(props){
//         super(props);
//         this.state = {};
//         this.handleChange = this.handleChange.bind(this);
//       }
//       handleChange(){
//         this.forceUpdate();
//       }
//       componentDidMount(){
//         store.subscribe(this.handleChange);
//       }
//       componentWillUnmount(){
//         store.unsubscribe();
//       }
//       render(){
//         <WrappedComponent {...this.props} 
//          {...mapStateToProps(store.getState(), this.props)}
//           {...mapDispatchToProps(store.dispatch, this.props)}
//         />
//       }

//     }
//   }
// }


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
    },
    unsubscribe(){
        listener = null;
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


