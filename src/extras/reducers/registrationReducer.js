const defaultState = {
    user: { 
      firstname: '',
      lastname: '',
      email: '',
      number: '',
      password: '',
    },
    fetching: false,
    fetched: false,
    error: null
  }
  const registrationReducer = (state = defaultState, action)=>{
      switch(action.type){
          case "FETCH_REG_PENDING":{
            return {...state,
              fetched: false,
              error: null,
              fetching: true
            }
          }
          case "FETCH_REG_REJECTED":{
            return {...state,
              fetching: false,
              fetched: false,
              error: action.payload
            }
          }
          case "FETCH_REG_FULFILLED":{
            return {...state,
              fetched: true,
              fetching: false,
              error: false,
              user: action.payload
            }
          }
          default:
            return state;
      }  
  }
  
  export default registrationReducer;