const defaultState = {
    recipient: {},
    fetching: false,
    fetched: false,
    error: null
  }
  const recipientReducer = (state = defaultState, action)=>{
      switch(action.type){
          case "FETCH_REPIENT_PENDING":{
            return {...state,
              fetched: false,
              error: null,
              fetching: true
            }
          }
          case "FETCH_RECIPIENT_REJECTED":{
            return {...state,
              fetching: false,
              fetched: false,
              error: action.payload
            }
          }
          case "FETCH_RECIPIENT_FULFILLED":{
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
  
  export default recipientReducer;