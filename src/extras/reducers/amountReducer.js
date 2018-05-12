const defaultState = {
    amount: {},
    fetching: false,
    fetched: false,
    error: null
  }
  const amountReducer = (state = defaultState, action)=>{
      switch(action.type){
          case "FETCH_AMOUNT_PENDING":{
            return {...state,
              fetched: false,
              error: null,
              fetching: true
            }
          }
          case "FETCH_AMOUNT_REJECTED":{
            return {...state,
              fetching: false,
              fetched: false,
              error: action.payload
            }
          }
          case "FETCH_AMOUNT_FULFILLED":{
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
  
  export default amountReducer;