const defaultState = {
    payment: { 
      url: '',
    },
    fetching: false,
    fetched: false,
    error: null
  }
  const paymentReducer = (state = defaultState, action)=>{
      switch(action.type){
          case "FETCH_PI_PENDING":{
            return {...state,
              fetched: false,
              error: null,
              fetching: true
            }
          }
          case "FETCH_PI_REJECTED":{
            return {...state,
              fetching: false,
              fetched: false,
              error: action.payload
            }
          }
          case "FETCH_PI_FULFILLED":{
            return {...state,
              fetched: true,
              fetching: false,
              error: false,
              payment: action.payload
            }
          }
          default:
            return state;
      }  
  }
  
  export default paymentReducer;