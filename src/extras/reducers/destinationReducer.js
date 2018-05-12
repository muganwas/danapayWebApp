const defaultState = {
    destination: {},
    fetching: false,
    fetched: false,
    error: null
  }
  const destinationReducer = (state = defaultState, action)=>{
      switch(action.type){
          case "FETCH_DESTINATION_PENDING":{
            return {...state,
              fetched: false,
              error: null,
              fetching: true
            }
          }
          case "FETCH_DESTINATION_REJECTED":{
            return {...state,
              fetching: false,
              fetched: false,
              error: action.payload
            }
          }
          case "FETCH_DESTINATION_FULFILLED":{
            return {...state,
              fetched: true,
              fetching: false,
              error: false,
              users: action.payload
            }
          }
          default:
            return state;
      }  
  }
  
  export default destinationReducer;